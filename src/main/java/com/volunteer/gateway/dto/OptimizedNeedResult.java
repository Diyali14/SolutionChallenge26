package com.volunteer.gateway.dto;

import java.util.List;
import java.util.Map;

public record OptimizedNeedResult(
    NgoNeed need,
    double priorityScore,
    List<MatchedVolunteer> matchedVolunteers,
    Map<String, Object> debug
) {}
