package com.example.quickhirebackend.config;
import com.example.quickhirebackend.model.AllTypesEnums;
import com.example.quickhirebackend.services.LoginService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
 
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final LoginService loginService;
    private final JwtAuthenticationFilter authenticationFilter;
 
    public SecurityConfig(LoginService loginService, JwtAuthenticationFilter authenticationFilter) {
        this.loginService = loginService;
        this.authenticationFilter = authenticationFilter;
    }
 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req.requestMatchers("/login/**","/professionalRegister/**", "/employerRegister/**")
                                .permitAll()
                                .requestMatchers("/createStaff").hasAuthority(String.valueOf(AllTypesEnums.UserType.ROOT))
                                .requestMatchers("/getAllProfessionalRequests/**","/professionalRequestReview/**","/getAllEmployerRequests/**","/employerRequestReview/**").hasAuthority(String.valueOf(AllTypesEnums.UserType.STAFF))
                                .requestMatchers("/jobPosting/**","/jobDelete/**").hasAuthority(String.valueOf(AllTypesEnums.UserType.EMPLOYER))
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(loginService)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
 
    }
 
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
 
}
 