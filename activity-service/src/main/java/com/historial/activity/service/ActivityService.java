package com.historial.activity.service;

import com.historial.activity.dto.ActivityRequest;
import com.historial.activity.dto.ActivityResponse;
import com.historial.activity.model.Activity;
import com.historial.activity.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityResponse createActivity(ActivityRequest request) {
        Activity activity = Activity.builder()
                .tipo(request.getTipo())
                .categoria(request.getCategoria())
                .equipo(request.getEquipo())
                .tecnico(request.getTecnico())
                .numFicha(request.getNumFicha())
                .turno(request.getTurno())
                .descripcion(request.getDescripcion())
                .build();

        Activity savedActivity = activityRepository.save(activity);
        return ActivityResponse.fromActivity(savedActivity);
    }

    public List<ActivityResponse> getAllActivities() {
        return activityRepository.findAll().stream()
                .map(ActivityResponse::fromActivity)
                .collect(Collectors.toList());
    }

    public ActivityResponse getActivityById(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
        return ActivityResponse.fromActivity(activity);
    }

    public List<ActivityResponse> getActivitiesByType(Activity.ActivityType tipo) {
        return activityRepository.findByTipo(tipo).stream()
                .map(ActivityResponse::fromActivity)
                .collect(Collectors.toList());
    }

    public List<ActivityResponse> getActivitiesByCategory(Activity.Category categoria) {
        return activityRepository.findByCategoria(categoria).stream()
                .map(ActivityResponse::fromActivity)
                .collect(Collectors.toList());
    }

    public List<ActivityResponse> getActivitiesByEquipo(String equipo) {
        return activityRepository.findByEquipoOrderByCreatedAtDesc(equipo).stream()
                .map(ActivityResponse::fromActivity)
                .collect(Collectors.toList());
    }

    public List<ActivityResponse> getActivitiesByNumFicha(String numFicha) {
        return activityRepository.findByNumFicha(numFicha).stream()
                .map(ActivityResponse::fromActivity)
                .collect(Collectors.toList());
    }

    public List<ActivityResponse> getActivitiesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return activityRepository.findByDateRange(startDate, endDate).stream()
                .map(ActivityResponse::fromActivity)
                .collect(Collectors.toList());
    }

    public ActivityResponse updateActivity(Long id, ActivityRequest request) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));

        activity.setTipo(request.getTipo());
        activity.setCategoria(request.getCategoria());
        activity.setEquipo(request.getEquipo());
        activity.setTecnico(request.getTecnico());
        activity.setTurno(request.getTurno());
        activity.setDescripcion(request.getDescripcion());

        Activity updatedActivity = activityRepository.save(activity);
        return ActivityResponse.fromActivity(updatedActivity);
    }

    public void deleteActivity(Long id) {
        if (!activityRepository.existsById(id)) {
            throw new RuntimeException("Activity not found with id: " + id);
        }
        activityRepository.deleteById(id);
    }
}
