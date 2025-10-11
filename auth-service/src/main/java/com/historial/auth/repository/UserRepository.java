package com.historial.auth.repository;

import com.historial.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByNumFicha(String numFicha);

    boolean existsByNumFicha(String numFicha);
}
