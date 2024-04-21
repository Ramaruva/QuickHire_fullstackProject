package com.example.quickhirebackend.services;
import com.example.quickhirebackend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
 
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
 
@Service
public class JwtService {
 
    private static final  String SECRET_KEY="02b8721e0cdc9f75fdc5a4fdb9e949e7128c719bd88880ac20650cd60ad502d0";
 
    private  Claims extractAllClaims(String token){
         try{
             Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
             return  claimsJws.getBody();
         }catch (JwtException e){
             System.out.println(e.getMessage());
             return null;
         }
    }
 
    public <T> T extractClaim(String token, Function<Claims,T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }
 
    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject);
    }
 
    public boolean isValid(String token, UserDetails user){
        String username = extractUsername(token);
        return  username.equals(user.getUsername()) && !isTokenExpired(token);
    }
 
    private  boolean isTokenExpired(String token){
         return extractExpiration(token).before(new Date());
    }
 
    private  Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }
    public String generateToken(User user){
          Map<String,Object> claims = new HashMap<>();
          claims.put("userType",user.getUserType());
          claims.put("profileID",user.getProfId());
          claims.put("isPasswordChanged",user.getIsPasswordChanged());
        return Jwts.builder().setClaims(claims).setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+24*60*60*1000))
                .signWith(getSigningKey())
                .compact();
    }
 
    private SecretKey getSigningKey(){
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return  Keys.hmacShaKeyFor(keyBytes);
    }
}
 