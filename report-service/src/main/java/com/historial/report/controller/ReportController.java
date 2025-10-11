package com.historial.report.controller;

import com.historial.report.dto.ActivityDTO;
import com.historial.report.dto.ActivitySummary;
import com.historial.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Reporting and analytics endpoints")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/summary")
    @Operation(summary = "Get activity summary", description = "Get summary statistics of all activities")
    public ResponseEntity<ActivitySummary> getActivitySummary() {
        ActivitySummary summary = reportService.getActivitySummary();
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/equipo/{equipo}")
    @Operation(summary = "Get activities by equipment", description = "Get all activities for a specific equipment")
    public ResponseEntity<List<ActivityDTO>> getActivitiesByEquipo(@PathVariable String equipo) {
        List<ActivityDTO> activities = reportService.getActivitiesByEquipo(equipo);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/type/{tipo}")
    @Operation(summary = "Get activities by type", description = "Get all activities of a specific type")
    public ResponseEntity<List<ActivityDTO>> getActivitiesByType(@PathVariable String tipo) {
        List<ActivityDTO> activities = reportService.getActivitiesByType(tipo);
        return ResponseEntity.ok(activities);
    }
}
