package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.model.ProfessionalRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessionalRequestDao {
    @Autowired
    private  ProfessionalRequestRepository professionalRequestRepository;

    public ProfessionalRequest createProfessionalRequest(ProfessionalRequest professionalRequest) {
        return professionalRequestRepository.save(professionalRequest);
    }

    public List<ProfessionalRequest> getAllProfessionalRequests() {
        return professionalRequestRepository.findAll();
    }

    public Optional<ProfessionalRequest> getProfessionalRequestById(Integer id) {
        return professionalRequestRepository.findById(id);
    }

    public ProfessionalRequest updateProfessionalRequest(ProfessionalRequest professionalRequest) {
        return professionalRequestRepository.save(professionalRequest);
    }

    public void deleteProfessionalRequest(Integer id) {
        professionalRequestRepository.deleteById(id);
    }

    public  Optional<ProfessionalRequest> getProfessionalRequestByUserprofileId(Integer id){
        return  professionalRequestRepository.findByProfid(id);
    }

}
