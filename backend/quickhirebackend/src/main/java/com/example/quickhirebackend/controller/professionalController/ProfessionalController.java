package com.example.quickhirebackend.controller.professionalController;

import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.customExceptions.CustomMatchException;
import com.example.quickhirebackend.dto.JobMatchRequestRecord;
import com.example.quickhirebackend.dto.PaymentDTO;
import com.example.quickhirebackend.dto.ProfessionalRegistrationRequest;
import com.example.quickhirebackend.model.Payments;
import com.example.quickhirebackend.services.JobService;
import com.example.quickhirebackend.services.MatchService;
import com.example.quickhirebackend.services.PaymentService;
import com.example.quickhirebackend.services.ProfessionalRegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProfessionalController {

     private  final ProfessionalRegisterService professionalRegisterService;
     private  final MatchService matchService;
     private  final PaymentService paymentService;
     private final JobService jobService;

    public ProfessionalController(ProfessionalRegisterService professionalRegisterService, MatchService matchService, PaymentService paymentService, JobService jobService) {
        this.professionalRegisterService = professionalRegisterService;
        this.matchService = matchService;
        this.paymentService = paymentService;
        this.jobService = jobService;
    }

    @PostMapping("/professionalRegister")
    public ResponseEntity<?> professionalRegister(@RequestBody ProfessionalRegistrationRequest registrationData){
        try{
            int profReqId = professionalRegisterService.newProfessionalRegister(registrationData);
            return new ResponseEntity<>("Registration is successfully done! and request id is "+profReqId, HttpStatus.OK);
        }
        catch (CustomDuplicateUsernameException e){
            return  new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Employer register"+e.getMessage());
        }
    }

    @PostMapping("/professionalJobMatchRequest")
    public  ResponseEntity<?> professionalJobMatch(@RequestBody JobMatchRequestRecord jobMatchData){
        try{
            boolean jobMatch = matchService.professionalJobRequest(jobMatchData);
            return new ResponseEntity<>(jobMatch,HttpStatus.OK);
        } catch(CustomMatchException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Match Register"+e.getMessage());
        }
    }

    record EditResponse(boolean isEdited, String message){}
    @PutMapping("/professional/editAccount")
    public ResponseEntity<?> professionalAccountEdit(@RequestBody ProfessionalRegistrationRequest professionalEditData){
        try{
           String ans = professionalRegisterService.professionalEdit(professionalEditData);
            EditResponse editData = new EditResponse(true,ans);
            return  ResponseEntity.ok(editData);
        }
        catch (CustomDuplicateUsernameException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( new EditResponse(false,e.getMessage()));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Posting job"+e.getMessage());
        }
    }

    record DeleteRecord(Integer userProfileID){}
    @PutMapping("/professional/DeleteRequest")
    public ResponseEntity<?> professionalDeleteRequest(@RequestBody DeleteRecord deleteData){
       try{
           return ResponseEntity.ok(professionalRegisterService.professionalDeleteDetails(deleteData.userProfileID()));
       }
       catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
    }

    @GetMapping("/getJobs")
    public ResponseEntity<?> getAllJobs(){
        try {
            return  ResponseEntity.ok(jobService.getAllJobs());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getUserData/{id}")
    public ResponseEntity<?> getUserData(@PathVariable("id") Integer id){
        try{
            ProfessionalRegistrationRequest professionalRegistrationRequest = professionalRegisterService.getProfessionalData(id);
            return ResponseEntity.ok(professionalRegistrationRequest);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getMatchedJobs/{id}")
    public ResponseEntity<?> getAllJobs(@PathVariable("id") Integer profileId){
        try{
                 return ResponseEntity.ok(matchService.getAllMatchedJobs(profileId));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
