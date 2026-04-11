package com.volunteer.gateway.dto;

import java.util.List;

public record Volunteer(
    String id,
    String name,
    List<String> skills,
    String location,
    boolean availability
) {}
