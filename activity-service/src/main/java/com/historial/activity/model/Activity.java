package com.historial.activity.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType tipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category categoria;

    @Column(nullable = false)
    private String equipo;

    @Column(nullable = false)
    private String tecnico;

    @Column(name = "num_ficha", nullable = false)
    private String numFicha;

    @Column(nullable = false)
    private String turno;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ActivityType {
        FALLA,      // Failure/breakdown
        RUTINA,     // Routine maintenance
        TRABAJO_TALLER  // Workshop work
    }

    public enum Category {
        ZONA_CALIENTE,  // Hot Zone
        ZONA_FRIA,      // Cold Zone
        TALLER,         // Workshop
        OTROS           // Others
    }
}
