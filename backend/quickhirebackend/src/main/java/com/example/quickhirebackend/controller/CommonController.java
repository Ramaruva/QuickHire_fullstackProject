package com.example.quickhirebackend.controller;

import com.example.quickhirebackend.customExceptions.LoginException;
import com.example.quickhirebackend.dto.UserActiveInfo;
import com.example.quickhirebackend.model.UserProfile;
import com.example.quickhirebackend.services.LoginService;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommonController {

    private final LoginService loginService;

    public CommonController(LoginService loginService) {
        this.loginService = loginService;
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
}
