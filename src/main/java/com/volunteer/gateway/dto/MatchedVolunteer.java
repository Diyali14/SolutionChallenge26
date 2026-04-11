package com.volunteer.gateway.dto;

public record MatchedVolunteer(
    Volunteer volunteer,
    double matchScore
) {}
