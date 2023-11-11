package com.zpi.backend.utils;

import com.zpi.backend.role.RoleRepository;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserRepository;
import com.zpi.backend.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${ADMIN_GOOGLE_ID}")
    private String adminGoogleId;

    @Value("${ADMIN_AVATAR_LINK}")
    private String adminAvatarLink;

    @Value("${ADMIN_FIRST_NAME}")
    private String adminFirstName;

    @Value("${ADMIN_LAST_NAME}")
    private String adminLastName;

    @Value("${ADMIN_PHONE_NUMBER}")
    private String adminPhoneNumber;

    UserService userService;
    RoleRepository roleRepository;
    UserRepository userRepository;



    public AdminInitializer(UserRepository userRepository, UserService userService, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        try {
            User admin = userService.getUserByGoogleId(adminGoogleId);
            admin.setRole(roleRepository.getRoleByName("admin"));
            userRepository.save(admin);
        } catch (UserDoesNotExistException e){

            User newAdmin = new User(adminEmail, adminAvatarLink, adminGoogleId);
            newAdmin.setFirstName(adminFirstName);
            newAdmin.setLastName(adminLastName);
            newAdmin.setPhoneNumber(adminPhoneNumber);
            newAdmin.setRole(roleRepository.getRoleByName("admin"));
            userRepository.save(newAdmin);
        }
    }
}