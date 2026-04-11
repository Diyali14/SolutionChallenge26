package com.volunteer.gateway.dto;

import java.util.List;

public record NgoNeed(
    String id,
    int people,
    String urgency,
    String location,
    List<String> requiredSkills,
    int availableVolunteers
) {}
