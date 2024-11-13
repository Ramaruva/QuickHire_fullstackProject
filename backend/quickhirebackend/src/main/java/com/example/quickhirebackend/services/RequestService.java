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
    private  final MatchRepository matchRepository;

    public RequestService(EmployerRequestRepository employerRequestRepository, EmployerDetailsRepository employerDetailsRepository, UserProfileRepository userProfileRepository, UserRepository userRepository, ProfessionalRequestRepository professionalRequestRepository, ProfessionalDetailsRepository professionalDetailsRepository, LoginService loginService, EmailService emailService, StaffDetailsRepository staffDetailsRepository, EducationRepository educationRepository, QualificationRepository qualificationRepository, PaymentRepository paymentRepository, MatchRepository matchRepository) {
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
        this.matchRepository = matchRepository;
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
 
    public String professionalDeleteRequest(Integer requestID, AllTypesEnums.UserRequestType userRequestType, String message){
        //need to update in professional request data
        try{
            //check status
            ProfessionalRequest professionalRequest = professionalRequestRepository.findById(requestID).stream().findFirst().orElseThrow();
            UserProfile userProfile = userProfileRepository.findById(professionalRequest.getProfId()).stream().findFirst().orElseThrow();
            if(userRequestType== AllTypesEnums.UserRequestType.DELETE_ACCEPTED) {
                professionalRequest.setRequestType(AllTypesEnums.UserRequestType.DELETE_ACCEPTED);
                professionalRequestRepository.save(professionalRequest);
                //need to update in userprofile
                DeleteUserDetails(professionalRequest.getProfId());
                // need to get all his matches
                ProfessionalDetails professionalDetails = professionalDetailsRepository.findByProfid(professionalRequest.getProfId()).stream().findFirst().orElseThrow();
                matchRepository.deleteByProfessionalId(professionalDetails.getProfessionalId());
                String subject = "QuickHire: Account Deletion Confirmation";
                String body = "Dear Customer,\n\n" +
                        "Thank you for being a valued customer of QuickHire.\n" +
                        "Your account has been successfully deleted.\n" +
                        "We hope to see you join again soon!\n\n" +
                        "Best regards,\n" +
                        "The QuickHire Team";
                 emailService.sendMail(userProfile.getEmail(),subject,body);
                return "Account Deleted Successfully!";
            }
            else {
                String subject = "QuickHire: Account Deletion Rejection";
                String body = "<html><body>" +
                        "<p>Dear Customer,</p>" +
                        "<p>We regret to inform you that your account deletion request has been rejected.</p>" +
                         message +
                        "<p>Please review the provided information and resubmit your request.</p>" +
                        "<p>Best regards,<br/>The QuickHire Team</p>" +
                        "</body></html>";
                professionalRequest.setRequestType(AllTypesEnums.UserRequestType.DELETE_REJECTED);
                professionalRequestRepository.save(professionalRequest);
                emailService.sendMail(userProfile.getEmail(),subject,body);
                return "Rejected Successfully!";
            }
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }
 
    public  String employerDeleteRequest(Integer requestID, AllTypesEnums.UserRequestType userRequestType, String message){
        //update employerReq
        EmployerRequest employerRequestData = employerRequestRepository.findById(requestID).stream().findFirst().orElse(new EmployerRequest());
        UserProfile userProfile = userProfileRepository.findById(employerRequestData.getProfId()).stream().findFirst().orElseThrow();
        if(userRequestType== AllTypesEnums.UserRequestType.DELETE_ACCEPTED) {
            employerRequestData.setRequestType(AllTypesEnums.UserRequestType.DELETE_ACCEPTED);
            employerRequestRepository.save(employerRequestData);
            //update the userprofile
            DeleteUserDetails(employerRequestData.getProfId());
            String subject = "QuickHire: Account Deletion Confirmation";
            String body = "Dear Customer,\n\n" +
                    "Thank you for being a valued customer of QuickHire.\n" +
                    "Your account has been successfully deleted.\n" +
                    "We hope to see you join again soon!\n\n" +
                    "Best regards,\n" +
                    "The QuickHire Team";
            emailService.sendMail(userProfile.getEmail(),subject,body);
            return "Account Deleted Successfully!";
        }else {
            String subject = "QuickHire: Account Deletion Rejection";
            String body = "<!DOCTYPE html><html><head><title>Account Deletion Rejection</title></head><body>" +
                    "<p>Dear Customer,</p>" +
                    "<p>We regret to inform you that your account deletion request has been rejected.</p>" +
                    "<p>"+ message+"</p>" + // Include your message here, ensure it is properly escaped if it contains HTML
                    "<p>Please review the provided information and resubmit your request.</p>" +
                    "<p>Best regards,<br>The QuickHire Team</p>" +
                    "</body></html>";
            employerRequestData.setRequestType(AllTypesEnums.UserRequestType.ACCOUNT_REJECTED);
            employerRequestRepository.save(employerRequestData);
            emailService.sendMail(userProfile.getEmail(),subject,body);
            return "Rejected Successfully!";

        }
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
                  professionalRequest1.setUserprofileid(userProfile.getUserprofileid());
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
                 employerRegistrationRequest.setUserprofileid(userProfile.getUserprofileid());
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

    public List<EmployerRegistrationRequest> getEmployerDetails(){
        try{
            //get all employer details
            List<EmployerDetails> employerDetails = employerDetailsRepository.findAll();
            List<EmployerRegistrationRequest> employerRegistrationRequests = new ArrayList<>();
            for(EmployerDetails employerDetail:employerDetails){
                //get userprofile
                UserProfile userProfile = userProfileRepository.findById(employerDetail.getProfId()).stream().findFirst().orElse(null);
                if(userProfile==null){
                    continue;
                }
                //get his payment details
                List<Payments> payments = paymentRepository.findAllByProfId(userProfile.getUserprofileid());
                EmployerRegistrationRequest employerRegistrationRequest = getEmployerRegistrationRequest(employerDetail, userProfile, payments);
                employerRegistrationRequests.add(employerRegistrationRequest);

            }
            return employerRegistrationRequests;
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<ProfessionalRegistrationRequest> getAllProfessionalDeleteData(){
        try{
            //need to get all delete requests
            List<ProfessionalRequest> professionalRequests = professionalRequestRepository.findByRequesttype(AllTypesEnums.UserRequestType.DELETE_REQUESTED);
            //now we need to get all his userdetails
            List<ProfessionalRegistrationRequest> professionalRegistrationRequests = new ArrayList<>();
            for(ProfessionalRequest professionalRequest:professionalRequests){
                UserProfile userProfile = userProfileRepository.findById(professionalRequest.getProfId()).stream().findFirst().orElse(null);
                if(userProfile==null){
                    continue;
                }
                //now get all his payment details
                List<Payments> payments = paymentRepository.findAllByProfId(userProfile.getUserprofileid());
                //now get all his qualifications
                List<Qualification> qualifications = qualificationRepository.findByProfid(userProfile.getUserprofileid());
                //now get all his educationdetails
                List<Education> educations = educationRepository.findByProfId(userProfile.getUserprofileid());
                ProfessionalRegistrationRequest professionalRegistrationRequest = new ProfessionalRegistrationRequest();
                professionalRegistrationRequest.setUsername(userProfile.getUsername());
                professionalRegistrationRequest.setFirstname(userProfile.getFirstname());
                professionalRegistrationRequest.setLastname(userProfile.getLastname());
                professionalRegistrationRequest.setEmail(userProfile.getEmail());
                professionalRegistrationRequest.setPhone(userProfile.getPhone());
                professionalRegistrationRequest.setAddress(userProfile.getAddress());
                professionalRegistrationRequest.setCity(userProfile.getCity());
                professionalRegistrationRequest.setPincode(userProfile.getPincode());
                professionalRegistrationRequest.setPrequestid(professionalRequest.getRequestId());
                professionalRegistrationRequest.setQualification(qualifications);
                professionalRegistrationRequest.setEducation(educations);
                professionalRegistrationRequest.setPaymentHistory(payments);
                professionalRegistrationRequest.setUserprofileid(userProfile.getUserprofileid());
                professionalRegistrationRequests.add(professionalRegistrationRequest);
            }
            return professionalRegistrationRequests;
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    public List<EmployerRegistrationRequest> getAllEmployerDeleteRequests(){
        try{
           //need to get all delete req
           List<EmployerRequest> employerRequests = employerRequestRepository.findByRequesttype(AllTypesEnums.UserRequestType.DELETE_REQUESTED);
           List<EmployerRegistrationRequest> employerRegistrationRequests = new ArrayList<>();
           for(EmployerRequest employerRequest:employerRequests){
               //userprofile
               UserProfile userProfile = userProfileRepository.findById(employerRequest.getProfId()).stream().findFirst().orElse(null);
               if(userProfile==null){
                   continue;
               }
               EmployerRegistrationRequest employerRegistrationRequest = getEmployerRegistrationRequest(employerRequest,userProfile);
               //get all payments details
               List<Payments> payments = paymentRepository.findAllByProfId(userProfile.getUserprofileid());
               employerRegistrationRequest.setPayments(payments);
               employerRegistrationRequests.add(employerRegistrationRequest);
           }
           return employerRegistrationRequests;
        }
        catch (Exception e){
            throw  new RuntimeException(e.getMessage());
        }
    }
    private static EmployerRegistrationRequest getEmployerRegistrationRequest(EmployerDetails employerDetail, UserProfile userProfile, List<Payments> payments) {
        EmployerRegistrationRequest employerRegistrationRequest = new EmployerRegistrationRequest();
        employerRegistrationRequest.setFirstname(userProfile.getFirstname());
        employerRegistrationRequest.setLastname(userProfile.getLastname());
        employerRegistrationRequest.setUsername(userProfile.getUsername());
        employerRegistrationRequest.setAddress(userProfile.getAddress());
        employerRegistrationRequest.setState(userProfile.getState());
        employerRegistrationRequest.setCity(userProfile.getCity());
        employerRegistrationRequest.setAddress(userProfile.getAddress());
        employerRegistrationRequest.setPincode(userProfile.getPincode());
        employerRegistrationRequest.setEmail(userProfile.getEmail());
        employerRegistrationRequest.setCompanyName(employerDetail.getCompanyName());
        employerRegistrationRequest.setPhone(userProfile.getPhone());
        employerRegistrationRequest.setUserprofileid(userProfile.getUserprofileid());
        employerRegistrationRequest.setPayments(payments);
        employerRegistrationRequest.setPrequestid(employerDetail.getEmployerId());
        return employerRegistrationRequest;
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
        employerRegistrationRequest.setUserprofileid(userProfile.getUserprofileid());
        employerRegistrationRequest.setPrequestid(employerRequest.getRequestId());
        return employerRegistrationRequest;
    }
}
