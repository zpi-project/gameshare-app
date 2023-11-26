package com.zpi.backend.game_instance;

import com.zpi.backend.category.Category;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.dto.Pagination;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game.GameService;
import com.zpi.backend.game_instance.dto.*;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.exception.GameInstanceStatusException;
import com.zpi.backend.game_instance.specification.*;
import com.zpi.backend.image.game_instance_image.GameInstanceImageRepository;
import com.zpi.backend.image.game_instance_image.GameInstanceImageService;
import com.zpi.backend.reservation_status.ReservationStatus;
import com.zpi.backend.reservation_status.ReservationStatusRepository;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.reservations.ReservationRepository;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;


import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.zpi.backend.reservation_status.ReservationStatus.*;

@Service
@AllArgsConstructor
public class GameInstanceService {
    GameInstanceRepository gameInstanceRepository;
    GameInstanceImageRepository gameInstanceImageRepository;
    GameInstanceImageService gameInstanceImageService;
    UserService userService;
    GameService gameService;
    CategoryService categoryService;
    ReservationRepository reservationRepository;
    ReservationStatusRepository reservationStatusRepository;

    public GameInstanceDTO addGameInstance(NewGameInstanceDTO newGameInstanceDTO, Authentication authentication) throws UserDoesNotExistException, GameDoesNotExistException, BadRequestException {
        newGameInstanceDTO.validate();
        User user = userService.getUser(authentication);
        Game game = gameService.getGame(newGameInstanceDTO.getGameId());
        GameInstance newGameInstance = new GameInstance(newGameInstanceDTO, game, user);
        gameInstanceRepository.save(newGameInstance);
        return new GameInstanceDTO(newGameInstance);
    }

    public GameInstanceDTO updateGameInstance(String uuid, UpdatedGameInstanceDTO updatedGameInstanceDTO, Authentication authentication) throws GameInstanceDoesNotExistException, BadRequestException, UserDoesNotExistException {
        updatedGameInstanceDTO.validate();
        User user = userService.getUser(authentication);
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner(uuid, user);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+uuid+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        gameInstance.setDescription(updatedGameInstanceDTO.getDescription());
        gameInstance.setPricePerDay(updatedGameInstanceDTO.getPricePerDay());
        gameInstanceRepository.save(gameInstance);
        return new GameInstanceDTO(gameInstance);
    }

    public void activate(String gameInstanceUUID, Authentication authentication) throws GameInstanceDoesNotExistException, GameInstanceStatusException, UserDoesNotExistException {
        User user = userService.getUser(authentication);
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner(gameInstanceUUID, user);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        if (gameInstance.isActive())
            throw new GameInstanceStatusException("The Game Instance (uuid = "+gameInstanceUUID+") has already been activated");
        gameInstance.setActive(true);
        gameInstanceRepository.save(gameInstance);
    }

    // TODO Implementation of considering future reservation
    public void deactivate(String gameInstanceUUID, Authentication authentication) throws GameInstanceDoesNotExistException, GameInstanceStatusException, UserDoesNotExistException {
        User user = userService.getUser(authentication);
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner(gameInstanceUUID, user);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        if (!gameInstance.isActive())
            throw new GameInstanceStatusException("The Game Instance (uuid = "+gameInstanceUUID+") has already been deactivated");
//        Setting all future reservations as CANCELED BY OWNER
        reservationRepository.setReservationStatusAsCanceledByOwnerForGameInstance(gameInstance);
        gameInstance.setActive(false);
        gameInstanceRepository.save(gameInstance);
    }

