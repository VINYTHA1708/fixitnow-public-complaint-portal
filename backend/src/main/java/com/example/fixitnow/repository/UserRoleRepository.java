package com.example.fixitnow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fixitnow.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByRole(String role);
}
