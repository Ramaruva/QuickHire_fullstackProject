package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payments, Integer> {
    // Additional query methods can be defined here
//    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.profid = :profid")
//    Double sumAmountByProfid(@Param("profid") Integer profid);
    @Query("SELECT p FROM Payments p WHERE p.profid = ?1")
    List<Payments> findAllByProfId(Integer profid);
}

