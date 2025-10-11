package com.historial.report.service;

import com.historial.report.dto.ActivityDTO;
import com.historial.report.dto.ActivitySummary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final WebClient.Builder webClientBuilder;

    @Value("${activity-service.url}")
    private String activityServiceUrl;

    public ActivitySummary getActivitySummary() {
        List<ActivityDTO> activities = fetchAllActivities();

        Long total = (long) activities.size();

        Map<String, Long> byType = activities.stream()
                .collect(Collectors.groupingBy(ActivityDTO::getTipo, Collectors.counting()));

        Map<String, Long> byCategory = activities.stream()
                .collect(Collectors.groupingBy(ActivityDTO::getCategoria, Collectors.counting()));

        Map<String, Long> byEquipo = activities.stream()
                .collect(Collectors.groupingBy(ActivityDTO::getEquipo, Collectors.counting()));

        Map<String, Long> byTurno = activities.stream()
                .collect(Collectors.groupingBy(ActivityDTO::getTurno, Collectors.counting()));

        return ActivitySummary.builder()
                .totalActivities(total)
                .activitiesByType(byType)
                .activitiesByCategory(byCategory)
                .activitiesByEquipo(byEquipo)
                .activitiesByTurno(byTurno)
                .build();
    }

    public List<ActivityDTO> getActivitiesByEquipo(String equipo) {
        return webClientBuilder.build()
                .get()
                .uri(activityServiceUrl + "/api/activities/equipo/" + equipo)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ActivityDTO>>() {})
                .block();
    }

    public List<ActivityDTO> getActivitiesByType(String tipo) {
        return webClientBuilder.build()
                .get()
                .uri(activityServiceUrl + "/api/activities/type/" + tipo)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ActivityDTO>>() {})
                .block();
    }

    private List<ActivityDTO> fetchAllActivities() {
        return webClientBuilder.build()
                .get()
                .uri(activityServiceUrl + "/api/activities")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ActivityDTO>>() {})
                .block();
    }
}
