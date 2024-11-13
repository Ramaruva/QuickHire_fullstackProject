package com.example.quickhirebackend.services;

import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.dao.EmployerDetailsRepository;
import com.example.quickhirebackend.dao.UserProfileDao;
import com.example.quickhirebackend.dao.UserProfileRepository;
import com.example.quickhirebackend.dto.EmployerRegistrationRequest;
import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.EmployerDetails;
import com.example.quickhirebackend.model.EmployerRequest;
import com.example.quickhirebackend.model.UserProfile;
import org.springframework.stereotype.Service;

@Service
public class EmployerRegisterService {

    private  final UserProfileDao userProfileDao;
    private  final  EmployerRequestService employerRequestService;
    private final UserProfileRepository userProfileRepository;
    private final EmployerDetailsRepository employerDetailsRepository;

    public EmployerRegisterService(UserProfileDao userProfileDao, EmployerRequestService employerRequestService, UserProfileRepository userProfileRepository, EmployerDetailsRepository employerDetailsRepository) {
        this.userProfileDao = userProfileDao;
        this.employerRequestService = employerRequestService;
        this.userProfileRepository = userProfileRepository;
        this.employerDetailsRepository = employerDetailsRepository;
    }

    public int newRegistration(EmployerRegistrationRequest employerRegistrationRequest) throws Exception {
         try{
            //creating an userprofile
             UserProfile employerProfile = new UserProfile();
             employerProfile.setAddress(employerRegistrationRequest.getAddress());
             employerProfile.setFirstname(employerRegistrationRequest.getFirstname());
             employerProfile.setLastname(employerRegistrationRequest.getLastname());
             employerProfile.setEmail(employerRegistrationRequest.getEmail());
             employerProfile.setPhone(employerRegistrationRequest.getPhone());
             employerProfile.setCity(employerRegistrationRequest.getCity());
             employerProfile.setState(employerRegistrationRequest.getState());
             employerProfile.setPincode(employerRegistrationRequest.getPincode());
             employerProfile.setUsername(employerRegistrationRequest.getUsername());
             UserProfile savedEmployerProfile = userProfileDao.CreateUser(employerProfile);

             //now creating employer requests form by linking with respective userprofile

             EmployerRequest employerRequest = new EmployerRequest();
             employerRequest.setRequestType(employerRegistrationRequest.getRequestType());
             employerRequest.setCompanyName(employerRegistrationRequest.getCompanyName());
             employerRequest.setProfId(savedEmployerProfile.getUserprofileid());

             return  employerRequestService.createEmployerRequest(employerRequest).getRequestId();


         }
         catch (CustomDuplicateUsernameException e){
             throw  new  CustomDuplicateUsernameException(e.getMessage());
         }
         catch (Exception e){
             throw  new Exception(e.getMessage());
         }
    }

    public String DeleteRequest(Integer userProfileId) throws Exception {
        try{
            EmployerRequest employerRequest = employerRequestService.getEmployerRequestByUserProfileId(userProfileId).stream().findFirst().orElse(null);
            if(employerRequest!=null){
              employerRequest.setRequestType(AllTypesEnums.UserRequestType.DELETE_REQUESTED);
              employerRequestService.updateEmployerRequest(employerRequest);
              return "Delete Requested Successfully!";
            }
            else {
                throw new CustomDuplicateUsernameException("Request failed!");
            }
        }
        catch (Exception e){
             throw new Exception(e.getMessage());
        }
    }

    public String employerEditMethod(EmployerRegistrationRequest editDataDetails){
        //first we will update the userprofile
        if(editDataDetails.getUsername()!=null){
            throw new CustomDuplicateUsernameException("Username cannot be Edited!");
        }
        UserProfile employerUserProfile = userProfileRepository.findById(editDataDetails.getUserprofileid()).stream().findFirst().orElse(new UserProfile());

        employerUserProfile.setFirstname(editDataDetails.getFirstname());
        employerUserProfile.setLastname(editDataDetails.getLastname());
        employerUserProfile.setEmail(editDataDetails.getEmail());
        employerUserProfile.setPhone(editDataDetails.getPhone());
        employerUserProfile.setPincode(editDataDetails.getPincode());
        employerUserProfile.setCity(editDataDetails.getCity());
        employerUserProfile.setState(editDataDetails.getState());
        employerUserProfile.setAddress(editDataDetails.getAddress());
        userProfileRepository.save(employerUserProfile);

        //need to update the employer details

        return "Employer Details Updated successfully!";

    }

    public UserProfile getEmployDetail(Integer id) {
        try{
            UserProfile userProfile = userProfileRepository.findById(id).stream().findFirst().orElseThrow();
            return  userProfile;
        }
        catch (Exception e){
          throw new RuntimeException(e.getMessage());
        }
    }
}
