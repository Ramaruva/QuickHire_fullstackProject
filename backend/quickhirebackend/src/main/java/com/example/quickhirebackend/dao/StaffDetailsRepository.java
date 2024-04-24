package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.StaffDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StaffDetailsRepository extends JpaRepository<StaffDetails , Integer> {
    @Query("SELECT s FROM StaffDetails s WHERE s.staff_userprofileid = :staff_userprofileid")
    Optional<StaffDetails> findByStaffUserProfileId(@Param("staff_userprofileid") Integer staffUserProfileId);
}
