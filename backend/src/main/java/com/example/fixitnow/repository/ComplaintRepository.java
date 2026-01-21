package com.example.fixitnow.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.fixitnow.model.Complaint;
import com.example.fixitnow.model.ComplaintCategory;
import com.example.fixitnow.model.User;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUser(User user);

    List<Complaint> findByCategory(ComplaintCategory category);

    List<Complaint> findByStatus(String status);
    
    List<Complaint> findByUserId(Long userId);
    
    List<Complaint> findByAssignedStaffId(Long staffId);
}
