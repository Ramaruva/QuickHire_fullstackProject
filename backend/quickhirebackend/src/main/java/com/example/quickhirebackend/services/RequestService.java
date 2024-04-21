package com.example.quickhirebackend.services;
 
import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.dao.*;
import com.example.quickhirebackend.dto.ReviewRecord;
import com.example.quickhirebackend.dto.StaffAccountCreationDTO;
import com.example.quickhirebackend.dto.UserActiveInfo;
import com.example.quickhirebackend.model.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
 
import java.util.ArrayList;
import java.util.List;
 
@Service
public class RequestService {
 
    private final EmployerRequestRepository employerRequestRepository;
    private final EmployerDetailsRepository employerDetailsRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final ProfessionalRequestRepository professionalRequestRepository;
    private final ProfessionalDetailsRepository professionalDetailsRepository;
    private  final  LoginService loginService;
    private  final  EmailService emailService;
    private  final  StaffDetailsRepository staffDetailsRepository;

    public RequestService(EmployerRequestRepository employerRequestRepository, EmployerDetailsRepository employerDetailsRepository, UserProfileRepository userProfileRepository, UserRepository userRepository, ProfessionalRequestRepository professionalRequestRepository, ProfessionalDetailsRepository professionalDetailsRepository, LoginService loginService, EmailService emailService, StaffDetailsRepository staffDetailsRepository) {
        this.employerRequestRepository = employerRequestRepository;
        this.employerDetailsRepository = employerDetailsRepository;
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
        this.professionalRequestRepository = professionalRequestRepository;
        this.professionalDetailsRepository = professionalDetailsRepository;
        this.loginService = loginService;
        this.emailService = emailService;
        this.staffDetailsRepository = staffDetailsRepository;
    }
 
    public String employerRequest(ReviewRecord employerRequest) throws Exception {
        try{
       EmployerRequest employerRequestData = employerRequestRepository.findById(employerRequest.id()).stream().findFirst().orElse(null);
       UserProfile userProfile = userProfileRepository.findById(employerRequestData.getProfId()).stream().findFirst().orElse(null);
       if (employerRequest.requestType() == AllTypesEnums.UserRequestType.ACCOUNT_REJECTED){
        return "";
       }else {
           // change request type
           assert employerRequestData != null;
           employerRequestData.setRequestType(employerRequest.requestType());
           employerRequestRepository.save(employerRequestData);

           //set company name
           EmployerDetails newEmloyerDetails = new EmployerDetails();
           newEmloyerDetails.setCompanyName(employerRequestData.getCompanyName());
           newEmloyerDetails.setProfId(employerRequestData.getProfId());
           employerDetailsRepository.save(newEmloyerDetails);

           // set status to active

           assert userProfile != null;
           userProfile.setStatus(AllTypesEnums.UserProfileStatus.ACTIVATED);
           userProfileRepository.save(userProfile);
 
           // update user table
           createNewUser(employerRequestData.getProfId(), AllTypesEnums.UserType.EMPLOYER,AllTypesEnums.UserStatus.ACTIVE,userProfile.getUsername(),userProfile.getEmail());
 
           return "Employer has been Succesfully Accepted";
       }}
        catch (Exception e){
            throw  new Exception(e.getMessage());
        }
    }
 
    public String professionalRequest(ReviewRecord professionalRequest) throws Exception {
        try{
           ProfessionalRequest professionalRequestData = professionalRequestRepository.findById(professionalRequest.id()).stream().findFirst().orElse(null);
           UserProfile userProfile = userProfileRepository.findById(professionalRequestData.getProfId()).stream().findFirst().orElse(new UserProfile());
        if (professionalRequest.requestType() == AllTypesEnums.UserRequestType.ACCOUNT_REJECTED){
            return "";
        }else {
            // change the status
            professionalRequestData.setRequestType(professionalRequest.requestType());
            professionalRequestRepository.save(professionalRequestData);
 
            // set schoolname, major completiontime profid
            ProfessionalDetails professionalDetails = new ProfessionalDetails();
            professionalDetails.setSchoolName(professionalRequestData.getSchoolName());
            professionalDetails.setMajor(professionalRequestData.getMajor());
            professionalDetails.setCompletionTime(professionalRequestData.getCompletionTime());
            professionalDetails.setProfId(professionalRequestData.getProfId());
            professionalDetailsRepository.save(professionalDetails);
 
            // set status in user profile
 
            userProfile.setStatus(AllTypesEnums.UserProfileStatus.ACTIVATED);
            userProfileRepository.save(userProfile);
 
            // create  username password usertype status profid ispasswordchanges
            createNewUser(userProfile.getUserprofileid(), AllTypesEnums.UserType.PROFESSIONAL,AllTypesEnums.UserStatus.ACTIVE,userProfile.getUsername(),userProfile.getEmail());
 
            return "Professional account has been Created!";
        }
    }catch (Exception e){
        throw  new Exception(e.getMessage());
    }
    }
 
