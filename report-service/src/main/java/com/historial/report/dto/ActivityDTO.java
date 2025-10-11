package com.historial.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDTO {

    private Long id;
    private String tipo;
    private String categoria;
    private String equipo;
    private String tecnico;
    private String numFicha;
    private String turno;
    private String descripcion;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
