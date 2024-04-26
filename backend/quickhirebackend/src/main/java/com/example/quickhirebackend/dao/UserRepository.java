package com.example.quickhirebackend.dao;
import com.example.quickhirebackend.dto.UserActiveInfo;
import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
 
import java.util.List;
import java.util.Optional;
 
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Define custom query methods if needed
    User findByPassword(String password);
 
   @Query("SELECT u.password FROM User u WHERE u.username = :username")
    String findPasswordByUsername(@Param("username") String username);
 
   @Query("SELECT new com.example.quickhirebackend.dto.UserActiveInfo("+"u.username,u.usertype,u.status,u.profid,u.ispasswordchanged)"+"FROM User u WHERE u.username = :username AND u.status = 'active'")
    Optional<UserActiveInfo> findActiveUserWithoutPassword(@Param("username") String username);
 
    Optional<User> findByUsername(String username);
 
   @Transactional
   @Modifying
   @Query("UPDATE User u SET u.password = :password WHERE u.username = :username")
   int updatePasswordByUsername(@Param("username") String username, @Param("password") String password);

   @Transactional
   @Modifying
   @Query("UPDATE User u SET u.ispasswordchanged = :ispasswordchanged WHERE u.username = :username")
   int udpateispasswordchanged(@Param("username") String username, @Param("ispasswordchanged") String ispasswordchanged);
 
    @Query("SELECT u.username as username, u.usertype as usertype, u.status as status, u.profid as profid, u.ispasswordchanged as ispasswordchanged " +
            "FROM User u WHERE u.usertype = 'STAFF' AND u.status = 'ACTIVE'")
    List<UserActiveInfo> findActiveStaffWithoutPassword();
 
    @Query("SELECT u.profid FROM User u WHERE u.usertype = :staffType AND u.status = :activeStatus")
    List<Integer> findActiveStaffProfIds(@Param("staffType") AllTypesEnums.UserType staffType,
                                         @Param("activeStatus") AllTypesEnums.UserStatus activeStatus);
}