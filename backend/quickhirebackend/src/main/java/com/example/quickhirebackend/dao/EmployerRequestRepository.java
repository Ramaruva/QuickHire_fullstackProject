package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.EmployerRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployerRequestRepository extends JpaRepository<EmployerRequest,Integer> {
    Optional<EmployerRequest> findByProfid(Integer profid);
    List<EmployerRequest> findByRequesttype(AllTypesEnums.UserRequestType requesttype);
}
