package com.example.quickhirebackend.customExceptions;

public class CustomMatchException extends RuntimeException{
    public CustomMatchException(String message, Throwable cause){
        super(message,cause);
    }
}
