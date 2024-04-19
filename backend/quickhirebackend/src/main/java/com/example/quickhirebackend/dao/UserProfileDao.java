package com.example.quickhirebackend.dao;

import com.example.quickhirebackend.customExceptions.CustomDuplicateUsernameException;
import com.example.quickhirebackend.model.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserProfileDao {
    @Autowired
    private  UserProfileRepository userProfileRepository;

    public UserProfile CreateUser(UserProfile user){
        try{
            return  userProfileRepository.save(user);
        }
        catch (DataIntegrityViolationException e){
            throw new CustomDuplicateUsernameException("Username Already Existed!");
        }

    }

    public List<UserProfile> getAllUsers() {
        return userProfileRepository.findAll();
    }

    public Optional<UserProfile> getUserById(Integer id) {
        return userProfileRepository.findById(id);
    }

    public UserProfile updateUser(UserProfile user) {
        return userProfileRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userProfileRepository.deleteById(id);
    }
}
