package com.historial.activity.repository;

import com.historial.activity.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByTipo(Activity.ActivityType tipo);

    List<Activity> findByCategoria(Activity.Category categoria);

    List<Activity> findByEquipo(String equipo);

    List<Activity> findByNumFicha(String numFicha);

    List<Activity> findByTurno(String turno);

    @Query("SELECT a FROM Activity a WHERE a.createdAt BETWEEN :startDate AND :endDate")
    List<Activity> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                   @Param("endDate") LocalDateTime endDate);

    @Query("SELECT a FROM Activity a WHERE a.tipo = :tipo AND a.categoria = :categoria")
    List<Activity> findByTipoAndCategoria(@Param("tipo") Activity.ActivityType tipo,
                                          @Param("categoria") Activity.Category categoria);

    @Query("SELECT a FROM Activity a WHERE a.equipo = :equipo ORDER BY a.createdAt DESC")
    List<Activity> findByEquipoOrderByCreatedAtDesc(@Param("equipo") String equipo);
}
