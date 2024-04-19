package com.example.quickhirebackend.customExceptions;

public class LoginException  extends  RuntimeException{
    public LoginException(String message){
        super(message);
    }
}
