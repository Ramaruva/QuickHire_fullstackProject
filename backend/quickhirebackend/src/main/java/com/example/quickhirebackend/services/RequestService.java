package com.example.quickhirebackend.services;
 
import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.dao.*;
import com.example.quickhirebackend.dto.EmployerRegistrationRequest;
import com.example.quickhirebackend.dto.ProfessionalRegistrationRequest;
import com.example.quickhirebackend.dto.ReviewRecord;
import com.example.quickhirebackend.dto.StaffAccountCreationDTO;
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
    private  final  EducationRepository educationRepository;
    private  final  QualificationRepository qualificationRepository;
    private final PaymentRepository paymentRepository;

    public RequestService(EmployerRequestRepository employerRequestRepository, EmployerDetailsRepository employerDetailsRepository, UserProfileRepository userProfileRepository, UserRepository userRepository, ProfessionalRequestRepository professionalRequestRepository, ProfessionalDetailsRepository professionalDetailsRepository, LoginService loginService, EmailService emailService, StaffDetailsRepository staffDetailsRepository, EducationRepository educationRepository, QualificationRepository qualificationRepository, PaymentRepository paymentRepository) {
        this.employerRequestRepository = employerRequestRepository;
        this.employerDetailsRepository = employerDetailsRepository;
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
        this.professionalRequestRepository = professionalRequestRepository;
        this.professionalDetailsRepository = professionalDetailsRepository;
        this.loginService = loginService;
        this.emailService = emailService;
        this.staffDetailsRepository = staffDetailsRepository;
        this.educationRepository = educationRepository;
        this.qualificationRepository = qualificationRepository;
        this.paymentRepository = paymentRepository;
    }
 
    public String employerRequest(ReviewRecord employerRequest) throws Exception {
        try{
       EmployerRequest employerRequestData = employerRequestRepository.findById(employerRequest.id()).stream().findFirst().orElseThrow();
       UserProfile userProfile = userProfileRepository.findById(employerRequestData.getProfId()).stream().findFirst().orElseThrow();
       if (employerRequest.requestType() == AllTypesEnums.UserRequestType.ACCOUNT_REJECTED){
            employerRequestData.setRequestType(employerRequest.requestType());
            employerRequestRepository.save(employerRequestData);
           String subject = "QuickHire Account Reject!";
           String body = "Dear User ,\n\n"
                   + employerRequest.reviewMessage() +"\n"
                   + "Best Regards,\n"
                   + "Team QuickHire\n\n"
                   + "Thanks,\n";
           emailService.sendMail(userProfile.getEmail(),subject,body);
           return "Rejected Successfully!";
       }else {
           // change request type
           employerRequestData.setRequestType(employerRequest.requestType());
           employerRequestRepository.save(employerRequestData);

           //set company name
           EmployerDetails newEmloyerDetails = new EmployerDetails();
           newEmloyerDetails.setCompanyName(employerRequestData.getCompanyName());
           newEmloyerDetails.setProfId(employerRequestData.getProfId());
           employerDetailsRepository.save(newEmloyerDetails);

           // set status to active

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
            professionalRequestData.setRequestType(AllTypesEnums.UserRequestType.ACCOUNT_REJECTED);
            professionalRequestRepository.save(professionalRequestData);
            String subject = "QuickHire Account Reject!";
            String body = "Dear User ,\n\n"
                          + professionalRequest.reviewMessage() +"\n"
                          + "Best Regards,\n"
                    + "Team QuickHire\n\n"
                    + "Thanks,\n";
            emailService.sendMail(userProfile.getEmail(),subject,body);
            return "Rejected Successfully!";
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
        String body = "Dear User,\n\n"
                + "We are happy to share with you that your QuickHire account has been activated. Below are your login credentials:\n\n"
                + "Username: " + userName + "\n"
                + "Password: " + randomPassword + "\n\n"
                + "Best Regards,\n"
                + "Team QuickHire\n\n"
                + "Thanks,\n";
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
            UserProfile newStaffMember = getUserProfile(staffData);
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

    private static UserProfile getUserProfile(StaffAccountCreationDTO staffData) {
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
        return newStaffMember;
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

    public List<ProfessionalRegistrationRequest> getProfessionalRequests(){
        try{
              List<ProfessionalRequest> professionalRequests = professionalRequestRepository.findByRequesttype(AllTypesEnums.UserRequestType.NEW_ACCOUNT);
              List<ProfessionalRegistrationRequest> professionalRegistrationRequests = new ArrayList<>();
              for(ProfessionalRequest professionalRequest:professionalRequests){
                  UserProfile userProfile = userProfileRepository.findById(professionalRequest.getProfId()).stream().findFirst().orElseThrow();
                  List<Education> educations = educationRepository.findByProfId(userProfile.getUserprofileid());
                  List<Qualification> qualification = qualificationRepository.findByProfid(userProfile.getUserprofileid());
                  ProfessionalRegistrationRequest professionalRequest1 = new ProfessionalRegistrationRequest();
                  professionalRequest1.setPrequestid(professionalRequest.getRequestId());
                  professionalRequest1.setFirstname(userProfile.getFirstname());
                  professionalRequest1.setLastname(userProfile.getLastname());
                  professionalRequest1.setAddress(userProfile.getAddress());
                  professionalRequest1.setEmail(userProfile.getEmail());
                  professionalRequest1.setPhone(userProfile.getPhone());
                  professionalRequest1.setCity(userProfile.getCity());
                  professionalRequest1.setState(userProfile.getState());
                  professionalRequest1.setPincode(userProfile.getPincode());
                  professionalRequest1.setUsername(userProfile.getUsername());
                  professionalRequest1.setQualification(qualification);
                  professionalRequest1.setEducation(educations);
                  professionalRegistrationRequests.add(professionalRequest1);
              }

            return professionalRegistrationRequests;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public  List<EmployerRegistrationRequest>  getEmployerRequests(){
        try{
             List<EmployerRequest> employerRequests = employerRequestRepository.findByRequesttype(AllTypesEnums.UserRequestType.NEW_ACCOUNT);
             List<EmployerRegistrationRequest> employerRegistrationRequests = new ArrayList<>();
             for(EmployerRequest employerRequest: employerRequests){
                 UserProfile userProfile = userProfileRepository.findById(employerRequest.getProfId()).stream().findFirst().orElseThrow();
                 EmployerRegistrationRequest employerRegistrationRequest = getEmployerRegistrationRequest(employerRequest, userProfile);
                 employerRegistrationRequests.add(employerRegistrationRequest);
             }
             return  employerRegistrationRequests;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public  List<ProfessionalRegistrationRequest> getAllProfessionalDetails(){
        try{
            //get all professionaldetails from profdetails table
            List<ProfessionalDetails> professionalDetails = professionalDetailsRepository.findAll();
            List<ProfessionalRegistrationRequest> professionalRegistrationRequests = new ArrayList<>();
            for(ProfessionalDetails professionalDetail: professionalDetails){
                //now get userprofiles
                UserProfile userProfile = userProfileRepository.findById(professionalDetail.getProfId()).stream().findFirst().orElseThrow();
                //now get his education and qualifications details
                List<Education> educations = educationRepository.findByProfId(userProfile.getUserprofileid());
                List<Qualification> qualifications = qualificationRepository.findByProfid(userProfile.getUserprofileid());
                //now get his payment details
                List<Payments> payments =  paymentRepository.findAllByProfId(userProfile.getUserprofileid());
                ProfessionalRegistrationRequest professionalRegistrationRequest = new ProfessionalRegistrationRequest();
                professionalRegistrationRequest.setFirstname(userProfile.getFirstname());
                professionalRegistrationRequest.setLastname(userProfile.getLastname());
                professionalRegistrationRequest.setEmail(userProfile.getEmail());
                professionalRegistrationRequest.setAddress(userProfile.getAddress());
                professionalRegistrationRequest.setState(userProfile.getState());
                professionalRegistrationRequest.setPhone(userProfile.getPhone());
                professionalRegistrationRequest.setPincode(userProfile.getPincode());
                professionalRegistrationRequest.setCity(userProfile.getCity());
                professionalRegistrationRequest.setPaymentHistory(payments);
                professionalRegistrationRequest.setEducation(educations);
                professionalRegistrationRequest.setQualification(qualifications);
                professionalRegistrationRequest.setUsername(userProfile.getUsername());
                professionalRegistrationRequest.setUserprofileid(userProfile.getUserprofileid());
                professionalRegistrationRequests.add(professionalRegistrationRequest);
            }
            return  professionalRegistrationRequests;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
    private static EmployerRegistrationRequest getEmployerRegistrationRequest(EmployerRequest employerRequest, UserProfile userProfile) {
        EmployerRegistrationRequest employerRegistrationRequest = new EmployerRegistrationRequest();
        employerRegistrationRequest.setFirstname(userProfile.getFirstname());
        employerRegistrationRequest.setLastname(userProfile.getLastname());
        employerRegistrationRequest.setAddress(userProfile.getAddress());
        employerRegistrationRequest.setRequestType(employerRequest.getRequestType());
        employerRegistrationRequest.setCity(userProfile.getCity());
        employerRegistrationRequest.setPhone(userProfile.getPhone());
        employerRegistrationRequest.setPincode(userProfile.getPincode());
        employerRegistrationRequest.setCompanyName(employerRequest.getCompanyName());
        employerRegistrationRequest.setState(userProfile.getState());
        employerRegistrationRequest.setUsername(userProfile.getUsername());
        employerRegistrationRequest.setEmail(userProfile.getEmail());
        employerRegistrationRequest.setPrequestid(employerRequest.getRequestId());
        return employerRegistrationRequest;
    }
}
