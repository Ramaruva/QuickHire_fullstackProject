package com.example.quickhirebackend.services;

import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.dao.*;
import com.example.quickhirebackend.dto.EducationRecord;
import com.example.quickhirebackend.dto.ProfessionalRegistrationRequest;
import com.example.quickhirebackend.dto.QualificationRecord;
import com.example.quickhirebackend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionalRegisterService {

    private  final UserProfileRepository userProfileRepository;
    private  final QualificationRepository qualificationRepository;
    private  final ProfessionalRequestRepository professionalRequestRepository;
    private  final ProfessionalDetailsRepository professionalDetailsRepository;
    private  final EducationRepository educationRepository;

    public ProfessionalRegisterService(UserProfileRepository userProfileRepository, QualificationRepository qualificationRepository, ProfessionalRequestRepository professionalRequestRepository, ProfessionalDetailsRepository professionalDetailsRepository, EducationRepository educationRepository) {
        this.userProfileRepository = userProfileRepository;
        this.qualificationRepository = qualificationRepository;
        this.professionalRequestRepository = professionalRequestRepository;
        this.professionalDetailsRepository = professionalDetailsRepository;
        this.educationRepository = educationRepository;
    }

    public int newProfessionalRegister(ProfessionalRegistrationRequest registrationRequest) throws Exception {
       try{
           // first need to create an userprofile
           UserProfile professionalUserProfile = new UserProfile();
           professionalUserProfile.setAddress(registrationRequest.getAddress());
           professionalUserProfile.setFirstname(registrationRequest.getFirstname());
           professionalUserProfile.setLastname(registrationRequest.getLastname());
           professionalUserProfile.setEmail(registrationRequest.getEmail());
           professionalUserProfile.setPhone(registrationRequest.getPhone());
           professionalUserProfile.setCity(registrationRequest.getCity());
           professionalUserProfile.setState(registrationRequest.getState());
           professionalUserProfile.setPincode(registrationRequest.getPincode());
           professionalUserProfile.setUsername(registrationRequest.getUsername());
           System.out.println(registrationRequest);
            UserProfile savedUserProfile = userProfileRepository.save(professionalUserProfile);

           //create qualification table
           for(QualificationRecord qualificationRecord:registrationRequest.getQualifications()){
               Qualification qualification = new Qualification();
               qualification.setType(qualificationRecord.type());
               qualification.setKeywords(qualificationRecord.keywords());
               qualification.setProfId(savedUserProfile.getUserprofileid());
               qualificationRepository.save(qualification);
           }

           //creating the education table
           for(EducationRecord educationRecord: registrationRequest.getEducationList()){
               Education education = new Education();
               education.setCompletionTime(educationRecord.completiontime());
               education.setSchoolName(educationRecord.schoolname());
               education.setMajor(educationRecord.major());
               education.setProfId(savedUserProfile.getUserprofileid());
                educationRepository.save(education);
           }
           //creating professional request
           ProfessionalRequest professionalRequest = new ProfessionalRequest();
           professionalRequest.setRequestType(registrationRequest.getRequestType());
           professionalRequest.setMajor(registrationRequest.getMajor());
           professionalRequest.setSchoolName(registrationRequest.getSchoolName());
           professionalRequest.setProfId(savedUserProfile.getUserprofileid());
           professionalRequest.setCompletionTime(registrationRequest.getCompletiontime());

           return  professionalRequestRepository.save(professionalRequest).getRequestId();

       }
       catch (DataIntegrityViolationException e){
           throw  new CustomDuplicateUsernameException("Hey Professional This Username is already taken!");
       }
       catch (Exception e){
           throw  new Exception(e.getMessage());
       }
    }

    public String professionalEdit(ProfessionalRegistrationRequest professionalEditData){
        if(professionalEditData.getUsername()!=null){
            throw new CustomDuplicateUsernameException("Cannot modified Username!");
        }
        //first we will modify the userprofile
        UserProfile userProfile = userProfileRepository.findById(professionalEditData.getUserprofileid()).stream().findFirst().orElse(new UserProfile());
        userProfile.setFirstname(professionalEditData.getFirstname());
        userProfile.setLastname(professionalEditData.getLastname());
        userProfile.setEmail(professionalEditData.getEmail());
        userProfile.setPhone(professionalEditData.getPhone());
        userProfile.setAddress(professionalEditData.getAddress());
        userProfile.setCity(professionalEditData.getCity());
        userProfile.setState(professionalEditData.getState());
        userProfile.setPincode(professionalEditData.getPincode());
        userProfileRepository.save(userProfile);

        //now we need to modify the professional details



        for(QualificationRecord q:professionalEditData.getQualifications()){
             Qualification qualification = new Qualification();
             if(q.qualificationId()!=null){
                 qualification.setQualificationId(q.qualificationId());
             }
             qualification.setType(q.type());
             qualification.setKeywords(q.keywords());
             qualification.setProfId(userProfile.getUserprofileid());
             if(q.delete()){
                 qualificationRepository.delete(qualification);
             }else {
                 qualificationRepository.save(qualification);
             }
        }
        //modify of education details
        for(EducationRecord educationRecord: professionalEditData.getEducationList()){
            Education education = new Education();
            if(educationRecord.education_id()!=null){
                education.setEducationId(educationRecord.education_id());
            }
            education.setMajor(educationRecord.major());
            education.setCompletionTime(educationRecord.completiontime());
            education.setSchoolName(educationRecord.schoolname());
            education.setProfId(userProfile.getUserprofileid());
            if(educationRecord.delete()){
                educationRepository.delete(education);
            }
            else {
                educationRepository.save(education);
            }
        }
       return "Your Account Details have been modified successfully!";
    }

    public String professionalDeleteDetails(Integer profId){
        ProfessionalRequest professionalRequestData = professionalRequestRepository.findByProfid(profId).stream().findFirst().orElse(null);
        if(professionalRequestData==null){
            throw  new NullPointerException();
        }
        professionalRequestData.setRequestType(AllTypesEnums.UserRequestType.DELETE_REQUESTED);
        professionalRequestRepository.save(professionalRequestData);
        return "Delete Requested successfully!";
    }

    public ProfessionalRegistrationRequest getProfessionalData(Integer id) {
        //get userprofile
        UserProfile userProfile = userProfileRepository.findById(id).stream().findFirst().orElseThrow();
        //now get his education details
        List<Education> educations = educationRepository.findByProfId(id);
        //now get his qualifications
        List<Qualification> qualifications = qualificationRepository.findByProfid(id);

        return getProfessionalRegistrationRequest(userProfile, educations, qualifications);
    }

    private static ProfessionalRegistrationRequest getProfessionalRegistrationRequest(UserProfile userProfile, List<Education> educations, List<Qualification> qualifications) {
        ProfessionalRegistrationRequest professionalRegistrationRequest = new ProfessionalRegistrationRequest();
        professionalRegistrationRequest.setFirstname(userProfile.getFirstname());
        professionalRegistrationRequest.setLastname(userProfile.getLastname());
        professionalRegistrationRequest.setEducation(educations);
        professionalRegistrationRequest.setQualification(qualifications);
        professionalRegistrationRequest.setEmail(userProfile.getEmail());
        professionalRegistrationRequest.setCity(userProfile.getCity());
        professionalRegistrationRequest.setState(userProfile.getState());
        professionalRegistrationRequest.setPincode(userProfile.getPincode());
        professionalRegistrationRequest.setPhone(userProfile.getPhone());
        professionalRegistrationRequest.setAddress(userProfile.getAddress());
        professionalRegistrationRequest.setUserprofileid(userProfile.getUserprofileid());
        return professionalRegistrationRequest;
    }
}
