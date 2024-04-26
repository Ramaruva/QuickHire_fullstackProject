package com.example.quickhirebackend.services;
import com.example.quickhirebackend.customExceptions.LoginException;
import com.example.quickhirebackend.dao.UserProfileRepository;
import com.example.quickhirebackend.dao.UserRepository;
import com.example.quickhirebackend.dto.UserActiveInfo;
import com.example.quickhirebackend.model.User;
import com.example.quickhirebackend.model.UserProfile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;
import java.util.stream.Stream;
@Service
public class LoginService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final JwtService jwtService;
    public LoginService(UserRepository userRepository, UserProfileRepository userProfileRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.jwtService = jwtService;
    }
    public String passwordHasher(String password) {
        String salt = BCrypt.gensalt(12);
        return BCrypt.hashpw(password, salt);
    }
    public boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
    public String userLogin(String username, String password) {
        boolean isValidLogin = checkPassword(password, userRepository.findPasswordByUsername(username));
        if (isValidLogin) {
            UserActiveInfo userActiveInfo= userRepository.findActiveUserWithoutPassword(username).stream().findFirst().orElse(null);
            if (userActiveInfo == null) {
                throw new LoginException("Your account has been deleted please contact admin team for further details!");
            }
            User user = new User();
            user.setUsername(userActiveInfo.username());
            user.setUserType(userActiveInfo.usertype());
            user.setProfId(userActiveInfo.profid());
            user.setIsPasswordChanged(userActiveInfo.ispasswordchanged());
            user.setStatus(userActiveInfo.status());
            String token = jwtService.generateToken(user);
            System.out.println(user+"am");
            UserProfile userDetails = userProfileRepository.findById(user.getProfId()).stream().findFirst().orElse(new UserProfile());
            return token;
        } else {
            throw new LoginException("Login Failed! Invalid Credentials.");
        }
    }
    public boolean changePassword(String username, String password) {
        int val = userRepository.updatePasswordByUsername(username, passwordHasher(password));
        if (val > 0) {
            userRepository.udpateispasswordchanged(username,"YES");
            return true;
        } else {
            return false;
        }
    }
    public String passwordGenerator() {
        // generate a string having 2 numbers, 2 special chars, 2 upper case letters, and 2 lower case letters
        Stream<Character> randomPasswordStream = Stream.concat(getRandomNumbers(2),
                Stream.concat(getRandomSpecialChars(2),
                        Stream.concat(getRandomAlphabets(2, true), getRandomAlphabets(2, false)
                        )));
        // create a list of Char that stores all the characters, numbers, and special characters
        List<Character> listOfchar = new java.util.ArrayList<>(randomPasswordStream.toList());
        Collections.shuffle(listOfchar);
        //generate a random string(secure password) by using list stream() method and collect() method
        return listOfchar.stream().
                collect(StringBuilder::new, StringBuilder::append, StringBuilder::append).toString();
    }
    public static Stream<Character> getRandomSpecialChars(int length) {
        Stream<Character> specialCharStream;
        // create instance of SecureRandom
        Random random = new SecureRandom();
        // use ints() method of random to get IntStream of special chars of the specified length
        IntStream specialChars = random.ints(length, 33, 45);
        specialCharStream = specialChars.mapToObj(data -> (char) data);
        // return stream to the main() method
        return specialCharStream;
    }
    public static Stream<Character> getRandomNumbers(int length) {
        Stream<Character> numberStream;
        // create instance of SecureRandom
        Random random = new SecureRandom();
        // use ints() method of random to get IntStream of number of the specified length
        IntStream numberIntStream = random.ints(length, 48, 57);
        numberStream = numberIntStream.mapToObj(data -> (char) data);
        // return number stream to main() method
        return numberStream;
    }
    // create getRandomAlphabets() method that returns either a stream of upper case chars or stream of lower case chars
    // of the specified length based on the boolean variable check
    public static Stream<Character> getRandomAlphabets(int length, boolean check) {
        Stream<Character> lowerUpperStream;
        // for lower case stream
        if (check) {
            // create instance of SecureRandom
            Random random = new SecureRandom();
            // use ints() method of random to get IntStream of lower case letters of the specified length
            IntStream lCaseStream = random.ints(length, 'a', 'z');
            lowerUpperStream = lCaseStream.mapToObj(data -> (char) data);
        }
        // for upper case stream
        else {
            // create instance of SecureRandom
            Random random = new SecureRandom();
            // use ints() method of random to get IntStream of upper case letters of the specified length
            IntStream uCaseStream = random.ints(length, 'A', 'Z');
            lowerUpperStream = uCaseStream.mapToObj(data -> (char) data);
        }
        // return lowerUpperStream to main() method
        return lowerUpperStream;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}

 