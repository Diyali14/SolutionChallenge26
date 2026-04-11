package com.volunteer.gateway.dto;

import java.util.List;

public record OptimizeResponse(
    List<OptimizedNeedResult> optimizedNeeds
) {}
