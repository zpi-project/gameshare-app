package com.zpi.backend.user_opinion;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.role.NewUserOpinionDTO;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserOpinionService {

    UserOpinionRepository userOpinionRepository;
    UserService userService;
    public ResultsDTO<UserOpinion> getMineOpinions(Authentication authentication, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        Pageable pageable = PageRequest.of(page, size);
        Page<UserOpinion> userOpinionPage;
        userOpinionPage = userOpinionRepository.getUserOpinionsByRatedUser(user, pageable);
        return new ResultsDTO<>(userOpinionPage.stream().toList(), new Pagination(userOpinionPage.getTotalElements(), userOpinionPage.getTotalPages()));
    }


    public UserOpinion addOpinion(Authentication authentication, NewUserOpinionDTO newUserOpinionDTO) throws BadRequestException, UserDoesNotExistException {
        newUserOpinionDTO.validate();
        User user = userService.getUser(authentication);
        User ratedUser = userService.getUserByUUID(newUserOpinionDTO.getRatedUserUUID());
        UserOpinion userOpinion = newUserOpinionDTO.toUserOpinion(user, ratedUser);
        return userOpinionRepository.save(userOpinion);
    }
}
