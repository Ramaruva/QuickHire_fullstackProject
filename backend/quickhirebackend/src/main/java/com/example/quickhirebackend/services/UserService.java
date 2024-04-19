package com.example.quickhirebackend.services;

import com.example.quickhirebackend.dao.UserRepository;
import com.example.quickhirebackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create or update a user
    public User saveUser(User user) {
       // Set the encoded password
        return userRepository.save(user);
    }

    // Find a user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findById(username);
    }

    // Get all users
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Update user details (excluding password)
    public User updateUserDetails(String username, User userDetails) {
        return userRepository.findById(username)
                .map(existingUser -> {
                    existingUser.setUserType(userDetails.getUserType());
                    existingUser.setStatus(userDetails.getStatus());
                    existingUser.setProfId(userDetails.getProfId());
                    existingUser.setIsPasswordChanged(userDetails.getIsPasswordChanged());
                    return userRepository.save(existingUser);
                }).orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    // Delete a user
    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }

    public  User findbyUserByPassword(String password){
        return  userRepository.findByPassword(password);
    }

    // Additional methods can be added as needed
}

