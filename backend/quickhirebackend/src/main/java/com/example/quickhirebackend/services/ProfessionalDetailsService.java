package com.example.quickhirebackend.services;

import com.example.quickhirebackend.dao.ProfessionalDetailsRepository;
import com.example.quickhirebackend.model.EmployerRequest;
import com.example.quickhirebackend.model.ProfessionalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ProfessionalDetailsService {

    private  final ProfessionalDetailsRepository professionalDetailsRepository;

    @Autowired
    public ProfessionalDetailsService(ProfessionalDetailsRepository professionalDetailsRepository) {
        this.professionalDetailsRepository = professionalDetailsRepository;
    }

    public ProfessionalDetails createProfessionalDetails(ProfessionalDetails professionalDetails){
        return  professionalDetailsRepository.save(professionalDetails);
    }

    public List<ProfessionalDetails> getAllProfessionalDetails() {
        return professionalDetailsRepository.findAll();
    }

    // Retrieve a single ProfessionalDetails by ID
    public Optional<ProfessionalDetails> getProfessionalDetailsById(Integer id) {
        return professionalDetailsRepository.findById(id);
    }

    public   ProfessionalDetails updateProfessionalDetails(ProfessionalDetails professionalDetails) {
        return professionalDetailsRepository.save(professionalDetails);
    }

    public void deleteProfessionalDetails(Integer id) {
        professionalDetailsRepository.deleteById(id);
    }

    public  Optional<ProfessionalDetails>  getProfessionalDetailsByUserProfileId(Integer id){
        return professionalDetailsRepository.findByProfid(id);
    }

}
