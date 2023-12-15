package com.zpi.backend.reservationsTests;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailService;
import com.zpi.backend.email_type.EmailTypeService;
import com.zpi.backend.email_type.exceptions.EmailTypeDoesNotExists;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.GameInstanceService;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservation_status.ReservationStatusRepository;
import com.zpi.backend.reservations.DTO.NewReservationDTO;
import com.zpi.backend.reservations.DTO.ReservationDTO;
import com.zpi.backend.reservations.DTO.ReservationDetailDTO;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.reservations.ReservationRepository;
import com.zpi.backend.reservations.ReservationService;
import com.zpi.backend.role.Role;
import com.zpi.backend.test_utils.*;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user_opinion.UserOpinion;
import com.zpi.backend.user_opinion.UserOpinionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
class ReservationsTests {
    @InjectMocks
    private ReservationService reservationService;

    @Mock
    private UserService userService;

    @Mock
    UserOpinionRepository userOpinionRepository;

    @Mock
    GameInstanceService gameInstanceService;

    @Mock
    private ReservationStatusRepository reservationStatusRepository;

    @Mock
    private ReservationRepository reservationRepository;


    @Mock
    private EmailService emailService;

    @Mock
    EmailTypeService emailTypeService;
    @Test
    void testAddReservationSuccessfully() throws UserDoesNotExistException, BadRequestException, GameInstanceDoesNotExistException, IOException, EmailTypeDoesNotExists {
                Authentication authentication =  any();
        NewReservationDTO newReservationDTO = ReservationTestUtils.createNewReservationDTO() /* create a mock NewReservationDTO */;
        when(userService.getUser(authentication)).thenReturn(UserTestUtils.createUser(Role.USER));
                GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID())).thenReturn(gameInstance);


                ReservationStatus pendingStatus = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING)/* create a mock ReservationStatus for PENDING */;
        when(reservationStatusRepository.findByStatus(ReservationStatus.PENDING)).thenReturn(Optional.of(pendingStatus));
        Reservation savedReservation = ReservationTestUtils.createReservation();
        when(reservationRepository.save(any(Reservation.class))).thenReturn(savedReservation);

                when(emailService.getPendingEmailContext(any(), any(), any(), any())).thenReturn(EmailTestUtils.createContext());
        doNothing().when(emailService).sendEmailWithHtmlTemplate(any(), any(), any(), any(), any());

                ReservationDTO result = reservationService.addReservation(authentication, newReservationDTO);

                assertNotNull(result);
            }

    @Test
    void testAddReservationWithInvalidUser() throws UserDoesNotExistException{
                Authentication authentication =any();
        NewReservationDTO newReservationDTO =ReservationTestUtils.createNewReservationDTO();
        when(userService.getUser(authentication)).thenThrow(new UserDoesNotExistException("User does not exist"));

                assertThrows(UserDoesNotExistException.class, () -> reservationService.addReservation(authentication, newReservationDTO));

                verifyNoInteractions(gameInstanceService, reservationStatusRepository, reservationRepository, emailService);
    }



    @Test
    void testAddReservationWithInvalidGameInstance() throws UserDoesNotExistException, GameInstanceDoesNotExistException {
                Authentication authentication = any() /* create a mock Authentication */;
        NewReservationDTO newReservationDTO =ReservationTestUtils.createNewReservationDTO() /* create a mock NewReservationDTO */;
        when(userService.getUser(authentication)).thenReturn(UserTestUtils.createUser(Role.USER));
        when(gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID())).thenThrow(new GameInstanceDoesNotExistException("Game instance does not exist"));

                assertThrows(GameInstanceDoesNotExistException.class, () -> reservationService.addReservation(authentication, newReservationDTO));
                verifyNoInteractions(reservationStatusRepository, reservationRepository, emailService);
    }

    @Test
    void testAddReservationWithOwnerBeingRenter() throws UserDoesNotExistException, GameInstanceDoesNotExistException{
                Authentication authentication = any() /* create a mock Authentication */;
        NewReservationDTO newReservationDTO = ReservationTestUtils.createNewReservationDTO() /* create a mock NewReservationDTO */;
        when(userService.getUser(authentication)).thenReturn(UserTestUtils.createUser(Role.USER));
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID())).thenReturn(gameInstance);

                assertThrows(BadRequestException.class, () -> reservationService.addReservation(authentication, newReservationDTO));
    }

    @Test
    void testCheckIfOwnerIsNotRenter() {
                User renter = UserTestUtils.createUser(Role.USER);
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        gameInstance.setOwner(renter);
                assertThrows(BadRequestException.class, () -> reservationService.checkIfOwnerIsNotRenter(renter, gameInstance));
    }
    @Test
    void testCheckIfOwnerIsNotRenterWithDifferentUsers() {
                User renter =UserTestUtils.createUser(Role.USER);
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
                assertDoesNotThrow(() -> reservationService.checkIfOwnerIsNotRenter(renter, gameInstance));
    }
    @Test
    void testCheckIfUserIsOwner() {
                User user = UserTestUtils.createUser(Role.USER);

        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        gameInstance.setOwner(user);
                assertTrue(reservationService.checkIfUserIsOwner(user, gameInstance));
    }

    @Test
    void testCheckIfUserIsNotOwner() {
                User user = UserTestUtils.createUser(Role.USER);
        User owner = UserTestUtils.createUserOwner(Role.USER);
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        gameInstance.setOwner(owner);

                assertFalse(reservationService.checkIfUserIsOwner(user, gameInstance));
    }

    @Test
    void testGetMyReservationsAsOwner() {
                User owner = UserTestUtils.createUserOwner(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(), status.getStatus())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, status, page, size);

                assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsOwnerWithNoReservations() {
                User owner = UserTestUtils.createUserOwner(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(), status.getStatus())).thenReturn(emptyReservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, status, page, size);

                assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsOwnerWithDifferentStatus() {
                User owner = UserTestUtils.createUserOwner(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.CANCELED_BY_RENTER);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(), status.getStatus())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, status, page, size);

                assertNotNull(resultsDTO);
        assertFalse(resultsDTO.getResults().isEmpty());
        assertEquals(1, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(1, resultsDTO.getPaginationInfo().getTotalPages());
    }


    @Test
    void testGetMyReservationsAsOwnerNoStatus() {
                User owner = UserTestUtils.createUserOwner(Role.USER);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByOwner(pageable, owner.getUuid())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, page, size);

                assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsOwnerWithNoReservationsNoStatus() {
                User owner = UserTestUtils.createUserOwner(Role.USER);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByOwner(pageable, owner.getUuid())).thenReturn(emptyReservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, page, size);

                assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenter() {
                User renter = UserTestUtils.createUser(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByRenterAndStatus(pageable, renter.getUuid(), status.getStatus())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, status, page, size);

                assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenterWithNoReservations() {
                User renter = UserTestUtils.createUser(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByRenterAndStatus(pageable, renter.getUuid(), status.getStatus())).thenReturn(emptyReservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, status, page, size);

                assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenterNoStatus() {
                User renter = UserTestUtils.createUser(Role.USER);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByRenter(pageable, renter.getUuid())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, page, size);

                assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenterWithNoReservationsNoStatus() {
                User renter = UserTestUtils.createUser(Role.USER);
        int page = 0;
        int size = 10;

                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByRenter(pageable, renter.getUuid())).thenReturn(emptyReservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, page, size);

                assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }


    @Test
    void testGetMyReservationsAsOwnerDTO() throws UserDoesNotExistException, BadRequestException {
                Authentication authentication = any() /* create a mock Authentication */;
        User user = UserTestUtils.createUserOwner(Role.USER);
        String status = "someStatus";
        Boolean asOwner = true;
        int page = 0;
        int size = 10;

                when(userService.getUser(authentication)).thenReturn(user);

                ReservationStatus reservationStatus = ReservationStatusTestUtils.createReservationStatus(status);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

                        PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(any(), any(),any())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

                assertNotNull(resultsDTO);
            }

    @Test
    void testGetMyReservationsAsRenterDTO() throws UserDoesNotExistException, BadRequestException {
                Authentication authentication =any() /* create a mock Authentication */;
        User user = UserTestUtils.createUser(Role.USER);
        String status = "someStatus";
        Boolean asOwner = false;
        int page = 0;
        int size = 10;

                when(userService.getUser(authentication)).thenReturn(user);

                ReservationStatus reservationStatus = new ReservationStatus(/* create a mock ReservationStatus */);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

                PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getReservationsByRenterAndStatus(any(), any(),any())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

                assertNotNull(resultsDTO);
            }


    @Test
    void testGetMyReservationsAsRenterStatus() throws UserDoesNotExistException, BadRequestException {
                Authentication authentication =  any()/* create a mock Authentication */;
        User user = UserTestUtils.createUser(Role.USER);
        String status = "someStatus";
        Boolean asOwner = false;
        int page = 0;
        int size = 10;

                when(userService.getUser(authentication)).thenReturn(user);

                ReservationStatus reservationStatus = ReservationStatusTestUtils.createReservationStatus(status);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

                PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getReservationsByRenterAndStatus(any(), any(),any())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

                assertNotNull(resultsDTO);
            }

    @Test
    void testGetMyReservationsAsOwnerStatus() throws UserDoesNotExistException, BadRequestException {
                Authentication authentication = any()/* create a mock Authentication */;
        User user = UserTestUtils.createUserOwner(Role.USER);
        String status = "someStatus";
        Boolean asOwner = true;
        int page = 0;
        int size = 10;

                when(userService.getUser(authentication)).thenReturn(user);

                ReservationStatus reservationStatus = ReservationStatusTestUtils.createReservationStatus(status);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

                PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(any(), any(),any())).thenReturn(reservationPage);
                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

                assertNotNull(resultsDTO);
            }

    @Test
    void testGetReservationByUUID() throws BadRequestException {
                String uuid = "someUUID";

                Reservation reservation = new Reservation(/* create a mock Reservation */);
        when(reservationRepository.getReservationByReservationId(uuid)).thenReturn(java.util.Optional.of(reservation));

                Reservation result = reservationService.getReservationByUUID(uuid);

                assertNotNull(result);
            }

    @Test
    void testGetReservationByUUIDNotFound() {
                String nonExistingUUID = "nonExistingUUID";

                when(reservationRepository.getReservationByReservationId(nonExistingUUID)).thenReturn(java.util.Optional.empty());

                assertThrows(BadRequestException.class, () ->
                reservationService.getReservationByUUID(nonExistingUUID)
        );
    }

    @Test
    void testGetReservationsByGameInstance() throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
                Authentication authentication = any()/* create a mock Authentication */;
        String gameInstanceUuid = "someGameInstanceUUID";
        int page = 0;
        int size = 10;

                GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();

        when(gameInstanceService.getGameInstance(gameInstanceUuid)).thenReturn(gameInstance);

                User user = UserTestUtils.createUserOwner(Role.USER);
        when(userService.getUser(authentication)).thenReturn(user);
        gameInstance.setOwner(user);



                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByGameInstance_Uuid(any(),any())).thenReturn(reservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getReservationsByGameInstance(authentication, gameInstanceUuid, page, size);

                assertNotNull(resultsDTO);
            }

    @Test
    void testGetReservationsByGameInstanceUnauthorizedUser() throws GameInstanceDoesNotExistException, UserDoesNotExistException {
                Authentication authentication = any();
        String gameInstanceUuid = "someGameInstanceUUID";
        int page = 0;
        int size = 10;

                GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(gameInstanceUuid)).thenReturn(gameInstance);

                User user = UserTestUtils.createUser(Role.USER);
        when(userService.getUser(authentication)).thenReturn(user);



                assertThrows(BadRequestException.class, () ->
                reservationService.getReservationsByGameInstance(authentication, gameInstanceUuid, page, size)
        );
    }

    @Test
    void testGetReservationsByGameInstanceWithNoReservations() throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
                Authentication authentication = any();
        String gameInstanceUuid = "someGameInstanceUUID";
        int page = 0;
        int size = 10;

                GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(gameInstanceUuid)).thenReturn(gameInstance);

                User user = UserTestUtils.createUserOwner(Role.USER);
        when(userService.getUser(authentication)).thenReturn(user);
        gameInstance.setOwner(user);



                Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByGameInstance_Uuid(pageable, gameInstanceUuid)).thenReturn(emptyReservationPage);

                ResultsDTO<ReservationDTO> resultsDTO = reservationService.getReservationsByGameInstance(authentication, gameInstanceUuid, page, size);

                assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }


    @Test
    void testChangeReservationStatusInvalidStatus() throws UserDoesNotExistException {
                Authentication authentication =any();
        String reservationId = "someReservationId";
        String status = "invalidStatus";

                Reservation reservation = ReservationTestUtils.createReservation();
        when(reservationRepository.getReservationByReservationId(reservationId)).thenReturn(java.util.Optional.of(reservation));



        when(userService.getUser(any())).thenReturn(UserTestUtils.createUser(Role.USER));

                assertThrows(BadRequestException.class, () ->
                reservationService.changeReservationStatus(authentication, reservationId, status)
        );
    }

    @Test
    void testCanChangeStatusAsOwner() throws UserDoesNotExistException {
                Authentication authentication =  any()/* create a mock Authentication */;
        Reservation reservation = ReservationTestUtils.createReservation();
        User owner = UserTestUtils.createUserOwner(Role.USER);
        when(userService.getUser(authentication)).thenReturn(owner);
        reservation.getGameInstance().setOwner(owner);

                boolean result = reservationService.canChangeStatus(authentication, reservation);

                assertTrue(result);
    }

    @Test
    void testCanChangeStatusAsRenter() throws UserDoesNotExistException {
                Authentication authentication =any() /* create a mock Authentication */;
        Reservation reservation = ReservationTestUtils.createReservation();
        User renter = UserTestUtils.createUser(Role.USER);
        reservation.setRenter(renter);
        when(userService.getUser(authentication)).thenReturn(renter);

                boolean result = reservationService.canChangeStatus(authentication, reservation);

                assertTrue(result);
    }

    @Test
    void testCannotChangeStatus() throws UserDoesNotExistException {
                Authentication authentication =any() /* create a mock Authentication */;
        Reservation reservation = ReservationTestUtils.createReservation();
        User anotherUser = UserTestUtils.createUser(Role.USER);
        when(userService.getUser(authentication)).thenReturn(anotherUser);

                boolean result = reservationService.canChangeStatus(authentication, reservation);

                assertFalse(result);
    }

    @Test
    void testGetReservationOwnerDetailsWithRenterOpinion() {
                Reservation reservation = ReservationTestUtils.createReservation();
        User renter = UserTestUtils.createUser(Role.USER);
        User owner = UserTestUtils.createUserOwner(Role.USER);
        reservation.getGameInstance().setOwner(owner);
        reservation.setRenter(renter);
        UserOpinion renterOpinion = UserOpinionTestUtils.createOpinionFromRenter(renter,owner);
        when(userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter)).thenReturn(Collections.singletonList(renterOpinion));

                ReservationDetailDTO result = reservationService.getReservationOwnerDetails(reservation);

                assertNotNull(result);
        assertNotNull(result.getRenterOpinion());
        assertFalse(result.isCanAddRenterOpinion());
    }

    @Test
    void testGetReservationOwnerDetailsWithoutRenterOpinion() {
                Reservation reservation = ReservationTestUtils.createReservation();
        User renter = UserTestUtils.createUser(Role.USER);
        reservation.setRenter(renter);
        when(userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter)).thenReturn(Collections.emptyList());

                ReservationDetailDTO result = reservationService.getReservationOwnerDetails(reservation);

                assertNotNull(result);
        assertNull(result.getRenterOpinion());
        assertTrue(result.isCanAddRenterOpinion());
    }




}
