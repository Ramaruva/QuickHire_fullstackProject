package com.example.quickhirebackend.controller.professionalController;

import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.customExceptions.CustomMatchException;
import com.example.quickhirebackend.dto.JobMatchRequestRecord;
import com.example.quickhirebackend.dto.PaymentDTO;
import com.example.quickhirebackend.dto.ProfessionalRegistrationRequest;
import com.example.quickhirebackend.model.Payments;
import com.example.quickhirebackend.services.MatchService;
import com.example.quickhirebackend.services.PaymentService;
import com.example.quickhirebackend.services.ProfessionalRegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfessionalController {

     private  final ProfessionalRegisterService professionalRegisterService;
     private  final MatchService matchService;
     private  final PaymentService paymentService;

    public ProfessionalController(ProfessionalRegisterService professionalRegisterService, MatchService matchService, PaymentService paymentService) {
        this.professionalRegisterService = professionalRegisterService;
        this.matchService = matchService;
        this.paymentService = paymentService;
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
            JobMatchRequestRecord jobMatch = matchService.professionalJobMatch(jobMatchData);
            return new ResponseEntity<>(jobMatch,HttpStatus.OK);
        } catch(CustomMatchException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Match Register"+e.getMessage());
        }
    }

    record PaymentReturnDataRecord(Double intialBalance, Double updatedBalance, Payments paymentsDetails){}
    @PostMapping("/professional/payment")
    public ResponseEntity<?> employPayment(@RequestBody PaymentDTO paymentDTO){
        try{
            Double intialAmount = paymentService.balanceChecker(paymentDTO.getProfId());
            Payments payments = new Payments();
            payments.setProfId(paymentDTO.getProfId());
            payments.setAmount(paymentDTO.getAmount());
            payments.setStartDate(paymentDTO.getStartDate());
            payments.setEndDate(paymentDTO.getEndDate());
            Payments payedDetails= paymentService.createPayment(payments);
            Double updatedAmount = paymentService.balanceChecker(paymentDTO.getProfId());

            PaymentReturnDataRecord paymentReturnData = new PaymentReturnDataRecord(intialAmount,updatedAmount,payedDetails);

            return new ResponseEntity<>(paymentReturnData,HttpStatus.CREATED);

        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred while Posting job"+e.getMessage());
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
}
