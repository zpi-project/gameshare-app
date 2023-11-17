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
import com.zpi.backend.game_instance_image.GameInstanceImageRepository;
import com.zpi.backend.reservations.Reservation;
import com.zpi.backend.reservations.ReservationRepository;
import com.zpi.backend.user.User;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user.UserService;
import com.zpi.backend.utils.DateUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class GameInstanceService {
    GameInstanceRepository gameInstanceRepository;
    GameInstanceImageRepository gameInstanceImageRepository;
    UserService userService;
    GameService gameService;
    CategoryService categoryService;
    ReservationRepository reservationRepository;

    public GameInstanceDTO addGameInstance(NewGameInstanceDTO newGameInstanceDTO, Authentication authentication) throws UserDoesNotExistException, GameDoesNotExistException, BadRequestException {
        newGameInstanceDTO.validate();
        User user = userService.getUser(authentication);
        Game game = gameService.getGame(newGameInstanceDTO.getGameId());
        GameInstance newGameInstance = new GameInstance(newGameInstanceDTO, game, user);
        gameInstanceRepository.save(newGameInstance);
        return new GameInstanceDTO(newGameInstance);
    }

    public GameInstanceDTO updateGameInstance(String uuid, UpdatedGameInstanceDTO updatedGameInstanceDTO, Authentication authentication) throws GameInstanceDoesNotExistException, BadRequestException {
        updatedGameInstanceDTO.validate();
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(uuid, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+uuid+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        gameInstance.setDescription(updatedGameInstanceDTO.getDescription());
        gameInstance.setPricePerDay(updatedGameInstanceDTO.getPricePerDay());
        gameInstanceRepository.save(gameInstance);
        return new GameInstanceDTO(gameInstance);
    }

    //TODO Implementation of checking reservation, what about status?
    public void deleteGameInstance(String uuid, String googleId) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(uuid, googleId);
        //TODO Check if there is no reservation with status in progress or smth
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+uuid+") does not exists or the User is not the Owner.");
        gameInstanceRepository.delete(gameInstanceOptional.get());
    }

    public void activate(String gameInstanceUUID, String googleId) throws GameInstanceDoesNotExistException, GameInstanceStatusException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        if (gameInstance.isActive())
            throw new GameInstanceStatusException("The Game Instance (uuid = "+gameInstanceUUID+") has already been activated");
        gameInstance.setActive(true);
        gameInstanceRepository.save(gameInstance);
    }

    public void deactivate(String gameInstanceUUID, String googleId) throws GameInstanceDoesNotExistException, GameInstanceStatusException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository.findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("The Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        GameInstance gameInstance = gameInstanceOptional.get();
        if (!gameInstance.isActive())
            throw new GameInstanceStatusException("The Game Instance (uuid = "+gameInstanceUUID+") has already been deactivated");
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

    public ResultsDTO<GameInstanceDTO> getUserGameInstances(String userUUID, Optional<String> searchName, int size, int page, boolean allGameInstances)
            throws UserDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        userService.getUserByUUID(userUUID);
        Page<GameInstance> gameInstancesPage;
        if (searchName.isEmpty())
            gameInstancesPage = gameInstanceRepository.findByOwnerUuid(userUUID, pageable);
        else
            gameInstancesPage = gameInstanceRepository.findByOwnerUuidAndGameNameContainingIgnoreCase(
                    userUUID, searchName.get(), pageable);
        List<GameInstanceDTO> resultsList = new ArrayList<>();
        gameInstancesPage.stream().toList()
                .forEach(gameInstance -> resultsList.add(new GameInstanceDTO(gameInstance)));
        return new ResultsDTO<>(resultsList,
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }

    // TODO Return all game instances (also not active) for logged in user.
    public ResultsDTO<GameInstanceDTO> getMyGameInstances(Optional<String> searchName, int size, int page, Authentication authentication) throws UserDoesNotExistException {
        User user = userService.getUser(authentication);
        return getUserGameInstances(user.getUuid(),searchName, size, page, true);
    }

    public ResultsDTO<SearchGameInstanceDTO> getGameInstances(Authentication authentication, int size, int page, Optional<String> searchName, Optional<Long> categoryId, Optional<Integer> age,
                                                              Optional<Integer> playersNumber, Optional<Integer> maxPricePerDay, Optional<String> userUUID, double latitude,
                                                              double longitude) throws CategoryDoesNotExistException {
        Pageable pageable = PageRequest.of(page, size);
        Category category = null;
        boolean isGuest = authentication == null || !authentication.isAuthenticated();
        if (categoryId.isPresent())
            category = categoryService.getCategory(categoryId.get());
        GameInstanceSearch gameInstanceSearch = new GameInstanceSearch(
                searchName.orElse(null), category,
                age.orElse(null), playersNumber.orElse(null),
                maxPricePerDay.orElse(null), userUUID.orElse(null), latitude, longitude
        );
        Specification<GameInstance> spec = new GameInstanceSpecification(gameInstanceSearch);
        Page<GameInstance> gameInstancesPage = gameInstanceRepository.findAll(spec, pageable);
        List<SearchGameInstanceDTO> resultList = new ArrayList<>();
        gameInstancesPage
                .forEach(gameInstance -> {
                    resultList.add(new SearchGameInstanceDTO(gameInstance, isGuest));
                });
        return new ResultsDTO<>(resultList,
                new Pagination(gameInstancesPage.getTotalElements(), gameInstancesPage.getTotalPages()));
    }


    public void updateAvgRating(long gameInstanceId){
        gameInstanceRepository.updateAvgRating(gameInstanceId);
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

    public boolean matchesUnAvaliabilityCriteria(int year,int month,Reservation reservation){
        return DateUtils.getYear(reservation.getStartDate())==year && DateUtils.getMonth(reservation.getStartDate())==month;
    }



// nawet nie proponuj robienia tego kwerendą
    public List<GameInstanceUnAvailabilityDTO> getUnAvaliability(List<Reservation> reservationList,int year,int month,Boolean withReservations){
        List<GameInstanceUnAvailabilityDTO> periods = new ArrayList<>();
       for(Reservation reservation:reservationList){
           if(matchesUnAvaliabilityCriteria(year,month,reservation)){
               Date startDate = reservation.getStartDate();
               Date endDate = reservation.getEndDate();
               if(reservation.getEndDate().getMonth()+1!=month){
                   Calendar calendar = Calendar.getInstance();
                   calendar.setTime(startDate);
                   int lastDay = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                   calendar.set(Calendar.DAY_OF_MONTH, lastDay);
                   endDate = calendar.getTime();
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
        List<Reservation> reservations= reservationRepository.findReservationsByGameInstance_Uuid(uuid);
        return getUnAvaliability(reservations,Integer.parseInt(year),Integer.parseInt(month),withReservations);
    }

    public boolean isOwner(User user,GameInstance gameInstance){
        return gameInstance.getOwner().equals(user);
    }
    public List<GameInstanceUnAvailabilityDTO> getGameInstanceAvailabilityReservation(Authentication authentication, String uuid, String year, String month) throws UserDoesNotExistException, GameInstanceDoesNotExistException {
        List<Reservation> reservations= reservationRepository.findReservationsByGameInstance_Uuid(uuid);
        User user = userService.getUser(authentication);
        GameInstance gameinstance =gameInstanceRepository.findByUuid(uuid).orElseThrow(()->new GameInstanceDoesNotExistException("Game instance with uuid "+uuid+" does not exist"));

        if(!isOwner(user,gameinstance))
            throw new UserDoesNotExistException("User with googleId "+user.getGoogleId()+" is not owner of game instance with uuid "+uuid);
        return  getUnAvaliability(reservations,Integer.parseInt(year),Integer.parseInt(month),true);
    }
}
