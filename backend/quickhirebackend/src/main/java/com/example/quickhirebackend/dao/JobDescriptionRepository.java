package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.model.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobDescriptionRepository extends JpaRepository<JobDescription, Integer> {
    // Custom query methods can be added here
    List<JobDescription> findByempid(Integer empid);
}
