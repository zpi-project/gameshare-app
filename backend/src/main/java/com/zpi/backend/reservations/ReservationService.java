package com.zpi.backend.reservations;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceService;
import com.zpi.backend.game_instance_opinion.GameInstanceOpinion;
import com.zpi.backend.game_instance_opinion.GameInstanceOpinionService;
import com.zpi.backend.game_instance_opinion.dto.GameInstanceOpinionDTO;
import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservation_status.ReservationStatusRepository;
import com.zpi.backend.reservations.DTO.*;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user_opinion.UserOpinion;
import com.zpi.backend.user_opinion.UserOpinionRepository;
import com.zpi.backend.user_opinion.dto.UserOpinionDTO;
import com.zpi.backend.utils.DateUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationService {
    UserService userService;
    GameInstanceService gameInstanceService;
    ReservationStatusRepository reservationStatusRepository;
    ReservationRepository reservationRepository;
    GameInstanceOpinionService gameinstanceOpinionService;
    UserOpinionRepository userOpinionRepository;


    public ReservationDTO addReservation(Authentication authentication, NewReservationDTO newReservationDTO) throws UserDoesNotExistException, BadRequestException, GameInstanceDoesNotExistException {
        User renter = userService.getUser(authentication);
        newReservationDTO.validate();
        GameInstance gameInstance = gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID());
        checkIfOwnerIsNotRenter(renter,gameInstance);

        Reservation reservation = new Reservation().fromDTO(newReservationDTO, renter, gameInstance);
        reservation.setStatus(reservationStatusRepository.findByStatus("PENDING"));
        reservation=  reservationRepository.save(reservation);
        reservation = reservationRepository.findById(reservation.getId()).get();
        reservation.setReservationId(DateUtils.getYear(reservation.getStartDate()) + "-" + DateUtils.getMonth(reservation.getStartDate())+'-'+reservation.getId());
        return new ReservationDTO(reservationRepository.save(reservation));
    }
    public void checkIfOwnerIsNotRenter(User renter,GameInstance gameInstance) throws BadRequestException {
        if(renter.getUuid().equals(gameInstance.getOwner().getUuid()))
            throw new BadRequestException("Owner cannot be renter");
    }



    public ResultsDTO<ReservationDTO> getMyReservationsAsOwner(User owner, ReservationStatus status, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(),status.getStatus());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservationsAsOwner(User owner, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsByOwner(pageable, owner.getUuid());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservationsAsRenter(User renter,ReservationStatus status, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsByRenterAndStatus(pageable, renter.getUuid(),status.getStatus());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservationsAsRenter(User renter, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Reservation> reservationPage = reservationRepository.getReservationsByRenter(pageable, renter.getUuid());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservations(Authentication authentication, String status,Boolean asOwner, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        ReservationStatus reservationStatus = reservationStatusRepository.findByStatus(status);
        if(asOwner){
            return getMyReservationsAsOwner(user,reservationStatus,page,size);
        }
        return getMyReservationsAsRenter(user,reservationStatus,page,size);
    }

    public ResultsDTO<ReservationDTO> getMyReservations(Authentication authentication, Boolean asOwner, int page, int size) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        if(asOwner){
            return getMyReservationsAsOwner(user,page,size);
        }
        return getMyReservationsAsRenter(user,page,size);
    }



    public Boolean checkIfUserIsOwner(User user, GameInstance gameInstance){
        return user.getUuid().equals(gameInstance.getOwner().getUuid());
    }


    public Reservation getReservationByUUID(String uuid) throws BadRequestException {
        return reservationRepository.getReservationByReservationId(uuid).orElseThrow(()->new BadRequestException("Reservation does not exist"));
    }


    public static Page<ReservationDTO> convertPage(Page<Reservation> reservationPage) {
        List<ReservationDTO> reservationDTOList = reservationPage.getContent().stream()
                .map(ReservationDTO::new) // assuming ReservationDTO has a constructor taking Reservation as a parameter
                .collect(Collectors.toList());

        return new PageImpl<>(reservationDTOList, reservationPage.getPageable(), reservationPage.getTotalElements());
    }

    public ResultsDTO<ReservationDTO> getReservationsByGameInstance(Authentication authentication, String gameInstanceUuid, int page, int size) throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
        Pageable pageable = PageRequest.of(page, size);
        GameInstance gameInstance = gameInstanceService.getGameInstance(gameInstanceUuid);
        User user = userService.getUser(authentication);
        if(!checkIfUserIsOwner(user,gameInstance))
            throw new BadRequestException("User is not owner of this game instance");
        Page<Reservation> reservationPage = reservationRepository.getReservationsByGameInstance_Uuid(pageable, gameInstanceUuid);
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);

        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public Reservation changeReservationStatus(Authentication  authentication, String reservationId, String status) throws UserDoesNotExistException, BadRequestException {
        Reservation reservation = reservationRepository.getReservationByReservationId(reservationId).orElseThrow(()->new BadRequestException("Reservation does not exist"));
        if(!canChangeStatus(authentication,reservation))
            throw new BadRequestException("User is not owner or renter of this reservation");
        reservation.setStatus(reservationStatusRepository.findByStatus(status));
        return reservationRepository.save(reservation);
    }

    public boolean canChangeStatus(Authentication authentication,Reservation reservation) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        if(user.getUuid().equals(reservation.getGameInstance().getOwner().getUuid())){
            return true;
        }
        else return user.getUuid().equals(reservation.getRenter().getUuid());
    }

    public ReservationDetailDTO getReservationOwnerDetails(Reservation reservation){
        User renter = reservation.getRenter();
        UserOpinion renterOpinion = userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter).stream().findFirst().orElse(null);
        UserOpinionDTO renterOpinionDTO = null;
        if(renterOpinion != null)
            renterOpinionDTO = new UserOpinionDTO(renterOpinion,false);
        boolean canAddRenterOpinion = renterOpinion == null;
        return new ReservationDetailDTO(new ReservationDTO(reservation),canAddRenterOpinion,false,false,null,renterOpinionDTO,null);
    }

    public ReservationDetailDTO getReservationRenterDetails(Reservation reservation) throws BadRequestException {
        if(!(reservation.getStatus().getStatus().equals("RENTED")|| reservation.getStatus().getStatus().equals("FINISHED"))){
            throw new BadRequestException("Reservation is not in progress or finished");
        }
        User owner = reservation.getGameInstance().getOwner();
        GameInstance gameInstance = reservation.getGameInstance();

        UserOpinion ownerOpinion =  userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, owner).stream().findFirst().orElse(null);
        GameInstanceOpinion gameInstanceOpinion = gameinstanceOpinionService.getOpinionsByGameInstance(gameInstance).stream().findFirst().orElse(null);
        UserOpinionDTO ownerOpinionDTO = null;
        GameInstanceOpinionDTO gameInstanceOpinionDTO = null;
        if(ownerOpinion != null)
            ownerOpinionDTO = new UserOpinionDTO(ownerOpinion,false);

        if(gameInstanceOpinion != null)
            gameInstanceOpinionDTO = new GameInstanceOpinionDTO(gameInstanceOpinion,false);


        boolean canAddOwnerOpinion = ownerOpinion == null;
        boolean canAddGameInstanceOpinion = gameInstanceOpinion == null;
        return new ReservationDetailDTO(new ReservationDTO(reservation),false,canAddOwnerOpinion,canAddGameInstanceOpinion,ownerOpinionDTO,null,gameInstanceOpinionDTO);
    }

    public ReservationDetailDTO getReservationDetails(Authentication authentication, String reservationId) throws UserDoesNotExistException, BadRequestException {
        Reservation reservation = reservationRepository.getReservationByReservationId(reservationId).orElseThrow(()->new BadRequestException("Reservation does not exist"));
        User user = userService.getUser(authentication);
        if(checkIfUserIsOwner(user,reservation.getGameInstance())){
            return getReservationOwnerDetails(reservation);

        }
        else if(user.getUuid().equals(reservation.getRenter().getUuid())){
            return getReservationRenterDetails(reservation);
        }
        else{
            throw new BadRequestException("User is not owner or renter of this reservation");
        }
    }


    public boolean checkIfUserIsRenter(User user, Reservation reservation){
        return user.getUuid().equals(reservation.getRenter().getUuid());
    }

    public List<String> getReservationStatuses(Authentication authentication, String reservationId) throws BadRequestException, UserDoesNotExistException {
        Reservation reservation = reservationRepository.getReservationByReservationId(reservationId).orElseThrow(()->new BadRequestException("Reservation does not exist"));
        boolean is_owner =checkIfUserIsOwner(userService.getUser(authentication),reservation.getGameInstance());
        boolean is_renter = checkIfUserIsRenter(userService.getUser(authentication),reservation);
        if(!is_owner && !is_renter)
            throw new BadRequestException("User is not owner or renter of this reservation");
        if(is_owner){
            if(Objects.equals(reservation.getStatus().getStatus(), "PENDING")){
                return List.of("ACCEPTED_BY_OWNER","REJECTED_BY_OWNER","EXPIRED");
            }
        }else {
            if(Objects.equals(reservation.getStatus().getStatus(), "PENDING")){
                return null;
            }
        }
        if(Objects.equals(reservation.getStatus().getStatus(), "ACCEPTED_BY_OWNER")){
            return List.of("RENTED","CANCELED_BY_OWNER","CANCELLED_BY_RENTER","EXPIRED");
        }
        if(Objects.equals(reservation.getStatus().getStatus(), "REJECTED_BY_OWNER")){
            return null;
        }
        if(Objects.equals(reservation.getStatus().getStatus(), "CANCELLED_BY_RENTER")){
            return null;
        }
        if(Objects.equals(reservation.getStatus().getStatus(), "CANCELED_BY_OWNER")){
            return null;
        }
        if(Objects.equals(reservation.getStatus().getStatus(), "RENTED")){
            return List.of("FINISHED");
        }
        return null;
    }
}
