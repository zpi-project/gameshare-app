package com.zpi.backend.reservations;

import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailService;
import com.zpi.backend.email_type.EmailTypeService;
import com.zpi.backend.email_type.exceptions.EmailTypeDoesNotExists;
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
import org.springframework.data.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static com.zpi.backend.email_type.EmailType.*;
import static com.zpi.backend.reservation_status.ReservationStatus.*;

@Service
@AllArgsConstructor
public class ReservationService {
    private final UserService userService;
    private final GameInstanceService gameInstanceService;
    private final ReservationStatusRepository reservationStatusRepository;
    private final ReservationRepository reservationRepository;
    private final GameInstanceOpinionService gameinstanceOpinionService;
    private final UserOpinionRepository userOpinionRepository;
    private final EmailService emailService;
    private final EmailTypeService emailTypeService;
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

    public ReservationDTO addReservation(Authentication authentication, NewReservationDTO newReservationDTO) throws UserDoesNotExistException, BadRequestException, GameInstanceDoesNotExistException, IOException, EmailTypeDoesNotExists {
        User renter = userService.getUser(authentication);
        newReservationDTO.validate();
        GameInstance gameInstance = gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID());
        checkIfOwnerIsNotRenter(renter,gameInstance);

        Reservation reservation = new Reservation(newReservationDTO, renter, gameInstance);
        reservation.setStatus(reservationStatusRepository.findByStatus(PENDING).orElseThrow(()->new BadRequestException("Status does not exist")));
        reservation=  reservationRepository.save(reservation);
        reservation.setReservationId(DateUtils.getYear(reservation.getStartDate()) + "-" + DateUtils.getMonth(reservation.getStartDate())+'-'+reservation.getId());
        ReservationDTO reservationDTO = new ReservationDTO(reservationRepository.save(reservation));
//        Sending email
        Context context = emailService.getPendingEmailContext(reservation.getReservationId(),
                reservation.getGameInstance().getGame().getName(), reservation.getStartDate(), reservation.getEndDate());
        emailService.sendEmailWithHtmlTemplate(reservation.getGameInstance().getOwner(), context.getVariable("pl_title").toString(),
                EmailService.EMAIL_TEMPLATE, context,
                emailTypeService.findEmailTypeByStatus(RESERVATION_PENDING)
        );
        return reservationDTO;
    }
    public void checkIfOwnerIsNotRenter(User renter,GameInstance gameInstance) throws BadRequestException {
        if(renter.getUuid().equals(gameInstance.getOwner().getUuid()))
            throw new BadRequestException("Owner cannot be renter");
    }



    public ResultsDTO<ReservationDTO> getMyReservationsAsOwner(User owner, ReservationStatus status, int page, int size){
        Pageable pageable = PageRequest.of(page, size,Sort.by( "timestamp").descending());
        Page<Reservation> reservationPage = reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(),status.getStatus());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservationsAsOwner(User owner, int page, int size){
        Pageable pageable = PageRequest.of(page, size,Sort.by( "timestamp").descending());
        Page<Reservation> reservationPage = reservationRepository.getReservationsByOwner(pageable, owner.getUuid());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservationsAsRenter(User renter,ReservationStatus status, int page, int size){
        Pageable pageable = PageRequest.of(page, size,Sort.by( "timestamp").descending());
        Page<Reservation> reservationPage = reservationRepository.getReservationsByRenterAndStatus(pageable, renter.getUuid(),status.getStatus());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservationsAsRenter(User renter, int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by( "timestamp").descending());
        Page<Reservation> reservationPage = reservationRepository.getReservationsByRenter(pageable, renter.getUuid());
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);
        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public ResultsDTO<ReservationDTO> getMyReservations(Authentication authentication, String status,Boolean asOwner, int page, int size) throws UserDoesNotExistException, BadRequestException {
        User user = userService.getUser(authentication);
        ReservationStatus reservationStatus = reservationStatusRepository.findByStatus(status).orElseThrow(()->new BadRequestException("Status does not exist"));
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

    public ResultsDTO<ReservationDTO> getReservationsByGameInstance(Authentication authentication, String gameInstanceUuid, int page, int size) throws GameInstanceDoesNotExistException,UserDoesNotExistException, BadRequestException {
        Pageable pageable = PageRequest.of(page, size,Sort.by( "timestamp").descending());
        GameInstance gameInstance = gameInstanceService.getGameInstance(gameInstanceUuid);
        User user = userService.getUser(authentication);
        if(!checkIfUserIsOwner(user,gameInstance))
            throw new BadRequestException("User is not owner of this game instance");
        Page<Reservation> reservationPage = reservationRepository.getReservationsByGameInstance_Uuid(pageable, gameInstanceUuid);
        Page<ReservationDTO > reservationDTOPage = convertPage(reservationPage);

        return new ResultsDTO<>(reservationDTOPage.stream().toList(), new Pagination(reservationDTOPage.getTotalElements(),reservationDTOPage.getTotalPages()));
    }

    public Reservation changeReservationStatus(Authentication  authentication, String reservationId, String status) throws UserDoesNotExistException, BadRequestException, IOException, EmailTypeDoesNotExists {
        Reservation reservation = reservationRepository.getReservationByReservationId(reservationId).orElseThrow(()->new BadRequestException("Reservation does not exist"));
        if(!canChangeStatus(authentication,reservation))
            throw new BadRequestException("User is not owner or renter of this reservation");
        List<String> possibleStatuses = getReservationStatuses(authentication,reservationId);

        if(possibleStatuses == null || !possibleStatuses.contains(status))
            throw new BadRequestException("Status cannot be changed to "+status +" from "+reservation.getStatus().getStatus());
        Reservation changedReservation = changeStatus(reservation, status);
        if (status.equals(ACCEPTED_BY_OWNER))
            rejectReservationsAtTheTime(changedReservation);
        return changedReservation;
    }

    private Reservation changeStatus(Reservation reservation, String status) throws BadRequestException, IOException, EmailTypeDoesNotExists {
        String reservationId = reservation.getReservationId();
        reservation.setStatus(reservationStatusRepository.findByStatus(status).orElseThrow(()->new BadRequestException("Status does not exist")));
        // sending emails
        Context context;
        switch (status){
            case ACCEPTED_BY_OWNER ->{
                context = emailService.getAcceptingEmailContext(reservationId, reservation.getGameInstance().getGame().getName());
                emailService.sendEmailWithHtmlTemplate(reservation.getRenter(), context.getVariable("pl_title").toString(),
                        EmailService.EMAIL_TEMPLATE, context,
                        emailTypeService.findEmailTypeByStatus(RESERVATION_ACCEPTED)
                );
            }
            case REJECTED_BY_OWNER -> {
                context = emailService.getRejectingEmailContext(reservationId, reservation.getGameInstance().getGame().getName());
                emailService.sendEmailWithHtmlTemplate(reservation.getRenter(), context.getVariable("pl_title").toString(),
                        EmailService.EMAIL_TEMPLATE, context,
                        emailTypeService.findEmailTypeByStatus(RESERVATION_REJECTED)
                );
            }
            case CANCELED_BY_OWNER ->{
                context = emailService.getCancelingByOwnerEmailContext(reservationId, reservation.getGameInstance().getGame().getName());
                emailService.sendEmailWithHtmlTemplate(reservation.getRenter(), context.getVariable("pl_title").toString(),
                        EmailService.EMAIL_TEMPLATE, context,
                        emailTypeService.findEmailTypeByStatus(RESERVATION_CANCELED_BY_OWNER)
                );
            }
            case CANCELED_BY_RENTER ->{
                context = emailService.getCancelingByRenterEmailContext(reservationId, reservation.getGameInstance().getGame().getName());
                emailService.sendEmailWithHtmlTemplate(reservation.getGameInstance().getOwner(), context.getVariable("pl_title").toString(),
                        EmailService.EMAIL_TEMPLATE, context,
                        emailTypeService.findEmailTypeByStatus(RESERVATION_CANCELED_BY_RENTER)
                );
            }
            case FINISHED ->{
                context = emailService.getFinishingEmailContext(reservationId, reservation.getGameInstance().getGame().getName());
                emailService.sendEmailWithHtmlTemplate(reservation.getGameInstance().getOwner(), context.getVariable("pl_title").toString(),
                        EmailService.EMAIL_TEMPLATE, context,
                        emailTypeService.findEmailTypeByStatus(RESERVATION_FINISHED)
                );
            }
        }
        return reservationRepository.save(reservation);
    }

    private void rejectReservationsAtTheTime(Reservation acceptedReservation) throws BadRequestException, EmailTypeDoesNotExists, IOException {
        List<Reservation> reservationsToReject = reservationRepository
                .getReservationToReject(
                        acceptedReservation.getGameInstance(),
                        acceptedReservation.getStartDate(),
                        acceptedReservation.getEndDate()
                );
        for (Reservation r: reservationsToReject){
            changeStatus(r, REJECTED_BY_OWNER);
        }
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
        User owner = reservation.getGameInstance().getOwner();
        UserOpinion ownerOpinion =  userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, owner).stream().findFirst().orElse(null);
        UserOpinionDTO ownerOpinionDTO = null;
        if(ownerOpinion != null)
            ownerOpinionDTO = new UserOpinionDTO(ownerOpinion,false);

        boolean canAddRenterOpinion = renterOpinion == null;
        return new ReservationDetailDTO(new ReservationDTO(reservation),canAddRenterOpinion,false,false,ownerOpinionDTO,renterOpinionDTO,null);
    }

    public ReservationDetailDTO getReservationRenterDetails(Reservation reservation)  {
        User renter = reservation.getRenter();
        User owner = reservation.getGameInstance().getOwner();
        GameInstance gameInstance = reservation.getGameInstance();

        UserOpinion renterOpinion = userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter).stream().findFirst().orElse(null);
        UserOpinion ownerOpinion =  userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, owner).stream().findFirst().orElse(null);
        GameInstanceOpinion gameInstanceOpinion = gameinstanceOpinionService.getOpinionsByGameInstance(gameInstance).stream().findFirst().orElse(null);

        UserOpinionDTO renterOpinionDTO = null;
        UserOpinionDTO ownerOpinionDTO = null;
        GameInstanceOpinionDTO gameInstanceOpinionDTO = null;

        if(renterOpinion != null)
            renterOpinionDTO = new UserOpinionDTO(renterOpinion,false);

        if(ownerOpinion != null)
            ownerOpinionDTO = new UserOpinionDTO(ownerOpinion,false);

        if(gameInstanceOpinion != null)
            gameInstanceOpinionDTO = new GameInstanceOpinionDTO(gameInstanceOpinion,false);

        boolean canAddOwnerOpinion = ownerOpinion == null;
        boolean canAddGameInstanceOpinion = gameInstanceOpinion == null;
        if(!(reservation.getStatus().getStatus().equals(RENTED)|| reservation.getStatus().getStatus().equals(FINISHED))){
            canAddOwnerOpinion = false;
            canAddGameInstanceOpinion = false;
        }
        return new ReservationDetailDTO(new ReservationDTO(reservation),false,canAddOwnerOpinion,canAddGameInstanceOpinion,ownerOpinionDTO,renterOpinionDTO,gameInstanceOpinionDTO);
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
        else if(is_owner) {
            switch (reservation.getStatus().getStatus()) {
                case PENDING -> {
                    return List.of(ACCEPTED_BY_OWNER, REJECTED_BY_OWNER);
                }
                case ACCEPTED_BY_OWNER -> {
                    return List.of(CANCELED_BY_OWNER, RENTED);
                }
                case RENTED -> {
                    return List.of(FINISHED);
                }
            }
        }
        else {
            if (reservation.getStatus().getStatus().equals(PENDING)) {
                return List.of(CANCELED_BY_RENTER);
            }
            else if (reservation.getStatus().getStatus().equals(ACCEPTED_BY_OWNER)) {
                return List.of(CANCELED_BY_RENTER);
            }
        }
        return List.of();
    }

    // Scheduling tasks

    @Scheduled(cron = "0 0 8 ? * *", zone = "Europe/Warsaw")
    public void sendRemaindersAboutReservation2DaysBefore() throws IOException, EmailTypeDoesNotExists {
        logger.info("Sending reservation reminders 2 days before.");
        List<Reservation> reservationsSoon = reservationRepository.getReservationsStartingInTwoDays();
        for (Reservation r: reservationsSoon){
            Context context = emailService.getRemindingIn2DaysEmailContext(
                    r.getReservationId(), r.getGameInstance().getGame().getName()
            );
            emailService.sendEmailWithHtmlTemplate(
                    r.getRenter(),
                    context.getVariable("pl_title").toString(),
                    EmailService.EMAIL_TEMPLATE,
                    context,
                    emailTypeService.findEmailTypeByStatus(RESERVATION_COMING_SOON)
            );
        }
    }

    @Scheduled(cron = "0 5 8 ? * *", zone = "Europe/Warsaw")
    public void sendRemaindersAboutReservationOnDay() throws IOException, EmailTypeDoesNotExists {
        logger.info("Sending reservation reminders on reservation day.");
        List<Reservation> reservationsToday = reservationRepository.getReservationsStartingToday();
        for (Reservation r: reservationsToday){
            Context context = emailService.getRemindingTodayEmailContext(
                    r.getReservationId(), r.getGameInstance().getGame().getName()
            );
            emailService.sendEmailWithHtmlTemplate(
                    r.getRenter(),
                    context.getVariable("pl_title").toString(),
                    EmailService.EMAIL_TEMPLATE,
                    context,
                    emailTypeService.findEmailTypeByStatus(RESERVATION_TODAY)
            );
        }
    }

    @Scheduled(cron = "0 10 8 ? * *", zone = "Europe/Warsaw")
    public void setExpiredStatus() throws IOException, EmailTypeDoesNotExists {
        logger.info("Setting reservation status to expired.");
        List<Reservation> expiredReservations = reservationRepository.getExpiringReservations();
        if (!expiredReservations.isEmpty()) {
            reservationRepository.setExpiredStatus();
//          Sending emails
            for (Reservation r : expiredReservations) {
                Context context = emailService.getExpiringEmailContext(
                        r.getReservationId(), r.getGameInstance().getGame().getName()
                );
                emailService.sendEmailWithHtmlTemplate(
                        r.getRenter(),
                        context.getVariable("pl_title").toString(),
                        EmailService.EMAIL_TEMPLATE,
                        context,
                        emailTypeService.findEmailTypeByStatus(RESERVATION_EXPIRED)
                );
            }
        }
    }
}
