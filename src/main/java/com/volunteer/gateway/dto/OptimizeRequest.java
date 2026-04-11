package com.volunteer.gateway.dto;

import java.util.List;

public record OptimizeRequest(
    List<NgoNeed> needs,
    List<Volunteer> volunteers
) {}