    public GameInstanceDetailsDTO getGameInstance(String uuid, Authentication authentication) throws GameInstanceDoesNotExistException {
        boolean isGuest = authentication == null || !authentication.isAuthenticated();
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuid(uuid);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+uuid+") does not exists ");
        return new GameInstanceDetailsDTO(gameInstanceOptional.get(), isGuest);
    }

    public GameInstance getGameInstance(String uuid) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuid(uuid);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+uuid+") does not exists ");
        return gameInstanceOptional.get();
    }

    public ResultsDTO<GameInstanceDTO> getUserGameInstances(String userUUID, Optional<String> searchName, int size, int page, Boolean onlyActive)
            throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        userService.getUserByUUID(userUUID);
        GameInstanceUserSearch gameInstanceUserSearch = new GameInstanceUserSearch(searchName.orElse(null), userUUID, onlyActive);
        GameInstanceUserSpecification gameInstanceUserSpecification = new GameInstanceUserSpecification(gameInstanceUserSearch);
        Page<GameInstance> gameInstancesPage = gameInstanceRepository.findAll(gameInstanceUserSpecification, pageable);
        List<GameInstanceDTO> resultsList = new ArrayList<>();
        gameInstancesPage.stream().toList()
                .forEach(gameInstance -> resultsList.add(new GameInstanceDTO(gameInstance)));
        return new ResultsDTO<>(resultsList,
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }

    public ResultsDTO<GameInstanceDTO> getMyGameInstances(Optional<String> searchName, int size, int page, Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return getUserGameInstances(user.getUuid(),searchName, size, page, null);
    }

    public ResultsDTO<SearchGameInstanceDTO> getGameInstances(Authentication authentication, int size, int page, Optional<String> searchName, Optional<Long> categoryId, Optional<Integer> age,
                                                              Optional<Integer> playersNumber, Optional<Integer> maxPricePerDay, Optional<String> userUUID, double latitude,
                                                              double longitude) throws CategoryDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        Category category = null;
        boolean isGuest = authentication == null || !authentication.isAuthenticated();
        String loggedInUserUUID = null;
        try {
            if (authentication != null) {
                User loggedInUser = userService.getUser(authentication);
                loggedInUserUUID = loggedInUser.getUuid();
            }
        } catch (UserDoesNotExistException ex){
            // ignore
        }
        if (categoryId.isPresent())
            category = categoryService.getCategory(categoryId.get());
        GameInstanceSearch gameInstanceSearch = new GameInstanceSearch(
                searchName.orElse(null), category,
                age.orElse(null), playersNumber.orElse(null),
                maxPricePerDay.orElse(null), userUUID.orElse(null), latitude, longitude,
                loggedInUserUUID
        );
        Specification<GameInstance> spec = new GameInstanceSpecification(gameInstanceSearch);
        Page<GameInstance> gameInstancesPage = gameInstanceRepository.findAll(spec, pageable);
        List<SearchGameInstanceDTO> resultList = new ArrayList<>();
        gameInstancesPage
                .forEach(gameInstance -> resultList.add(new SearchGameInstanceDTO(gameInstance, isGuest)));
        return new ResultsDTO<>(resultList,
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }


    public void updateAvgRatingAndOpinionsAmount(long gameInstanceId){
        gameInstanceRepository.updateAvgRatingAndOpinionsAmount(gameInstanceId);
    }

    public ResultsDTO<GameInstanceDetailsDTO> getGameInstancesToOpinions(long gameId, double latitude, double longitude,
                                                                               int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        GameInstanceOpinionSearch gameInstanceOpinionSearch = new GameInstanceOpinionSearch(gameId, latitude, longitude);
        Specification<GameInstance> spec = new GameInstanceOpinionsSpecification(gameInstanceOpinionSearch);
        Page<GameInstance> gameInstancePage = gameInstanceRepository.findAll(spec, pageable);
        List<GameInstanceDetailsDTO> gameInstanceDetailsDTOList = new ArrayList<>();
        gameInstancePage
                .forEach(gameInstance -> gameInstanceDetailsDTOList.add(new GameInstanceDetailsDTO(gameInstance, true)));
        return new ResultsDTO<>(gameInstanceDetailsDTOList,
                new Pagination(gameInstancePage.getTotalElements(), gameInstancePage.getTotalPages()));
    }

    public boolean matchesUnAvailabilityCriteria(int year, int month, Reservation reservation){
        if (reservation.getStartDate().getYear()+1900 > year || reservation.getEndDate().getYear()+1900 < year)
            return false;
        if( reservation.getStartDate().getMonth() + 1 > month && reservation.getEndDate().getMonth() + 1< month)
            return true;
        return reservation.getStatus().getStatus().equals(ACCEPTED_BY_OWNER) || reservation.getStatus().getStatus().equals(RENTED);
    }




