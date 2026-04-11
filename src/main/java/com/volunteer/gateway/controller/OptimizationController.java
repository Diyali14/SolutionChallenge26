package com.volunteer.gateway.controller;

import com.volunteer.gateway.dto.OptimizeRequest;
import com.volunteer.gateway.dto.OptimizeResponse;
import com.volunteer.gateway.service.OptimizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class OptimizationController {

    private final OptimizationService optimizationService;

    public OptimizationController(OptimizationService optimizationService) {
        this.optimizationService = optimizationService;
    }

    @PostMapping("/optimize")
    public ResponseEntity<OptimizeResponse> optimize(@RequestBody OptimizeRequest request) {
        if (request == null) {
            return ResponseEntity.badRequest().build();
        }
        
        OptimizeResponse response = optimizationService.optimize(request);
        return ResponseEntity.ok(response);
    }
}
