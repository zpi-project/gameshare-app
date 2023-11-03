package com.zpi.backend.user_opinion;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exceptionHandlers.BadRequestException;
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
    public ResultsDTO<UserOpinion> getMyOpinions(Authentication authentication, int page, int size) throws UserDoesNotExistException {
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

    public ResultsDTO<UserOpinion> getOpinions(String uuid, int page, int size) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserOpinion> userOpinionPage;
        userOpinionPage = userOpinionRepository.getUserOpinionsByRatedUser(userService.getUserByUUID(uuid), pageable);
        return new ResultsDTO<>(userOpinionPage.stream().toList(), new Pagination(userOpinionPage.getTotalElements(), userOpinionPage.getTotalPages()));
    }

    public boolean checkIfNotRatingUsersOpinion(User user, UserOpinion userOpinion){
        return !userOpinion.getRatingUser().equals(user);
    }

    public UserOpinion updateOpinion(Authentication authentication,long id, UpdateUserOpinionDTO updateUserOpinionDTO) throws UserDoesNotExistException, EditSomeoneElseOpinionException, OpinionDoesNotExistException, BadRequestException {
        updateUserOpinionDTO.validate();
        UserOpinion userOpinion = userOpinionRepository.findById(id).orElseThrow(() -> new OpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfNotRatingUsersOpinion(user, userOpinion))
            throw new EditSomeoneElseOpinionException("User can edit only his own opinion");
        userOpinion.update(updateUserOpinionDTO);

        return userOpinionRepository.save(userOpinion);
    }

    public void deleteOpinion(Authentication authentication, long id) throws DeleteSomeoneElseOpinionException, UserDoesNotExistException, OpinionDoesNotExistException {
        UserOpinion userOpinion = userOpinionRepository.findById(id).orElseThrow(()->new OpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfNotRatingUsersOpinion(user, userOpinion))
            throw new DeleteSomeoneElseOpinionException("User can delete only his own opinion");

        userOpinionRepository.delete(userOpinion);
    }
}