    public void createNewUser(Integer profId, AllTypesEnums.UserType userType, AllTypesEnums.UserStatus status, String userName, String email){
        User user = new User();
        user.setProfId(profId);
        user.setUserType(userType);
        user.setStatus(status);
        user.setIsPasswordChanged("No");
        user.setUsername(userName);
        String randomPassword = loginService.passwordGenerator();
        String hashedPassword = loginService.passwordHasher(randomPassword);
        user.setPassword(hashedPassword);
        userRepository.save(user);
        String subject = "QuickHire Account Accepted";
        String body="We are happy to share you that your account has been Activated, and this is your credentials  to login username:"+userName+"password:"+randomPassword+"/n"+"Best"+"/n"+"Team QuickHire";
        emailService.sendMail(email,subject,body);
 
    }
 
    public String professionalDeleteRequest(Integer requestID){
        //need to update in professional request data
        ProfessionalRequest professionalRequest = professionalRequestRepository.findById(requestID).stream().findFirst().orElse(new ProfessionalRequest());
        professionalRequest.setRequestType(AllTypesEnums.UserRequestType.DELETE_ACCEPTED);
        professionalRequestRepository.save(professionalRequest);
        //need to update in userprofile
        DeleteUserDetails(professionalRequest.getProfId());
        return "Account Deleted Successfully!";
    }
 
    public  String employerDeleteRequest(Integer requestID){
        //update employerReq
        EmployerRequest employerRequestData = employerRequestRepository.findById(requestID).stream().findFirst().orElse(new EmployerRequest());
        employerRequestData.setRequestType(AllTypesEnums.UserRequestType.DELETE_ACCEPTED);
        employerRequestRepository.save(employerRequestData);
        //update the userprofile
        DeleteUserDetails(employerRequestData.getProfId());
        return  "Account Deleted Successfully!";
    }
    public void DeleteUserDetails(Integer userID){
        UserProfile userData = userProfileRepository.findById(userID).stream().findFirst().orElse(new UserProfile());
        userData.setStatus(AllTypesEnums.UserProfileStatus.DELETED);
        userProfileRepository.save(userData);
 
        User user = userRepository.findById(userData.getUsername()).stream().findFirst().orElse(new User());
        user.setStatus(AllTypesEnums.UserStatus.INACTIVE);
        userRepository.save(user);
    }
 
    public String staffAccountCreation(StaffAccountCreationDTO staffData){
        //creating userprofile
        try {
            UserProfile newStaffMember = new UserProfile();
            newStaffMember.setFirstname(staffData.getFirstname());
            newStaffMember.setLastname(staffData.getLastname());
            newStaffMember.setStatus(AllTypesEnums.UserProfileStatus.ACTIVATED);
            newStaffMember.setCity(staffData.getCity());
            newStaffMember.setState(staffData.getState());
            newStaffMember.setPincode(staffData.getPincode());
            newStaffMember.setAddress(staffData.getAddress());
            newStaffMember.setPincode(staffData.getPincode());
            newStaffMember.setUsername(staffData.getUsername());
            newStaffMember.setEmail(staffData.getEmail());
            newStaffMember.setPhone(staffData.getPhone());
            UserProfile savedStaffUserProfile = userProfileRepository.save(newStaffMember);
 
            createNewUser(savedStaffUserProfile.getUserprofileid(), AllTypesEnums.UserType.STAFF, AllTypesEnums.UserStatus.ACTIVE, savedStaffUserProfile.getUsername(), savedStaffUserProfile.getEmail());
            //creating staff profile
            StaffDetails staffDetails = new StaffDetails();
            staffDetails.setStaffUserProfileId(savedStaffUserProfile.getUserprofileid());
            staffDetailsRepository.save(staffDetails);
            return "Staff account has been created Successfully! and please check your mail for credentials ";
        }
        catch (DataIntegrityViolationException e){
            throw  new CustomDuplicateUsernameException("Username Already Existed!");
        }
 
    }
 
    public List<UserProfile> allStaffAccounts(){
        try{
          //  List<UserActiveInfo> staffUsers = userRepository.findActiveStaffWithoutPassword();
            List<Integer> staffIds = userRepository.findActiveStaffProfIds(AllTypesEnums.UserType.STAFF,AllTypesEnums.UserStatus.ACTIVE);
            List<UserProfile> staffUserProfiles = new ArrayList<>();
            for(Integer id:staffIds){
                UserProfile userProfile = userProfileRepository.findById(id).stream().findFirst().orElseThrow();
                staffUserProfiles.add(userProfile);
            }
            return staffUserProfiles;
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
 
}
