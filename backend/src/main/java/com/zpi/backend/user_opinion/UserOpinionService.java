package com.zpi.backend.user_opinion;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.reservations.ReservationService;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user_opinion.dto.ModifiedUserOpinionDTO;
import com.zpi.backend.user_opinion.dto.NewUserOpinionDTO;
import com.zpi.backend.user_opinion.dto.UserOpinionDTO;
import com.zpi.backend.user_opinion.exception.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.EditSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.UserOpinionDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserOpinionService {

    UserOpinionRepository userOpinionRepository;
    UserService userService;
    ReservationService reservationService;

    public ResultsDTO<UserOpinionDTO> getMyOpinions(Authentication authentication, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        boolean isGuest = !authentication.isAuthenticated();
        Pageable pageable = PageRequest.of(page, size);
        Page<UserOpinion> userOpinionPage = userOpinionRepository.getUserOpinionsByRatedUserOrderByTimestamp(user, pageable);
        List<UserOpinionDTO> userOpinionDTOList = new ArrayList<>();
        userOpinionPage
                .forEach(userOpinion -> userOpinionDTOList.add(new UserOpinionDTO(userOpinion, isGuest)));
        return new ResultsDTO<>(userOpinionDTOList, new Pagination(userOpinionPage.getTotalElements(), userOpinionPage.getTotalPages()));
    }

    public boolean checkIfCanAddOpinion(Reservation reservation, User ratedUser){
        return userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation,ratedUser).isEmpty();
    }
    public UserOpinionDTO addOpinion(Authentication authentication, NewUserOpinionDTO newUserOpinionDTO) throws BadRequestException, UserDoesNotExistException {
        newUserOpinionDTO.validate();
        User user = userService.getUser(authentication);
        User ratedUser = userService.getUserByUUID(newUserOpinionDTO.getRatedUserUUID());
        Reservation reservation = reservationService.getReservationByUUID(newUserOpinionDTO.getReservationId());
        if(!checkIfCanAddOpinion(reservation,ratedUser))
            throw new BadRequestException("User already rated this reservation");
        UserOpinion userOpinion = newUserOpinionDTO.toUserOpinion(user, ratedUser);
        userOpinion.setReservation(reservation);
        boolean isGuest = !authentication.isAuthenticated();
        userOpinionRepository.save(userOpinion);
        userService.updateAvgRating(ratedUser.getId());
        return new UserOpinionDTO(userOpinion, isGuest);
    }

    public ResultsDTO<UserOpinionDTO> getOpinions(Authentication authentication, String uuid, int page, int size) throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        boolean isGuest = authentication == null || !authentication.isAuthenticated();
        Page<UserOpinion> userOpinionPage =
                userOpinionRepository.getUserOpinionsByRatedUserOrderByTimestamp(userService.getUserByUUID(uuid), pageable);
        List<UserOpinionDTO> userOpinionDTOList = new ArrayList<>();
        userOpinionPage
                .forEach(userOpinion -> userOpinionDTOList.add(new UserOpinionDTO(userOpinion, isGuest)));
        return new ResultsDTO<>(userOpinionDTOList.stream().toList(), new Pagination(userOpinionPage.getTotalElements(), userOpinionPage.getTotalPages()));
    }

    public boolean checkIfNotRatingUsersOpinion(User user, UserOpinion userOpinion){
        return !userOpinion.getRatingUser().equals(user);
    }

    public UserOpinionDTO updateOpinion(Authentication authentication, long id, ModifiedUserOpinionDTO modifiedUserOpinionDTO) throws UserDoesNotExistException, EditSomeoneElseOpinionException, UserOpinionDoesNotExistException, BadRequestException {
        modifiedUserOpinionDTO.validate();
        UserOpinion userOpinion = userOpinionRepository.findById(id).orElseThrow(() -> new UserOpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);

        if(checkIfNotRatingUsersOpinion(user, userOpinion))
            throw new EditSomeoneElseOpinionException("User can edit only his own opinion");
        boolean isGuest = !authentication.isAuthenticated();
        userOpinion.update(modifiedUserOpinionDTO);
        userOpinionRepository.save(userOpinion);
        userService.updateAvgRating(userOpinion.getRatedUser().getId());
        return new UserOpinionDTO(userOpinion, isGuest);
    }

    public void deleteOpinion(Authentication authentication, long id) throws DeleteSomeoneElseOpinionException, UserDoesNotExistException, UserOpinionDoesNotExistException {
        UserOpinion userOpinion = userOpinionRepository.findById(id).orElseThrow(()->new UserOpinionDoesNotExistException("Opinion does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfNotRatingUsersOpinion(user, userOpinion))
            throw new DeleteSomeoneElseOpinionException("User can delete only his own opinion");
        userOpinionRepository.delete(userOpinion);
        userService.updateAvgRating(user.getId());
    }
}
