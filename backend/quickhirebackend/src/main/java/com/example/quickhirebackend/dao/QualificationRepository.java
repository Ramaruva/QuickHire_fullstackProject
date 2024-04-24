package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.model.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
    // Custom methods can be added here if needed
    List<Qualification> findByProfid(Integer profid);;
    List<Qualification> findByJobid(Integer jobid);

    @Transactional
    @Modifying
    @Query("DELETE from Qualification q WHERE q.jobid=?1")
    void deleteByJobId(Integer jobid);
}