// nawet nie proponuj robienia tego kwerendą
    public List<GameInstanceUnAvailabilityDTO> getUnAvailability(List<Reservation> reservationList, int year, int month, Boolean withReservations){
        List<GameInstanceUnAvailabilityDTO> periods = new ArrayList<>();
       for(Reservation reservation:reservationList){
           if(matchesUnAvailabilityCriteria(year,month,reservation)){
               Date startDate = reservation.getStartDate();
               Date endDate = reservation.getEndDate();

               if(reservation.getEndDate().getMonth()+1!=month|| reservation.getStartDate().getMonth()+1 !=month){
                   if(reservation.getEndDate().getMonth()+1!=month&& reservation.getStartDate().getMonth()+1 ==month){
                       Calendar calendar = Calendar.getInstance();
                       calendar.setTime(startDate);
                       int lastDay = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                       calendar.set(Calendar.DAY_OF_MONTH, lastDay);
                       endDate = calendar.getTime();
                   }
                   else if(reservation.getEndDate().getMonth()+1!=month&& reservation.getStartDate().getMonth()+1 !=month){
                       Date today = new Date();
                       Calendar calendar = Calendar.getInstance();
                       calendar.setTime(today);

                       calendar.set(Calendar.MONTH, month-1);

                       calendar.set(Calendar.DAY_OF_MONTH, 1);
                       Date firstDayOfMonth = calendar.getTime();

                       calendar.add(Calendar.MONTH, 1);
                       calendar.add(Calendar.DAY_OF_MONTH, -1);
                       Date lastDayOfMonth = calendar.getTime();

                       startDate = firstDayOfMonth;
                       endDate = lastDayOfMonth;
                   }
                   else {
                       Date today = new Date();
                       Calendar calendar = Calendar.getInstance();
                       calendar.setTime(today);

                       calendar.set(Calendar.MONTH, month-1);

                       calendar.set(Calendar.DAY_OF_MONTH, 1);
                       startDate = calendar.getTime();
                   }
               }
               if (withReservations){
                   periods.add(new GameInstanceUnAvailabilityReservationDTO(startDate,endDate,reservation.getReservationId()));
               }
               else {
                     periods.add(new GameInstanceUnAvailabilityDTO(startDate,endDate));
               }
           }
       }
       return periods;
    }


    public List<GameInstanceUnAvailabilityDTO> getGameInstanceAvailability(String uuid, String year, String month,Boolean withReservations) {
        List<Reservation> reservations= reservationRepository.findAcceptedOrRentedReservationsByGameInstance(uuid);
        return getUnAvailability(reservations,Integer.parseInt(year),Integer.parseInt(month),withReservations);
    }

    public boolean isOwner(User user,GameInstance gameInstance){
        return gameInstance.getOwner().equals(user);
    }
    public List<GameInstanceUnAvailabilityDTO> getGameInstanceAvailabilityReservation(Authentication authentication, String uuid, String year, String month) throws UserDoesNotExistException, GameInstanceDoesNotExistException {
        List<Reservation> reservations= reservationRepository.findAcceptedOrRentedReservationsByGameInstance(uuid);
        User user = userService.getUser(authentication);
        GameInstance gameinstance =gameInstanceRepository.findByUuid(uuid).orElseThrow(()->new GameInstanceDoesNotExistException("Game instance with uuid "+uuid+" does not exist"));

        if(!isOwner(user,gameinstance))
            throw new UserDoesNotExistException("User is not an owner of game instance with uuid "+uuid);
        return  getUnAvailability(reservations,Integer.parseInt(year),Integer.parseInt(month),true);
    }

    public Boolean canMakeReservation(String uuid, Date startDate, Date endDate) {
        List<Reservation> reservations = reservationRepository.findAcceptedOrRentedReservationsByGameInstance(uuid);
        for (Reservation reservation : reservations) {
            if (reservation.getStartDate().before(endDate) && reservation.getEndDate().after(startDate))
                return false;
        }
        return true;
    }

    public Boolean hasFutureReservations(Authentication authentication, String gameInstanceUUID)
            throws GameInstanceDoesNotExistException, UserDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuid(gameInstanceUUID);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game instance (ID: "+gameInstanceUUID+") does not exist.");
        User user = userService.getUser(authentication);
        if (user != gameInstanceOptional.get().getOwner())
            throw new IllegalAccessError("User is not the Owner of the Game Instance");
        List<ReservationStatus> statuses = reservationStatusRepository.findAllByStatusIn(Arrays.asList(ACCEPTED_BY_OWNER, PENDING));
        List<Reservation> reservations = reservationRepository.getReservationsByGameInstanceAndStatusIn(gameInstanceOptional.get(), statuses);
        return !reservations.isEmpty();
    }
}
