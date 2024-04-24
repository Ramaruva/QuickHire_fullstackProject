package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.model.Matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Matches, Integer> {
    // Custom query methods can be added here
    Optional<Matches> findByProfessionalidAndJobid(Integer professionalid, Integer jobid);

    @Transactional
    @Modifying
    @Query("DELETE FROM Matches m WHERE m.jobid = ?1")
    void deleteByJobId(Integer jobid);
}
