package com.historial.report.service;

import com.historial.report.dto.ActivityDTO;
import com.historial.report.dto.ActivitySummary;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final WebClient.Builder webClientBuilder;

    @Value("${activity-service.url}")
    private String activityServiceUrl;

    private String normalizeUrl(String url) {
        if (url == null || url.isEmpty()) {
            return url;
        }
        // Add https:// if no protocol is specified
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return "https://" + url;
        }
        return url;
    }

    public ActivitySummary getActivitySummary() {
        try {
            List<ActivityDTO> activities = fetchAllActivities();

            if (activities == null || activities.isEmpty()) {
                log.warn("No activities found or null response from activity service");
                return createEmptySummary();
            }

            Long total = (long) activities.size();

            Map<String, Long> byType = activities.stream()
                    .filter(a -> a.getTipo() != null)
                    .collect(Collectors.groupingBy(ActivityDTO::getTipo, Collectors.counting()));

            Map<String, Long> byCategory = activities.stream()
                    .filter(a -> a.getCategoria() != null)
                    .collect(Collectors.groupingBy(ActivityDTO::getCategoria, Collectors.counting()));

            Map<String, Long> byEquipo = activities.stream()
                    .filter(a -> a.getEquipo() != null)
                    .collect(Collectors.groupingBy(ActivityDTO::getEquipo, Collectors.counting()));

            Map<String, Long> byTurno = activities.stream()
                    .filter(a -> a.getTurno() != null)
                    .collect(Collectors.groupingBy(ActivityDTO::getTurno, Collectors.counting()));

            return ActivitySummary.builder()
                    .totalActivities(total)
                    .activitiesByType(byType)
                    .activitiesByCategory(byCategory)
                    .activitiesByEquipo(byEquipo)
                    .activitiesByTurno(byTurno)
                    .build();
        } catch (Exception e) {
            log.error("Error fetching activity summary", e);
            return createEmptySummary();
        }
    }

    private ActivitySummary createEmptySummary() {
        return ActivitySummary.builder()
                .totalActivities(0L)
                .activitiesByType(Collections.emptyMap())
                .activitiesByCategory(Collections.emptyMap())
                .activitiesByEquipo(Collections.emptyMap())
                .activitiesByTurno(Collections.emptyMap())
                .build();
    }

    public List<ActivityDTO> getActivitiesByEquipo(String equipo) {
        try {
            String url = normalizeUrl(activityServiceUrl);
            List<ActivityDTO> result = webClientBuilder.build()
                    .get()
                    .uri(url + "/api/activities/equipo/" + equipo)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ActivityDTO>>() {})
                    .block();
            return result != null ? result : Collections.emptyList();
        } catch (WebClientResponseException e) {
            log.error("Error fetching activities by equipo: {} - Status: {}", equipo, e.getStatusCode(), e);
            throw new RuntimeException("Failed to fetch activities from activity service", e);
        } catch (Exception e) {
            log.error("Unexpected error fetching activities by equipo: {}", equipo, e);
            throw new RuntimeException("Failed to fetch activities from activity service", e);
        }
    }

    public List<ActivityDTO> getActivitiesByType(String tipo) {
        try {
            String url = normalizeUrl(activityServiceUrl);
            List<ActivityDTO> result = webClientBuilder.build()
                    .get()
                    .uri(url + "/api/activities/type/" + tipo)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ActivityDTO>>() {})
                    .block();
            return result != null ? result : Collections.emptyList();
        } catch (WebClientResponseException e) {
            log.error("Error fetching activities by type: {} - Status: {}", tipo, e.getStatusCode(), e);
            throw new RuntimeException("Failed to fetch activities from activity service", e);
        } catch (Exception e) {
            log.error("Unexpected error fetching activities by type: {}", tipo, e);
            throw new RuntimeException("Failed to fetch activities from activity service", e);
        }
    }

    private List<ActivityDTO> fetchAllActivities() {
        try {
            String url = normalizeUrl(activityServiceUrl);
            log.debug("Fetching all activities from: {}/api/activities", url);
            List<ActivityDTO> result = webClientBuilder.build()
                    .get()
                    .uri(url + "/api/activities")
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<ActivityDTO>>() {})
                    .block();
            log.debug("Fetched {} activities", result != null ? result.size() : 0);
            return result != null ? result : Collections.emptyList();
        } catch (WebClientResponseException e) {
            log.error("Error fetching activities - Status: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString(), e);
            throw new RuntimeException("Failed to fetch activities from activity service: " + e.getMessage(), e);
        } catch (Exception e) {
            String url = normalizeUrl(activityServiceUrl);
            log.error("Unexpected error fetching all activities from: {}", url, e);
            throw new RuntimeException("Failed to connect to activity service at: " + url, e);
        }
    }
}
