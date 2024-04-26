package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.Matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Matches, Integer> {
    // Custom query methods can be added here
//    Optional<Matches> findByProfessionalidAndJobid(Integer professionalId, Integer jobid);

    @Transactional
    @Modifying
    @Query("DELETE FROM Matches m WHERE m.jobId = ?1")
    void deleteByJobId(Integer jobId);

    List<Matches> findBystatus(AllTypesEnums.MatchType status);

    List<Matches> findByStatusAndProfessionalId(AllTypesEnums.MatchType status, Integer professionalId);

    List<Matches> findByStatusAndJobId(AllTypesEnums.MatchType status,Integer jobId);
    Optional<Matches> findByProfessionalIdAndJobId(Integer professionalId, Integer jobId);

   // List<Matches> findByJobIdAndNotification(Integer jobId, String notification);

    @Transactional
    @Modifying
    @Query("DELETE FROM Matches e WHERE e.professionalId = ?1")
    void deleteByProfessionalId(Integer professionalid);


}
