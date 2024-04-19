package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.model.Matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Matches, Integer> {
    // Custom query methods can be added here
    Optional<Matches> findByProfessionalidAndJobid(Integer professionalid, Integer jobid);
}
