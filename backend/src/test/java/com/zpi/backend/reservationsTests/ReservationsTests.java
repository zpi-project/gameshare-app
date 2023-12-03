package com.zpi.backend.reservationsTests;

import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailService;
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
class GameServiceTests {
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



    @Test
    void testAddReservationSuccessfully() throws UserDoesNotExistException, BadRequestException, GameInstanceDoesNotExistException, IOException, EmailTypeDoesNotExists {
        // Mock dependencies
        Authentication authentication =  any()/* create a mock Authentication */;
        NewReservationDTO newReservationDTO = ReservationTestUtils.createNewReservationDTO() /* create a mock NewReservationDTO */;
        when(userService.getUser(authentication)).thenReturn(UserTestUtils.createUser(Role.USER));

        // Mock the validation of the newReservationDTO
        // You may need to adjust this based on your actual validation logic

        // Mock the retrieval of the game instance
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID())).thenReturn(gameInstance);

        // Mock the check for owner not being renter
        // Assuming checkIfOwnerIsNotRenter is a method in your class

        // Mock the creation and saving of the reservation
        ReservationStatus pendingStatus = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING)/* create a mock ReservationStatus for PENDING */;
        when(reservationStatusRepository.findByStatus(ReservationStatus.PENDING)).thenReturn(Optional.of(pendingStatus));
        Reservation savedReservation = ReservationTestUtils.createReservation();
        when(reservationRepository.save(any(Reservation.class))).thenReturn(savedReservation);

        // Mock the setting of the reservation ID based on the date


        // Mock the email sending
        when(emailService.getPendingEmailContext(any(), any(), any(), any())).thenReturn(EmailTestUtils.createContext());
        doNothing().when(emailService).sendEmailWithHtmlTemplate(any(), any(), any(), any(), any());

        // Call the method being tested
        ReservationDTO result = reservationService.addReservation(authentication, newReservationDTO);

        // Verify the result
        assertNotNull(result);
        // Add more assertions based on your actual implementation and expected behavior
    }

    @Test
    void testAddReservationWithInvalidUser() throws UserDoesNotExistException{
        // Mock dependencies
        Authentication authentication =any();
        NewReservationDTO newReservationDTO =ReservationTestUtils.createNewReservationDTO();
        when(userService.getUser(authentication)).thenThrow(new UserDoesNotExistException("User does not exist"));

        // Call the method being tested and expect a UserDoesNotExistException
        assertThrows(UserDoesNotExistException.class, () -> reservationService.addReservation(authentication, newReservationDTO));

        // Verify that other methods are not called
        verifyNoInteractions(gameInstanceService, reservationStatusRepository, reservationRepository, emailService);
    }



    @Test
    void testAddReservationWithInvalidGameInstance() throws UserDoesNotExistException, GameInstanceDoesNotExistException {
        // Mock dependencies
        Authentication authentication = any() /* create a mock Authentication */;
        NewReservationDTO newReservationDTO =ReservationTestUtils.createNewReservationDTO() /* create a mock NewReservationDTO */;
        when(userService.getUser(authentication)).thenReturn(UserTestUtils.createUser(Role.USER));
        when(gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID())).thenThrow(new GameInstanceDoesNotExistException("Game instance does not exist"));

        // Call the method being tested and expect a GameInstanceDoesNotExistException
        assertThrows(GameInstanceDoesNotExistException.class, () -> reservationService.addReservation(authentication, newReservationDTO));

        // Verify that other methods are not called
        verifyNoInteractions(reservationStatusRepository, reservationRepository, emailService);
    }

    @Test
    void testAddReservationWithOwnerBeingRenter() throws UserDoesNotExistException, GameInstanceDoesNotExistException{
        // Mock dependencies
        Authentication authentication = any() /* create a mock Authentication */;
        NewReservationDTO newReservationDTO = ReservationTestUtils.createNewReservationDTO() /* create a mock NewReservationDTO */;
        when(userService.getUser(authentication)).thenReturn(UserTestUtils.createUser(Role.USER));
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(newReservationDTO.getGameInstanceUUID())).thenReturn(gameInstance);

        // Call the method being tested and expect a BadRequestException
        assertThrows(BadRequestException.class, () -> reservationService.addReservation(authentication, newReservationDTO));

    }

    @Test
    void testCheckIfOwnerIsNotRenter() {
        // Mock dependencies
        User renter = UserTestUtils.createUser(Role.USER);
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        gameInstance.setOwner(renter);

        // Call the method being tested
        assertThrows(BadRequestException.class, () -> reservationService.checkIfOwnerIsNotRenter(renter, gameInstance));
    }

    @Test
    void testCheckIfOwnerIsNotRenterWithDifferentUsers() {
        // Mock dependencies
        User renter =UserTestUtils.createUser(Role.USER);
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();

        // Call the method being tested
        assertDoesNotThrow(() -> reservationService.checkIfOwnerIsNotRenter(renter, gameInstance));
    }

    @Test
    void testCheckIfUserIsOwner() {
        // Mock dependencies
        User user = UserTestUtils.createUser(Role.USER);

        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        gameInstance.setOwner(user);

        // Call the method being tested
        assertTrue(reservationService.checkIfUserIsOwner(user, gameInstance));
    }

    @Test
    void testCheckIfUserIsNotOwner() {
        // Mock dependencies
        User user = UserTestUtils.createUser(Role.USER);
        User owner = UserTestUtils.createUserOwner(Role.USER);
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        gameInstance.setOwner(owner);

        // Call the method being tested
        assertFalse(reservationService.checkIfUserIsOwner(user, gameInstance));
    }

    @Test
    void testGetMyReservationsAsOwner() {
        // Mock dependencies
        User owner = UserTestUtils.createUserOwner(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(), status.getStatus())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, status, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsOwnerWithNoReservations() {
        // Mock dependencies
        User owner = UserTestUtils.createUserOwner(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response with an empty page
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(), status.getStatus())).thenReturn(emptyReservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, status, page, size);

        // Verify the results for an empty reservation page
        assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsOwnerWithDifferentStatus() {
        // Mock dependencies
        User owner = UserTestUtils.createUserOwner(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.CANCELED_BY_RENTER);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response with reservations of a different status
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(pageable, owner.getUuid(), status.getStatus())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, status, page, size);

        // Verify the results for reservations of a different status
        assertNotNull(resultsDTO);
        assertFalse(resultsDTO.getResults().isEmpty());
        assertEquals(1, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(1, resultsDTO.getPaginationInfo().getTotalPages());
    }


    @Test
    void testGetMyReservationsAsOwnerNoStatus() {
        // Mock dependencies
        User owner = UserTestUtils.createUserOwner(Role.USER);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByOwner(pageable, owner.getUuid())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsOwnerWithNoReservationsNoStatus() {
        // Mock dependencies
        User owner = UserTestUtils.createUserOwner(Role.USER);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response with an empty page
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByOwner(pageable, owner.getUuid())).thenReturn(emptyReservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsOwner(owner, page, size);

        // Verify the results for an empty reservation page
        assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenter() {
        // Mock dependencies
        User renter = UserTestUtils.createUser(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByRenterAndStatus(pageable, renter.getUuid(), status.getStatus())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, status, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenterWithNoReservations() {
        // Mock dependencies
        User renter = UserTestUtils.createUser(Role.USER);
        ReservationStatus status = ReservationStatusTestUtils.createReservationStatus(ReservationStatus.PENDING);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response with an empty page
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByRenterAndStatus(pageable, renter.getUuid(), status.getStatus())).thenReturn(emptyReservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, status, page, size);

        // Verify the results for an empty reservation page
        assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenterNoStatus() {
        // Mock dependencies
        User renter = UserTestUtils.createUser(Role.USER);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByRenter(pageable, renter.getUuid())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        assertEquals(1, resultsDTO.getResults().size());
        assertEquals(reservationPage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(reservationPage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetMyReservationsAsRenterWithNoReservationsNoStatus() {
        // Mock dependencies
        User renter = UserTestUtils.createUser(Role.USER);
        int page = 0;
        int size = 10;

        // Mock the reservation repository response with an empty page
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByRenter(pageable, renter.getUuid())).thenReturn(emptyReservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservationsAsRenter(renter, page, size);

        // Verify the results for an empty reservation page
        assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }


    @Test
    void testGetMyReservationsAsOwnerDTO() throws UserDoesNotExistException, BadRequestException {
        // Mock dependencies
        Authentication authentication = any() /* create a mock Authentication */;
        User user = UserTestUtils.createUserOwner(Role.USER);
        String status = "someStatus";
        Boolean asOwner = true;
        int page = 0;
        int size = 10;

        // Mock the user service response
        when(userService.getUser(authentication)).thenReturn(user);

        // Mock the reservation status repository response
        ReservationStatus reservationStatus = ReservationStatusTestUtils.createReservationStatus(status);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

        // Mock the call to getMyReservationsAsOwner
        //create mock page reservation
        PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(any(), any(),any())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        // Add more assertions based on your specific logic
    }

    @Test
    void testGetMyReservationsAsRenterDTO() throws UserDoesNotExistException, BadRequestException {
        // Mock dependencies
        Authentication authentication =any() /* create a mock Authentication */;
        User user = UserTestUtils.createUser(Role.USER);
        String status = "someStatus";
        Boolean asOwner = false;
        int page = 0;
        int size = 10;

        // Mock the user service response
        when(userService.getUser(authentication)).thenReturn(user);

        // Mock the reservation status repository response
        ReservationStatus reservationStatus = new ReservationStatus(/* create a mock ReservationStatus */);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

        // Mock the call to getMyReservationsAsRenter
        PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getReservationsByRenterAndStatus(any(), any(),any())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        // Add more assertions based on your specific logic
    }


    @Test
    void testGetMyReservationsAsRenterStatus() throws UserDoesNotExistException, BadRequestException {
        // Mock dependencies
        Authentication authentication =  any()/* create a mock Authentication */;
        User user = UserTestUtils.createUser(Role.USER);
        String status = "someStatus";
        Boolean asOwner = false;
        int page = 0;
        int size = 10;

        // Mock the user service response
        when(userService.getUser(authentication)).thenReturn(user);

        // Mock the reservation status repository response
        ReservationStatus reservationStatus = ReservationStatusTestUtils.createReservationStatus(status);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

        // Mock the call to getMyReservationsAsRenter
        PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getReservationsByRenterAndStatus(any(), any(),any())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        // Add more assertions based on your specific logic
    }

    @Test
    void testGetMyReservationsAsOwnerStatus() throws UserDoesNotExistException, BadRequestException {
        // Mock dependencies
        Authentication authentication = any()/* create a mock Authentication */;
        User user = UserTestUtils.createUserOwner(Role.USER);
        String status = "someStatus";
        Boolean asOwner = true;
        int page = 0;
        int size = 10;

        // Mock the user service response
        when(userService.getUser(authentication)).thenReturn(user);

        // Mock the reservation status repository response
        ReservationStatus reservationStatus = ReservationStatusTestUtils.createReservationStatus(status);
        when(reservationStatusRepository.findByStatus(status)).thenReturn(java.util.Optional.of(reservationStatus));

        // Mock the call to getMyReservationsAsOwner
        PageImpl<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(ReservationTestUtils.createReservation()));
        when(reservationRepository.getCurrentReservationsByOwnerAndStatus(any(), any(),any())).thenReturn(reservationPage);
        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getMyReservations(authentication, status, asOwner, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        // Add more assertions based on your specific logic
    }

    @Test
    void testGetReservationByUUID() throws BadRequestException {
        // Mock dependencies
        String uuid = "someUUID";

        // Mock the reservation repository response
        Reservation reservation = new Reservation(/* create a mock Reservation */);
        when(reservationRepository.getReservationByReservationId(uuid)).thenReturn(java.util.Optional.of(reservation));

        // Call the method being tested
        Reservation result = reservationService.getReservationByUUID(uuid);

        // Verify the results
        assertNotNull(result);
        // Add more assertions based on your specific logic
    }

    @Test
    void testGetReservationByUUIDNotFound() {
        // Mock dependencies
        String nonExistingUUID = "nonExistingUUID";

        // Mock the reservation repository response with an empty optional
        when(reservationRepository.getReservationByReservationId(nonExistingUUID)).thenReturn(java.util.Optional.empty());

        // Call the method being tested, expect BadRequestException due to non-existing reservation
        assertThrows(BadRequestException.class, () ->
                reservationService.getReservationByUUID(nonExistingUUID)
        );
    }

    @Test
    void testGetReservationsByGameInstance() throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
        // Mock dependencies
        Authentication authentication = any()/* create a mock Authentication */;
        String gameInstanceUuid = "someGameInstanceUUID";
        int page = 0;
        int size = 10;

        // Mock the game instance service response
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();

        when(gameInstanceService.getGameInstance(gameInstanceUuid)).thenReturn(gameInstance);

        // Mock the user service response
        User user = UserTestUtils.createUserOwner(Role.USER);
        when(userService.getUser(authentication)).thenReturn(user);
        gameInstance.setOwner(user);

        // Mock the checkIfUserIsOwner response


        // Mock the reservation repository response
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Reservation reservation = ReservationTestUtils.createReservation();
        Page<Reservation> reservationPage = new PageImpl<>(Collections.singletonList(reservation), pageable, 1L);
        when(reservationRepository.getReservationsByGameInstance_Uuid(any(),any())).thenReturn(reservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getReservationsByGameInstance(authentication, gameInstanceUuid, page, size);

        // Verify the results
        assertNotNull(resultsDTO);
        // Add more assertions based on your specific logic
    }

    @Test
    void testGetReservationsByGameInstanceUnauthorizedUser() throws GameInstanceDoesNotExistException, UserDoesNotExistException {
        // Mock dependencies
        Authentication authentication = any();
        String gameInstanceUuid = "someGameInstanceUUID";
        int page = 0;
        int size = 10;

        // Mock the game instance service response
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(gameInstanceUuid)).thenReturn(gameInstance);

        // Mock the user service response
        User user = UserTestUtils.createUser(Role.USER);
        when(userService.getUser(authentication)).thenReturn(user);



        // Call the method being tested, expect BadRequestException due to unauthorized user
        assertThrows(BadRequestException.class, () ->
                reservationService.getReservationsByGameInstance(authentication, gameInstanceUuid, page, size)
        );
    }

    @Test
    void testGetReservationsByGameInstanceWithNoReservations() throws GameInstanceDoesNotExistException, UserDoesNotExistException, BadRequestException {
        // Mock dependencies
        Authentication authentication = any();
        String gameInstanceUuid = "someGameInstanceUUID";
        int page = 0;
        int size = 10;

        // Mock the game instance service response
        GameInstance gameInstance = GameInstanceTestUtils.createGameInstance();
        when(gameInstanceService.getGameInstance(gameInstanceUuid)).thenReturn(gameInstance);

        // Mock the user service response
        User user = UserTestUtils.createUserOwner(Role.USER);
        when(userService.getUser(authentication)).thenReturn(user);
        gameInstance.setOwner(user);



        // Mock the reservation repository response with an empty page
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Reservation> emptyReservationPage = new PageImpl<>(Collections.emptyList(), pageable, 0L);
        when(reservationRepository.getReservationsByGameInstance_Uuid(pageable, gameInstanceUuid)).thenReturn(emptyReservationPage);

        // Call the method being tested
        ResultsDTO<ReservationDTO> resultsDTO = reservationService.getReservationsByGameInstance(authentication, gameInstanceUuid, page, size);

        // Verify the results for an empty reservation page
        assertNotNull(resultsDTO);
        assertTrue(resultsDTO.getResults().isEmpty());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(0, resultsDTO.getPaginationInfo().getTotalPages());
    }


    @Test
    void testChangeReservationStatusInvalidStatus() throws UserDoesNotExistException {
        // Mock dependencies
        Authentication authentication =any();
        String reservationId = "someReservationId";
        String status = "invalidStatus";

        // Mock the reservation repository response
        Reservation reservation = ReservationTestUtils.createReservation();
        when(reservationRepository.getReservationByReservationId(reservationId)).thenReturn(java.util.Optional.of(reservation));



        when(userService.getUser(any())).thenReturn(UserTestUtils.createUser(Role.USER));

        // Call the method being tested, expect BadRequestException due to invalid status
        assertThrows(BadRequestException.class, () ->
                reservationService.changeReservationStatus(authentication, reservationId, status)
        );
    }

    @Test
    void testCanChangeStatusAsOwner() throws UserDoesNotExistException {
        // Mock dependencies
        Authentication authentication =  any()/* create a mock Authentication */;
        Reservation reservation = ReservationTestUtils.createReservation();
        User owner = UserTestUtils.createUserOwner(Role.USER);
        when(userService.getUser(authentication)).thenReturn(owner);
        reservation.getGameInstance().setOwner(owner);

        // Call the method being tested
        boolean result = reservationService.canChangeStatus(authentication, reservation);

        // Verify the result is true since the user is the owner
        assertTrue(result);
    }

    @Test
    void testCanChangeStatusAsRenter() throws UserDoesNotExistException {
        // Mock dependencies
        Authentication authentication =any() /* create a mock Authentication */;
        Reservation reservation = ReservationTestUtils.createReservation();
        User renter = UserTestUtils.createUser(Role.USER);
        reservation.setRenter(renter);
        when(userService.getUser(authentication)).thenReturn(renter);

        // Call the method being tested
        boolean result = reservationService.canChangeStatus(authentication, reservation);

        // Verify the result is true since the user is the renter
        assertTrue(result);
    }

    @Test
    void testCannotChangeStatus() throws UserDoesNotExistException {
        // Mock dependencies
        Authentication authentication =any() /* create a mock Authentication */;
        Reservation reservation = ReservationTestUtils.createReservation();
        User anotherUser = UserTestUtils.createUser(Role.USER);
        when(userService.getUser(authentication)).thenReturn(anotherUser);

        // Call the method being tested
        boolean result = reservationService.canChangeStatus(authentication, reservation);

        // Verify the result is false since the user is neither the owner nor renter
        assertFalse(result);
    }

    @Test
    void testGetReservationOwnerDetailsWithRenterOpinion() {
        // Mock dependencies
        Reservation reservation = ReservationTestUtils.createReservation();
        User renter = UserTestUtils.createUser(Role.USER);
        User owner = UserTestUtils.createUserOwner(Role.USER);
        reservation.getGameInstance().setOwner(owner);
        reservation.setRenter(renter);
        UserOpinion renterOpinion = UserOpinionTestUtils.createOpinionFromRenter(renter,owner);
        when(userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter)).thenReturn(Collections.singletonList(renterOpinion));

        // Call the method being tested
        ReservationDetailDTO result = reservationService.getReservationOwnerDetails(reservation);

        // Verify the results
        assertNotNull(result);
        assertNotNull(result.getRenterOpinion());
        assertFalse(result.isCanAddRenterOpinion());
    }

    @Test
    void testGetReservationOwnerDetailsWithoutRenterOpinion() {
        // Mock dependencies
        Reservation reservation = ReservationTestUtils.createReservation();
        User renter = UserTestUtils.createUser(Role.USER);
        reservation.setRenter(renter);
        when(userOpinionRepository.getUserOpinionsByReservationAndRatedUser(reservation, renter)).thenReturn(Collections.emptyList());

        // Call the method being tested
        ReservationDetailDTO result = reservationService.getReservationOwnerDetails(reservation);

        // Verify the results
        assertNotNull(result);
        assertNull(result.getRenterOpinion());
        assertTrue(result.isCanAddRenterOpinion());
    }




}
