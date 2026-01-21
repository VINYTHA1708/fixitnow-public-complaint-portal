package com.example.fixitnow.controller;

import com.example.fixitnow.model.UserRole;
import com.example.fixitnow.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class UserRoleController {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @PostMapping
    public ResponseEntity<UserRole> addRole(@RequestBody UserRole role) {
        UserRole savedRole = userRoleRepository.save(role);
        return ResponseEntity.ok(savedRole);
    }

    @GetMapping
    public List<UserRole> getAllRoles() {
        return userRoleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRole> getRoleById(@PathVariable Long id) {
        return userRoleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserRole> updateRole(@PathVariable Long id, @RequestBody UserRole updatedRole) {
        return userRoleRepository.findById(id)
            .map(existingRole -> {
                existingRole.setRole(updatedRole.getRole());
                existingRole.setDescription(updatedRole.getDescription());
                UserRole saved = userRoleRepository.save(existingRole);
                return ResponseEntity.ok(saved);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Long id) {
        if (userRoleRepository.existsById(id)) {
            userRoleRepository.deleteById(id);
            return ResponseEntity.ok("Role deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Role not found");
        }
    }

}
