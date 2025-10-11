package com.historial.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivitySummary {

    private Long totalActivities;
    private Map<String, Long> activitiesByType;
    private Map<String, Long> activitiesByCategory;
    private Map<String, Long> activitiesByEquipo;
    private Map<String, Long> activitiesByTurno;
}
