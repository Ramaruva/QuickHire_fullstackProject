package com.example.quickhirebackend.services;

import com.example.quickhirebackend.dao.StaffDetailsRepository;
import com.example.quickhirebackend.model.StaffDetails;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StaffDetailsService {

    private final StaffDetailsRepository staffDetailsRepository;

    @Autowired
    public StaffDetailsService(StaffDetailsRepository staffDetailsRepository) {
        this.staffDetailsRepository = staffDetailsRepository;
    }

    // Create and Update operation (if staffId is null it creates, otherwise updates)
    @Transactional
    public StaffDetails saveStaffDetails(StaffDetails staffDetails) {
        return staffDetailsRepository.save(staffDetails);
    }

    // Read operation for all staff details
    @Transactional(readOnly = true)
    public List<StaffDetails> findAllStaffDetails() {
        return staffDetailsRepository.findAll();
    }

    // Read operation for a single staff detail by id
    @Transactional(readOnly = true)
    public StaffDetails findStaffDetailsById(Integer id) {
        return staffDetailsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("StaffDetails not found for id: " + id));
    }

    // Delete operation
    @Transactional
    public void deleteStaffDetails(Integer id) {
        staffDetailsRepository.deleteById(id);
    }

    // Update operation (only if the entity exists)
    @Transactional
    public StaffDetails updateStaffDetails(Integer id, StaffDetails staffDetails) {
        return staffDetailsRepository.findById(id).map(existingStaff -> {
            // Copy properties from staffDetails to existingStaff, excluding the id
            if (staffDetails.getStaffUserProfileId() != null) existingStaff.setStaffUserProfileId(staffDetails.getStaffUserProfileId());
            // Include other fields that should be updatable...
            return staffDetailsRepository.save(existingStaff);
        }).orElseThrow(() -> new EntityNotFoundException("StaffDetails not found for id: " + id));
    }
}

