package com.example.quickhirebackend.controller.staffContoller;
import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.dto.*;
import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.services.MatchService;
import com.example.quickhirebackend.services.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StaffController {
    private final RequestService requestService;
    private final MatchService matchService;
 
    public StaffController(RequestService requestService, MatchService matchService) {
        this.requestService = requestService;
        this.matchService = matchService;
    }
 
    @PostMapping("/employerRequestReview")
    public ResponseEntity<?> employerRequestReview(@RequestBody ReviewRecord employerRequest){
    try{
        String employerReviewMessage = requestService.employerRequest(employerRequest);
        return new ResponseEntity<>(employerReviewMessage, HttpStatus.OK);
    }
    catch (Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Accepting Employer Review Request"+e.getMessage());
    }
    }
 
    @PostMapping("/professionalRequestReview")
    public ResponseEntity<?> professionalRequestReview(@RequestBody ReviewRecord professionalRequest){
    try{
        String professionalReviewMessage = requestService.professionalRequest(professionalRequest);
        return new ResponseEntity<>(professionalReviewMessage, HttpStatus.OK);
    }catch (Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Accepting Professional Review Request"+e.getMessage());
    }
 
    }
 
    record DeleteRequestID(Integer requestId, AllTypesEnums.UserRequestType requestType, String message){};
    @PutMapping("/professionalDeleteOperation")
    public ResponseEntity<?> professionalDeleteRequest(@RequestBody DeleteRequestID deleteID){
        try{
           return ResponseEntity.ok(requestService.professionalDeleteRequest(deleteID.requestId(),deleteID.requestType(),deleteID.message()));
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
 
    @PutMapping("/employerDeleteOperation")
    public ResponseEntity<?> employerDeleteRequest(@RequestBody DeleteRequestID deleteId){
        try{
            return ResponseEntity.ok(requestService.employerDeleteRequest(deleteId.requestId(),deleteId.requestType(),deleteId.message()));
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
 
 
    @PostMapping("/staffJobMatch")
    public ResponseEntity<?> staffJobMatch(@RequestBody JobMatchRequestRecord jobMatchRequestRecord){
       try{
           JobMatchRequestRecord jobMatchResponse = matchService.professionalJobMatch(jobMatchRequestRecord);
           return  ResponseEntity.ok(jobMatchResponse);
       } catch (Exception e) {
           return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
    }
 
    @PostMapping("/createStaff")
    public  ResponseEntity<?>  staffAccountCreation(@RequestBody StaffAccountCreationDTO staffAccountDetails){
        try{
            String msg = requestService.staffAccountCreation(staffAccountDetails);
            return  ResponseEntity.ok(msg);
        }
        catch (CustomDuplicateUsernameException e){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
 
    @GetMapping("/getAllStaffAccounts")
    public  ResponseEntity<?> getAllStaffAccounts(){
        try{
            return ResponseEntity.ok(requestService.allStaffAccounts());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getAllProfessionalRequests")
    public ResponseEntity<?> getAllProfessionalRequests(){
        try{
            List<ProfessionalRegistrationRequest> professionalRegistrationRequests = requestService.getProfessionalRequests();
            return  ResponseEntity.ok(professionalRegistrationRequests);
        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getAllEmployerRequests")
    public ResponseEntity<?> getAllEmployerRequests(){
        try{
           List<EmployerRegistrationRequest> employerRegistrationRequests = requestService.getEmployerRequests();
           return ResponseEntity.ok(employerRegistrationRequests);
        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getAllMatchRequets")
    public ResponseEntity<?> getAllMatches(){
        try{
            List<MatchResponse> matchResponses = matchService.getAllJobMatch();
          return ResponseEntity.ok(matchResponses);
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    record matchRequestResponse(Integer profid,Integer matchId, AllTypesEnums.MatchType status){

    }
    @PostMapping("/matchStatus")
    public ResponseEntity<?> matchStatus(@RequestBody matchRequestResponse matchData){
        try{
            String ans=  matchService.matchMechanism(matchData.profid(),matchData.matchId(),matchData.status());
            return ResponseEntity.ok(ans);
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/getProfessional")
    public  ResponseEntity<?> getProfessional(){
        try{
            return ResponseEntity.ok(requestService.getAllProfessionalDetails());
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/getEmployers")
    public ResponseEntity<?> geEmployers(){
        try{
            return ResponseEntity.ok(requestService.getEmployerDetails());
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getAllProfessionalDeleteRequests")
    public ResponseEntity<?> getAllProfessionalRequestDelete(){
        try{
            return ResponseEntity.ok(requestService.getAllProfessionalDeleteData());
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
        @GetMapping("/getAllEmployerDeleteRequests")
    public ResponseEntity<?> getAllEmployerDeleteRequests(){
      try{
         return ResponseEntity.ok(requestService.getAllEmployerDeleteRequests());
      }
      catch (Exception e){
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
      }
    }
    @GetMapping("/initateProfessionalMatches/{userProfileId}")
    public ResponseEntity<?> initiateProfessionalMatch(@PathVariable("userProfileId") Integer userprofileId){
        try{
            return ResponseEntity.ok(matchService.staffProfessionalJobMatch(userprofileId));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    record jobMatchRecord(Integer customerId , Integer jobId){}
    @PostMapping("/singleJobMatchPercentage")
    public ResponseEntity<?> singleJobPercentage(@RequestBody jobMatchRecord matchData){
        try{
             return  ResponseEntity.ok(matchService.getJobMatchPercentageForSingleJob(matchData.customerId(), matchData.jobId()));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    record staffJobMatchNotification(Integer customerId,Integer jobId, double percentage, Integer staffId){}
    @PostMapping("/staffJobMatchNotification")
    public ResponseEntity<?> JobMatchNotificationOperation(@RequestBody staffJobMatchNotification matchData){
        try{
             boolean res = matchService.staffJobMatchAcceptance(matchData.customerId(), matchData.jobId(), matchData.percentage(), matchData.staffId());
             return ResponseEntity.ok(res);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
 