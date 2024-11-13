package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.ProfessionalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessionalDetailsRepository  extends JpaRepository<ProfessionalDetails,Integer> {
    Optional<ProfessionalDetails> findByProfid(Integer profid);
    
   int deleteByProfid(int profid);
}
