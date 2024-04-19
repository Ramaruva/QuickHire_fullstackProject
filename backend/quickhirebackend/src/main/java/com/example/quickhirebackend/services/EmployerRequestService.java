package com.example.quickhirebackend.services;

import com.example.quickhirebackend.dao.EmployerRequestRepository;
import com.example.quickhirebackend.model.EmployerRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;



@Service
public class EmployerRequestService {
    @Autowired
    private EmployerRequestRepository employerRequestRepository;

    public EmployerRequest createEmployerRequest(EmployerRequest employerRequest) {
        return employerRequestRepository.save(employerRequest);
    }

    public List<EmployerRequest> getAllEmployerRequests() {
        return employerRequestRepository.findAll();
    }

    public Optional<EmployerRequest> getEmployerRequestById(Integer id) {
        return employerRequestRepository.findById(id);
    }

    public EmployerRequest updateEmployerRequest(EmployerRequest employerRequest) {
        return employerRequestRepository.save(employerRequest);
    }

    public void deleteEmployerRequest(Integer id) {
        employerRequestRepository.deleteById(id);
    }

    public  Optional<EmployerRequest> getEmployerRequestByUserProfileId(Integer id){
        return  employerRequestRepository.findByProfid(id);
    }

}
