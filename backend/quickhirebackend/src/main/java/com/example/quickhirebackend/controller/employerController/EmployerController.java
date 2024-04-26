package com.example.quickhirebackend.controller.employerController;

import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.dto.*;
import com.example.quickhirebackend.model.Payments;
import com.example.quickhirebackend.model.UserProfile;
import com.example.quickhirebackend.services.EmployerRegisterService;
import com.example.quickhirebackend.services.JobService;
import com.example.quickhirebackend.services.MatchService;
import com.example.quickhirebackend.services.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmployerController {

    private final EmployerRegisterService employerRegisterService;
    private  final JobService jobService;
    private final PaymentService paymentService;
    private final MatchService matchService;

    public EmployerController(EmployerRegisterService employerRegisterService, JobService jobService, PaymentService paymentService, MatchService matchService) {
        this.employerRegisterService = employerRegisterService;
        this.jobService = jobService;
        this.paymentService = paymentService;
        this.matchService = matchService;
    }

    @PostMapping("/employerRegister")
    public ResponseEntity<?> employerRegister(@RequestBody EmployerRegistrationRequest employerRegistrationRequest){
        try{
            int profileID = employerRegisterService.newRegistration(employerRegistrationRequest);
            return new ResponseEntity<>("Registration is successfully done! and request id is "+profileID, HttpStatus.OK);
        }
        catch (CustomDuplicateUsernameException e){
            return  new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Employer register"+e.getMessage());
        }
    }

    @PostMapping("/jobPosting")
    public  ResponseEntity<?> jobCreation(@RequestBody JobPostRequest jobData){
        try{
            int jobid = jobService.newJobPost(jobData);
            return new ResponseEntity<>("Job has been saved successfully! "+jobid, HttpStatus.OK);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Posting job"+e.getMessage());
        }
    }

    @PostMapping("/editJob")
    public ResponseEntity<?> jobEdit(@RequestBody JobPostRequest editData){
        try{
            boolean val = jobService.editJob(editData);
            return ResponseEntity.ok(val);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Posting job"+e.getMessage());
        }
    }




    record Response(boolean isEdited, String msg){};
    @PutMapping("/employer/editAccount")
    public ResponseEntity<?> employEditAccount(@RequestBody EmployerRegistrationRequest employEditData){
        try{
             return ResponseEntity.status(HttpStatus.OK).body(new Response(true,employerRegisterService.employerEditMethod(employEditData)));
        }
        catch (CustomDuplicateUsernameException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response(false,e.getMessage()));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response(false,e.getMessage()));
        }

    }
    record  DeleteRequestRecord(Integer userProfileId){};
    @PutMapping("/employer/deleteRequest")
    public ResponseEntity<?> deleteRequest(@RequestBody DeleteRequestRecord deleteRequestData){
        try{
            String msg = employerRegisterService.DeleteRequest(deleteRequestData.userProfileId());
            return ResponseEntity.status(HttpStatus.OK).body(msg);
        }
        catch (CustomDuplicateUsernameException e){
            return  ResponseEntity.status(HttpStatus.OK).body(e.getMessage());
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    record DeleteJobRecord(Integer jobDescId){};
    @PostMapping("/jobDelete")
    public ResponseEntity<?> deleteJob(@RequestBody DeleteJobRecord deleteJobData){
        try{
           Integer id = jobService.deleteEntireJob(deleteJobData.jobDescId());
           return ResponseEntity.ok(id);
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



    @GetMapping("/getAllJobsForAEmployer/{userProfileId}")
    public ResponseEntity<?> getAllJobsForAEmployer(@PathVariable("userProfileId") Integer userProfileId){
        try{
           return ResponseEntity.ok(jobService.employerSpecificJobs(userProfileId));
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

  @GetMapping("/getEmployDetails/{id}")
    public  ResponseEntity<?> getEmployDetail(@PathVariable("id") Integer id){
        try{
            UserProfile userProfile = employerRegisterService.getEmployDetail(id);
            return ResponseEntity.ok(userProfile);
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
   }

   @GetMapping("/getEmployerJobMatches/{jobId}")
    public ResponseEntity<?> getEmployersMatches(@PathVariable("jobId") Integer jobId){
        try{
            List<EmployerMatchResponse> matchResponses = matchService.getMatchedJobsForEmployer(jobId);
            return ResponseEntity.ok(matchResponses);
        }
        catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
   }

}
