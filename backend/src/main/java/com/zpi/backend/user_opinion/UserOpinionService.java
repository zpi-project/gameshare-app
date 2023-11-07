package com.zpi.backend.user_opinion;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserOpinionService {

    UserOpinionRepository userOpinionRepository;
    UserService userService;
    public ResultsDTO<ReturnOpinionServiceDTO> getMyOpinions(Authentication authentication, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        Pageable pageable = PageRequest.of(page, size);

        Page<UserOpinion> userOpinionPage = userOpinionRepository.getUserOpinionsByRatedUser(user, pageable);
        Page<ReturnOpinionServiceDTO> returnUserOpinionDTOpage = convertPage(userOpinionPage);
        return new ResultsDTO<>(returnUserOpinionDTOpage.stream().toList(), new Pagination(returnUserOpinionDTOpage.getTotalElements(), returnUserOpinionDTOpage.getTotalPages()));
    }

    public Page<ReturnOpinionServiceDTO> convertPage(Page<UserOpinion> entityPage) {
        return new PageImpl<>(
                entityPage.getContent().stream()  // Convert each EntityObject to DTOObject
                        .map(this::convertToDTO)
                        .collect(Collectors.toList()),
                entityPage.getPageable(),
                entityPage.getTotalElements()
        );
    }
    public ReturnOpinionServiceDTO convertToDTO(UserOpinion userOpinion){
        return new ReturnOpinionServiceDTO(userOpinion);
    }

    public UserOpinion addOpinion(Authentication authentication, NewUserOpinionDTO newUserOpinionDTO) throws BadRequestException, UserDoesNotExistException {
        newUserOpinionDTO.validate();
        User user = userService.getUser(authentication);
        User ratedUser = userService.getUserByUUID(newUserOpinionDTO.getRatedUserUUID());
        UserOpinion userOpinion = newUserOpinionDTO.toUserOpinion(user, ratedUser);
        return userOpinionRepository.save(userOpinion);
    }

    public ResultsDTO<ReturnOpinionServiceDTO> getOpinions(String uuid, int page, int size) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserOpinion> userOpinionPage;
        userOpinionPage = userOpinionRepository.getUserOpinionsByRatedUser(userService.getUserByUUID(uuid), pageable);
        Page<ReturnOpinionServiceDTO> returnUserOpinionDTOpage = convertPage(userOpinionPage);
        return new ResultsDTO<>(returnUserOpinionDTOpage.stream().toList(), new Pagination(returnUserOpinionDTOpage.getTotalElements(), returnUserOpinionDTOpage.getTotalPages()));
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
