package com.example.quickhirebackend.controller;

import com.example.quickhirebackend.customExceptions.LoginException;
import com.example.quickhirebackend.dto.PaymentDTO;
import com.example.quickhirebackend.services.LoginService;
import com.example.quickhirebackend.services.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommonController {

    private final LoginService loginService;
    private final PaymentService paymentService;

    public CommonController(LoginService loginService, PaymentService paymentService) {
        this.loginService = loginService;
        this.paymentService = paymentService;
    }
    record LoginData(String username, String password){}
    @PostMapping("/login")
    public ResponseEntity<?> loginOperation(@RequestBody LoginData loginData){
        try{
            //Pair<UserActiveInfo, UserProfile> data = loginService.userLogin(loginData.username(),loginData.password());
            record LoginResponse(String token){};
            String token = loginService.userLogin(loginData.username(),loginData.password());
            return new ResponseEntity<>(new LoginResponse(token),HttpStatus.OK);
        }
        catch (LoginException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_GATEWAY);
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePasswordOperation(@RequestBody LoginData loginData){
       try{
           return new ResponseEntity<>(loginService.changePassword(loginData.username(),loginData.password()),HttpStatus.OK);
       }
       catch (Exception e){
           return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    record paymentDataRecord(Integer profid, Integer amount, Date startdate, Date enddate, String status){}
    @PostMapping("/payments")
    public ResponseEntity<?> paymentMethod(@RequestBody paymentDataRecord payment){
        try{
            PaymentDTO paymentDto = new PaymentDTO();
            paymentDto.setProfId(payment.profid());
            paymentDto.setAmount(Double.valueOf(payment.amount()));
            paymentDto.setStartDate(payment.startdate());
            paymentDto.setEndDate(payment.enddate());
            paymentDto.setStatus(payment.status());
           boolean result = paymentService.makePayment(paymentDto);
           return  ResponseEntity.ok(result);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    record paymentPaidRecord(Integer matchId){}
    @PostMapping("/changePayments")
    public ResponseEntity<?>  changePayment(@RequestBody paymentPaidRecord paydata){
        try{
           return ResponseEntity.ok(paymentService.changePayment(paydata.matchId()));
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllPayments/{id}")
    public ResponseEntity<?> getAllPayments(@PathVariable("id") Integer id){
        try{
              return ResponseEntity.ok(paymentService.getAllPaymentofProfId(id));
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
