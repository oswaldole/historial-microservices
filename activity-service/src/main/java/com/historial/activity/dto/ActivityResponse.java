package com.historial.activity.dto;

import com.historial.activity.model.Activity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {

    private Long id;
    private Activity.ActivityType tipo;
    private Activity.Category categoria;
    private String equipo;
    private String tecnico;
    private String numFicha;
    private String turno;
    private String descripcion;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ActivityResponse fromActivity(Activity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .tipo(activity.getTipo())
                .categoria(activity.getCategoria())
                .equipo(activity.getEquipo())
                .tecnico(activity.getTecnico())
                .numFicha(activity.getNumFicha())
                .turno(activity.getTurno())
                .descripcion(activity.getDescripcion())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build();
    }
}
