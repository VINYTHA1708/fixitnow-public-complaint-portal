package com.example.fixitnow.controller;

import com.example.fixitnow.model.User;
import com.example.fixitnow.model.UserRole;
import com.example.fixitnow.repository.UserRepository;
import com.example.fixitnow.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
    String phone = loginData.get("phone");
    String password = loginData.get("password");
    String roleIdStr = loginData.get("roleId");
    if (phone == null || password == null || roleIdStr == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Phone, password, and role are required"));
    }
    int expectedRoleId;
    try {
        expectedRoleId = Integer.parseInt(roleIdStr);
    } catch (NumberFormatException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Invalid role ID format"));
    }

Optional<User> userOpt = userRepository.findByPhone(phone);

    if (userOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid phone or password"));
    }

    User user = userOpt.get();

    if (!user.getPassword().equals(password)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid phone or password"));
    }

    if (user.getRole() == null || user.getRole().getId() != expectedRoleId) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("message", "Access denied: Role mismatch"));
    }

    return ResponseEntity.ok(user);
}


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            UserRole role = userRoleRepository.findById(user.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            user.setRole(role);
            User saved = userRepository.save(user);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
