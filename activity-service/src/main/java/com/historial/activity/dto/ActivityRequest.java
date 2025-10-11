package com.historial.activity.dto;

import com.historial.activity.model.Activity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {

    @NotNull(message = "Activity type is required")
    private Activity.ActivityType tipo;

    @NotNull(message = "Category is required")
    private Activity.Category categoria;

    @NotBlank(message = "Equipment name is required")
    private String equipo;

    @NotBlank(message = "Technician name is required")
    private String tecnico;

    @NotBlank(message = "Employee number is required")
    private String numFicha;

    @NotBlank(message = "Shift is required")
    private String turno;

    @NotBlank(message = "Description is required")
    private String descripcion;
}
