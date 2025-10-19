package com.historial.activity.controller;

import com.historial.activity.dto.ActivityRequest;
import com.historial.activity.dto.ActivityResponse;
import com.historial.activity.model.Activity;
import com.historial.activity.service.ActivityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
@Tag(name = "Activities", description = "Activity management endpoints")
@CrossOrigin(originPatterns = {"*"})
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    @Operation(summary = "Create activity", description = "Create a new activity")
    public ResponseEntity<ActivityResponse> createActivity(@Valid @RequestBody ActivityRequest request) {
        ActivityResponse response = activityService.createActivity(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Get all activities", description = "Retrieve all activities")
    public ResponseEntity<List<ActivityResponse>> getAllActivities() {
        List<ActivityResponse> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get activity by ID", description = "Retrieve activity by ID")
    public ResponseEntity<ActivityResponse> getActivityById(@PathVariable Long id) {
        ActivityResponse activity = activityService.getActivityById(id);
        return ResponseEntity.ok(activity);
    }

    @GetMapping("/type/{tipo}")
    @Operation(summary = "Get activities by type", description = "Retrieve activities by type (FALLA, RUTINA, TRABAJO_TALLER)")
    public ResponseEntity<List<ActivityResponse>> getActivitiesByType(@PathVariable Activity.ActivityType tipo) {
        List<ActivityResponse> activities = activityService.getActivitiesByType(tipo);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/category/{categoria}")
    @Operation(summary = "Get activities by category", description = "Retrieve activities by category")
    public ResponseEntity<List<ActivityResponse>> getActivitiesByCategory(@PathVariable Activity.Category categoria) {
        List<ActivityResponse> activities = activityService.getActivitiesByCategory(categoria);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/equipo/{equipo}")
    @Operation(summary = "Get activities by equipment", description = "Retrieve activities by equipment name")
    public ResponseEntity<List<ActivityResponse>> getActivitiesByEquipo(@PathVariable String equipo) {
        List<ActivityResponse> activities = activityService.getActivitiesByEquipo(equipo);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/ficha/{numFicha}")
    @Operation(summary = "Get activities by employee", description = "Retrieve activities by employee number")
    public ResponseEntity<List<ActivityResponse>> getActivitiesByNumFicha(@PathVariable String numFicha) {
        List<ActivityResponse> activities = activityService.getActivitiesByNumFicha(numFicha);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/date-range")
    @Operation(summary = "Get activities by date range", description = "Retrieve activities within a date range")
    public ResponseEntity<List<ActivityResponse>> getActivitiesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        List<ActivityResponse> activities = activityService.getActivitiesByDateRange(startDate, endDate);
        return ResponseEntity.ok(activities);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update activity", description = "Update an existing activity")
    public ResponseEntity<ActivityResponse> updateActivity(
            @PathVariable Long id,
            @Valid @RequestBody ActivityRequest request
    ) {
        ActivityResponse activity = activityService.updateActivity(id, request);
        return ResponseEntity.ok(activity);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete activity", description = "Delete activity by ID")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
