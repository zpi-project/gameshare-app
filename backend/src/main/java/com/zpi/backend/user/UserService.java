package com.zpi.backend.user;

import com.zpi.backend.email.EmailService;
import com.zpi.backend.category.Category;
import com.zpi.backend.category.CategoryRepository;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailType;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstanceSearch;
import com.zpi.backend.role.RoleRepository;
import com.zpi.backend.user.dto.UpdateUserDTO;
import com.zpi.backend.user.dto.UserDTO;
import com.zpi.backend.user.dto.UserGuestDTO;
import com.zpi.backend.user.exception.UserAlreadyExistsException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.validators.AdminChecker;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Optional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private  UserRepository userRepository;
    private final RoleRepository roleRepository;
    private AdminChecker adminChecker;
    private EmailService emailService;
    private final CategoryRepository categoryRepository;

    private boolean checkIfUserExists(String googleId) {
        User user = this.userRepository.findByGoogleId(googleId).orElse(null);
        return user != null;
    }

    public User getUser(Authentication authentication) throws UserDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        return this.userRepository.findByGoogleId(googleId).orElseThrow(()->new UserDoesNotExistException("User not found"));
    }

    public User getUserByUUID(String uuid) throws UserDoesNotExistException {
        return this.userRepository.findByUuid(uuid).orElseThrow(()->new UserDoesNotExistException("User not found"));
    }

    public UserGuestDTO getUserByUUID(Authentication authentication, String uuid) throws UserDoesNotExistException {
        User user = getUserByUUID(uuid);
        if (authentication == null || !authentication.isAuthenticated())
            return new UserGuestDTO(user);
        else
            return new UserDTO(user);

    }


    public void updateUser(Authentication authentication,UpdateUserDTO updateUserDTO) throws UserDoesNotExistException, BadRequestException {
        updateUserDTO.validate();
        User user = getUser(authentication);
        user.update(updateUserDTO);
        this.userRepository.save(user);
    }

    public void registerUser(UpdateUserDTO updateUserDTO, Authentication authentication, Optional<String> languageOpt) throws UserAlreadyExistsException, IOException {
        User user = (User) authentication.getPrincipal();
        if(!checkIfUserExists(user.getGoogleId())) {
            user.update(updateUserDTO);
            if(adminChecker.isAdmin(user.getEmail()))
                user.setRole(roleRepository.getRoleByName("admin"));
            else
                user.setRole(roleRepository.getRoleByName("user"));
            userRepository.save(user);

//            Sending e-mail
            String language = languageOpt.orElse(null);
            Context registrationContext = emailService.getRegistrationEmailContext(language);
                emailService.sendEmailWithHtmlTemplate(user, "GameShare - Registration",
                        EmailService.EMAIL_TEMPLATE, registrationContext, EmailType.REGISTRATION);
        }
        else {
            throw new UserAlreadyExistsException("User already exists");
        }
    }
    public void updateAvgRating(long userId){
        userRepository.updateAvgRating(userId);
    }

    public ResultsDTO<UserGuestDTO> getUsersSearch(int size, int page, Optional<String> searchName, Optional<Long> categoryId, Optional<Integer> age,
                                                              Optional<Integer> playersNumber, Optional<Integer> maxPricePerDay, Optional<String> userUUID, double latitude,
                                                              double longitude) throws CategoryDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        Category category = null;
        if (categoryId.isPresent())
            category = categoryRepository.getReferenceById(categoryId.get());
        GameInstanceSearch gameInstanceSearch = new GameInstanceSearch(
                searchName.orElse(null), category,
                age.orElse(null), playersNumber.orElse(null),
                maxPricePerDay.orElse(null), userUUID.orElse(null), latitude, longitude
        );
        Specification<User> spec = new UserSpecification(gameInstanceSearch);
        Page<User> usersPage = userRepository.findAll(spec, pageable);
        List<UserGuestDTO> resultList = new ArrayList<>();
        usersPage
                .forEach(user -> {
                    resultList.add(new UserGuestDTO(user));
                });
        return new ResultsDTO<>(resultList,
                new Pagination(usersPage.getTotalElements(), usersPage.getTotalPages()));
    }

}
