from datetime import datetime
import dateutil.parser
from models import PriorityRequest, MatchRequest, PriorityResponse, MatchResponse, MatchResult

class ScoringService:
    @staticmethod
    def calculate_priority(req: PriorityRequest) -> PriorityResponse:
        reasoning = {}
        
        if req.availableVolunteers == 0:
            reasoning['override'] = "Zero available volunteers forces maximum priority."
            return PriorityResponse(score=100.0, reasoning=reasoning, message="Optimization applied")

        # 1. People Impact
        people_impact = 0
        if req.people <= 50:
            people_impact = 2
        elif req.people <= 100:
            people_impact = 5
        else:
            people_impact = 10
        reasoning['people_impact'] = {"value": req.people, "score": people_impact, "weight": 0.3}

        # 2. Urgency
        urgency_lower = req.urgency.lower()
        urgency_score = 2
        if urgency_lower == "medium":
            urgency_score = 5
        elif urgency_lower == "high":
            urgency_score = 10
        reasoning['urgency'] = {"value": urgency_lower, "score": urgency_score, "weight": 0.3}

        # 3. Scarcity
        scarcity_ratio = req.people / req.availableVolunteers
        scarcity_score = 0
        if scarcity_ratio < 2:
            scarcity_score = 2
        elif scarcity_ratio <= 5:
            scarcity_score = 6
        else:
            scarcity_score = 10
        reasoning['scarcity'] = {"ratio": round(scarcity_ratio, 2), "score": scarcity_score, "weight": 0.25}

        # 4. Time Score
        try:
            timestamp_dt = dateutil.parser.isoparse(req.timestamp)
            now_dt = datetime.utcnow()
            
            if timestamp_dt.tzinfo is not None:
                now_dt = datetime.now(timestamp_dt.tzinfo)
            
            delta = now_dt - timestamp_dt
            hours_since = max(0, delta.total_seconds() / 3600.0)
        except Exception:
            hours_since = 0

        time_score = min(hours_since / 2.0, 10.0)
        reasoning['time'] = {"hours_elapsed": round(hours_since, 2), "score": round(time_score, 2), "weight": 0.15}

        # Calculate final score out of 10
        raw_score = (people_impact * 0.3) + (urgency_score * 0.3) + (scarcity_score * 0.25) + (time_score * 0.15)
        
        # Scale to 100 for percentage/max
        final_score = raw_score * 10.0
        
        return PriorityResponse(score=round(final_score, 2), reasoning=reasoning, message="Optimization applied")


class MatchingService:
    @staticmethod
    def optimize_match(req: MatchRequest) -> MatchResponse:
        reasoning = {
            "strategy": "Weighted scoring based on Skills (0.5), Location (0.3), Availability (0.2)",
            "top_limit": 5
        }
        
        req_skills_set = set([s.lower() for s in req.requiredSkills])
        req_location = req.location.lower()
        
        results = []

        for v in req.volunteers:
            # 1. Skill Score
            v_skills_set = set([s.lower() for s in v.skills])
            intersection = req_skills_set.intersection(v_skills_set)
            
            skill_score = 0
            if len(req_skills_set) > 0 and req_skills_set.issubset(v_skills_set):
                skill_score = 10
            elif len(intersection) > 0:
                skill_score = 5
                
            if len(req_skills_set) == 0:
                skill_score = 10 # No specific skills required
                
            # 2. Location Score
            location_score = 2
            if v.location.lower() == req_location:
                location_score = 10
                
            # 3. Availability Score
            availability_score = 10 if v.availability else 0
            
            # Final Score
            final_score = (0.5 * skill_score) + (0.3 * location_score) + (0.2 * availability_score)
            
            results.append(MatchResult(
                name=v.name,
                skills=v.skills,
                location=v.location,
                availability=v.availability,
                matchScore=round(final_score, 2)
            ))
            
        # Sort by matchScore descending
        results.sort(key=lambda x: x.matchScore, reverse=True)
        
        # Return top 5
        top_matches = results[:5]
        reasoning["total_evaluated"] = len(req.volunteers)
        reasoning["total_returned"] = len(top_matches)
        
        return MatchResponse(matches=top_matches, reasoning=reasoning, message="Optimization applied")
