package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Integer> {
    // Here you can define custom query methods if needed
}