package com.example.quickhirebackend.customExceptions;

public class CustomDuplicateUsernameException extends RuntimeException {
    public CustomDuplicateUsernameException(String message) {
        super(message);
    }
}

