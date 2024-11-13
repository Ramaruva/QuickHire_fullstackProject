package com.example.quickhirebackend.services;

import com.example.quickhirebackend.dao.EmployerDetailsRepository;
import com.example.quickhirebackend.model.EmployerDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerDetailsService {

    private final EmployerDetailsRepository employerDetailsRepository;

    @Autowired
    public EmployerDetailsService(EmployerDetailsRepository employerDetailsRepository) {
        this.employerDetailsRepository = employerDetailsRepository;
    }

    public EmployerDetails createEmployerDetails(EmployerDetails employerDetails) {
        return employerDetailsRepository.save(employerDetails);
    }

    public List<EmployerDetails> getAllEmployerDetails() {
        return employerDetailsRepository.findAll();
    }

    public Optional<EmployerDetails> getEmployerDetailsById(Integer employerId) {
        return employerDetailsRepository.findById(employerId);
    }

    public  Optional<EmployerDetails>  getEmployerDetailsByUserProfileId(Integer id){
        return employerDetailsRepository.findByProfid(id);
    }

    public EmployerDetails updateEmployerDetails(Integer employerId, EmployerDetails employerDetails) {
        return employerDetailsRepository.findById(employerId)
                .map(existingEmployerDetails -> {
                    existingEmployerDetails.setCompanyName(employerDetails.getCompanyName());
                    // Handle other updates here
                    return employerDetailsRepository.save(existingEmployerDetails);
                })
                .orElseGet(() -> {
                    employerDetails.setEmployerId(employerId);
                    return employerDetailsRepository.save(employerDetails);
                });
    }

    public void deleteEmployerDetails(Integer employerId) {
        employerDetailsRepository.deleteById(employerId);
    }
}
