package com.zpi.backend.interfaces;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user_opinion.UserOpinion;
import com.zpi.backend.user_opinion.dto.ModifiedUserOpinionDTO;
import com.zpi.backend.user_opinion.dto.NewUserOpinionDTO;
import com.zpi.backend.user_opinion.dto.UserOpinionDTO;
import com.zpi.backend.user_opinion.exception.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.EditSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.UserOpinionDoesNotExistException;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserOpinionServiceInterface {
    public ResultsDTO<UserOpinionDTO> getMyOpinions(Authentication authentication, int page, int size) throws UserDoesNotExistException;
    public UserOpinionDTO addOpinion(Authentication authentication, NewUserOpinionDTO newUserOpinionDTO) throws BadRequestException, UserDoesNotExistException;
    public ResultsDTO<UserOpinionDTO> getOpinions(Authentication authentication, String uuid, int page, int size) throws UserDoesNotExistException;
    public boolean checkIfNotRatingUsersOpinion(User user, UserOpinion userOpinion);
    public UserOpinionDTO updateOpinion(Authentication authentication, long id, ModifiedUserOpinionDTO modifiedUserOpinionDTO) throws UserDoesNotExistException, EditSomeoneElseOpinionException, UserOpinionDoesNotExistException, BadRequestException ;
    public void deleteOpinion(Authentication authentication, long id) throws DeleteSomeoneElseOpinionException, UserDoesNotExistException, UserOpinionDoesNotExistException;
    public List<UserOpinion> getOpinionsByReservationAndUser(Reservation reservation, User user);

    }
