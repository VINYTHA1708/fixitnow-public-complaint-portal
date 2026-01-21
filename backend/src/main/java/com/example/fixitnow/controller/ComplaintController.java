package com.example.fixitnow.controller;

import com.example.fixitnow.model.Complaint;
import com.example.fixitnow.model.User;
import com.example.fixitnow.repository.ComplaintRepository;
import com.example.fixitnow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*") 
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        return complaintRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> getComplaintsByUser(@PathVariable Long userId) {
        System.out.println("Fetching complaints for user: " + userId);
        List<Complaint> list = complaintRepository.findByUserId(userId);
        System.out.println("Found complaints: " + list.size());
        return list;
    }

    @GetMapping("/staff/{staffId}")
    public List<Complaint> getComplaintsAssignedToStaff(@PathVariable Long staffId) {
        return complaintRepository.findAll().stream()
                .filter(c -> c.getAssignedStaff() != null && c.getAssignedStaff().getId().equals(staffId))
                .toList();
    }

    @PostMapping
    public ResponseEntity<Complaint> addComplaint(@RequestBody Complaint complaint) {
        User user = userRepository.findById(complaint.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        complaint.setUser(user);
        complaint.setStatus("Pending");
        complaint.setUpvotes(0);

        Complaint savedComplaint = complaintRepository.save(complaint);
        return ResponseEntity.ok(savedComplaint);
    }

    @PutMapping("/{complaintId}/assign/{staffId}")
    public ResponseEntity<Map<String, String>> assignComplaintToStaff(@PathVariable Long complaintId, @PathVariable Long staffId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        complaint.setAssignedStaff(staff);
        complaint.setStatus("Assigned");
        complaintRepository.save(complaint);

        return ResponseEntity.ok(Map.of(
        "message", "Complaint assigned to staff: " + staff.getName()
    ));

    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    complaint.setStatus(status);
                    return ResponseEntity.ok(complaintRepository.save(complaint));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/upvote")
    public ResponseEntity<Complaint> upvoteComplaint(@PathVariable Long id) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    complaint.setUpvotes(complaint.getUpvotes() + 1);
                    return ResponseEntity.ok(complaintRepository.save(complaint));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
        if (complaintRepository.existsById(id)) {
            complaintRepository.deleteById(id);
            return ResponseEntity.ok("Complaint deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Complaint not found!");
        }
    }

    @GetMapping("/assigned/{staffId}")
    public ResponseEntity<List<Complaint>> getAssignedComplaints(@PathVariable Long staffId) {
        List<Complaint> complaints = complaintRepository.findByAssignedStaffId(staffId);
        return ResponseEntity.ok(complaints);
    }
}
