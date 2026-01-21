package com.example.fixitnow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fixitnow.model.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmail(String email);

        Optional<User> findByPhone(String phone);


    }
