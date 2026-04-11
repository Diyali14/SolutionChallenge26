package com.volunteer.gateway.service;

import com.volunteer.gateway.dto.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OptimizationService {

    public OptimizeResponse optimize(OptimizeRequest request) {
        List<NgoNeed> needs = request.needs() == null ? Collections.emptyList() : request.needs();
        List<Volunteer> volunteers = request.volunteers() == null ? Collections.emptyList() : request.volunteers();

        if (needs.isEmpty()) {
            return new OptimizeResponse(Collections.emptyList());
        }

        // 1. Calculate average people across all needs
        double totalPeople = needs.stream().mapToInt(NgoNeed::people).sum();
        double averagePeople = totalPeople / needs.size();

        // Data structures for iteration logic
        Map<NgoNeed, Double> rawScores = new HashMap<>();
        Map<NgoNeed, List<MatchedVolunteer>> needMatches = new HashMap<>();
        Map<NgoNeed, Map<String, Object>> needDebugs = new HashMap<>();
        double maxRawScore = 0.0;

        for (NgoNeed need : needs) {
            Map<String, Object> debug = new HashMap<>();
            
            // a. Perform volunteer matching first (to find available count)
            List<MatchedVolunteer> allQualified = getQualifiedVolunteers(need, volunteers);
            int computedAvailableVolunteers = allQualified.size();
            debug.put("computedAvailableVolunteers", computedAvailableVolunteers);

            // b. Calculate Score parameters
            int urgencyWeight = 1;
            String u = need.urgency() != null ? need.urgency().toLowerCase() : "low";
            if ("medium".equals(u)) urgencyWeight = 2;
            else if ("high".equals(u)) urgencyWeight = 3;

            double baseScore = need.people() * urgencyWeight;
            double pressure = (double) need.people() / (computedAvailableVolunteers + 1);
            double scarcityFactor = need.people() / (averagePeople + 1);
            
            double rawScore = baseScore * pressure * scarcityFactor;

            debug.put("urgencyWeight", urgencyWeight);
            debug.put("baseScore", baseScore);
            debug.put("pressure", pressure);
            debug.put("scarcityFactor", scarcityFactor);
            debug.put("rawScore", rawScore);

            rawScores.put(need, rawScore);
            needDebugs.put(need, debug);
            
            // c. Apply dynamic limit for this specific need's matches
            long requiredLimit = (long) Math.min(Math.ceil(need.people() / 10.0), 10);
            debug.put("dynamicVolunteerLimit", requiredLimit);
            
            List<MatchedVolunteer> limitedMatches = allQualified.stream()
                    .limit(requiredLimit)
                    .collect(Collectors.toList());
                    
            needMatches.put(need, limitedMatches);

            if (rawScore > maxRawScore) {
                maxRawScore = rawScore;
            }
        }

        List<OptimizedNeedResult> results = new ArrayList<>();

        for (NgoNeed need : needs) {
            // 2. Normalize
            double raw = rawScores.get(need);
            double priorityScore = 100.0; // Default if only 1 need or maxScore is 0
            if (needs.size() > 1 && maxRawScore > 0) {
                priorityScore = (raw / maxRawScore) * 100.0;
            }

            needDebugs.get(need).put("priorityScore", priorityScore);

            results.add(new OptimizedNeedResult(need, priorityScore, needMatches.get(need), needDebugs.get(need)));
        }

        // 3. Sort Needs deterministically:
        // Priority Score -> Urgency (desc) -> People Count (desc)
        results.sort((a, b) -> {
            int scoreCompare = Double.compare(b.priorityScore(), a.priorityScore());
            if (scoreCompare != 0) return scoreCompare;

            int urgencyA = urgencyToInt(a.need().urgency());
            int urgencyB = urgencyToInt(b.need().urgency());
            int urgencyCompare = Integer.compare(urgencyB, urgencyA);
            if (urgencyCompare != 0) return urgencyCompare;

            return Integer.compare(b.need().people(), a.need().people());
        });

        return new OptimizeResponse(results);
    }

    private int urgencyToInt(String urgency) {
        if (urgency == null) return 1;
        String u = urgency.toLowerCase();
        if ("high".equals(u)) return 3;
        if ("medium".equals(u)) return 2;
        return 1;
    }

    private List<MatchedVolunteer> getQualifiedVolunteers(NgoNeed need, List<Volunteer> volunteers) {
        if (volunteers == null || volunteers.isEmpty()) {
            return Collections.emptyList();
        }

        Set<String> requiredSkills = need.requiredSkills() == null ? 
                Collections.emptySet() : 
                need.requiredSkills().stream().map(String::toLowerCase).collect(Collectors.toSet());

        String needLoc = need.location() == null ? "" : need.location().toLowerCase();

        return volunteers.stream()
                .filter(v -> v != null && v.availability())
                .filter(v -> {
                    // Filter skill matching realistically: must have at least one of the required skills if any are required.
                    if (requiredSkills.isEmpty()) return true;
                    if (v.skills() == null || v.skills().isEmpty()) return false;
                    return v.skills().stream()
                            .map(String::toLowerCase)
                            .anyMatch(requiredSkills::contains);
                })
                .map(v -> {
                    double score = 5.0; // Base given availability passes filter
                    
                    // Skill Percentage Base
                    if (requiredSkills.isEmpty()) {
                        score += 10.0;
                    } else if (v.skills() != null) {
                        long matches = v.skills().stream()
                                .map(String::toLowerCase)
                                .filter(requiredSkills::contains)
                                .count();
                        score += 10.0 * ((double) matches / requiredSkills.size());
                    }

                    // Location Proximity Check
                    String vLoc = v.location() == null ? "" : v.location().toLowerCase();
                    if (!needLoc.isEmpty() && !vLoc.isEmpty()) {
                        if (vLoc.equals(needLoc)) {
                            score += 5.0; // Exact match
                        } else if (vLoc.contains(needLoc) || needLoc.contains(vLoc)) {
                            score += 3.0; // Nearby / Sub-string context matching
                        }
                    }

                    return new MatchedVolunteer(v, round2(score));
                })
                .sorted((a, b) -> Double.compare(b.matchScore(), a.matchScore()))
                .collect(Collectors.toList());
    }

    private double round2(double val) {
        return Math.round(val * 100.0) / 100.0;
    }
}
