package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.model.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
    // Custom methods can be added here if needed
    List<Qualification> findByProfid(Integer profid);;
    List<Qualification> findByJobid(Integer jobid);
}