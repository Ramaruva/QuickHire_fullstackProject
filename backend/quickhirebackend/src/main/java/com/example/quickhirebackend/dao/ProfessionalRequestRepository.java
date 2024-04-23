package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.ProfessionalRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfessionalRequestRepository extends JpaRepository<ProfessionalRequest,Integer> {
    //This will automatically have basic CRUD methods
    Optional<ProfessionalRequest> findByProfid(Integer profid);

    List<ProfessionalRequest> findByRequesttype(AllTypesEnums.UserRequestType requesttype);
}
