package com.zpi.backend.games_tests;

import com.zpi.backend.category.CategoryRepository;
import com.zpi.backend.category.CategoryService;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.dto.ResultsDTO;
import com.zpi.backend.email.EmailService;
import com.zpi.backend.email_type.EmailType;
import com.zpi.backend.email_type.EmailTypeService;
import com.zpi.backend.email_type.exceptions.EmailTypeDoesNotExists;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.GameRepository;
import com.zpi.backend.game.GameService;
import com.zpi.backend.game.dto.GameDTO;
import com.zpi.backend.game.dto.NewGameDTO;
import com.zpi.backend.game.exception.GameAlreadyAcceptedException;
import com.zpi.backend.game.exception.GameAlreadyExistsException;
import com.zpi.backend.game.exception.GameAlreadyRejectedException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game_status.GameStatus;
import com.zpi.backend.game_status.GameStatusService;
import com.zpi.backend.languages.LanguageCodes;
import com.zpi.backend.role.Role;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.test_utils.*;
import com.zpi.backend.user.UserService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.zpi.backend.game_status.GameStatus.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
class GameServiceTests {

    @Mock
    private GameRepository gameRepository;

    @InjectMocks
    private GameService gameService;

    @Mock
    private RoleService roleService;

    @Mock
    private UserService userService;

    @Mock
    private CategoryService categoryService;

    @Mock
    private GameStatusService gameStatusService;

    @Mock
    private EmailService emailService;

    @Mock
    private EmailTypeService emailTypeService;



    @Test
    void testGetGameWhenGameExistsAndIsAccepted() throws GameDoesNotExistException {
        
        long gameId = 1L;

        Game acceptedGame = GameTestsUtils.createGame(ACCEPTED);  
        acceptedGame.setId(gameId);
        when(gameRepository.findByIdAndAccepted(anyLong())).thenReturn(Optional.of(acceptedGame));

        
        Game result = gameService.getGame(gameId);

        
        assertEquals(gameId, result.getId());
    }

    @Test
    void testGetGameWhenGameDoesNotExist() {
        
        long gameId = 1L;
        when(gameRepository.findByIdAndAccepted(anyLong())).thenReturn(Optional.empty());

        
        assertThrows(GameDoesNotExistException.class, () -> gameService.getGame(gameId));
    }

    @Test
    void testGetGameWhenGameIsNotAccepted() {
        
        long gameId = 1L;
        Game nonAcceptedGame = GameTestsUtils.createGame(REJECTED);  
        nonAcceptedGame.setId(gameId);
        when(gameRepository.findByIdAndAccepted(anyLong())).thenReturn(Optional.of(nonAcceptedGame));

        
        assertThrows(GameDoesNotExistException.class, () -> gameService.getGame(gameId));
    }

    @Test
    @Transactional
    void testAddGameWhenUserRoleIsUser() throws  UserDoesNotExistException, CategoryDoesNotExistException, IOException, EmailTypeDoesNotExists, GameAlreadyExistsException, BadRequestException {
        
        ArrayList<Long> categoriesIDs = new ArrayList<>();
        categoriesIDs.add(1L);
        categoriesIDs.add(2L);
        categoriesIDs.add(3L);
        NewGameDTO newGameDTO = GameTestsUtils.createNewGameDTO(categoriesIDs);

        when(gameRepository.existsGameByName(anyString())).thenReturn(false);
        when(userService.getUser(any())).thenReturn(UserTestUtils.createUser(Role.USER));
        when(categoryService.getCategoriesByIDs(any())).thenReturn(CategoryTestUtils.createCategories());
        when(gameStatusService.getGameStatus(any())).thenReturn(GameStatusTestUtils.createGameStatus(GameStatus.PENDING));
        when(emailService.getNewGameEmailContext(anyString())).thenReturn(EmailTestUtils.createContext());
        when(emailTypeService.findEmailTypeByStatus(anyString())).thenReturn(EmailTypeTestUtils.createEmailType(EmailType.NEW_GAME));
        when(gameRepository.save(any())).thenReturn(GameTestsUtils.createGame(newGameDTO, CategoryTestUtils.createCategories()));
        
        GameDTO result = gameService.addGame(newGameDTO, null);

        
        assertEquals(newGameDTO.getName(), result.getName());
        assertEquals(newGameDTO.getAge(), result.getAge());
        assertEquals(newGameDTO.getMaxPlayers(), result.getMaxPlayers());
        assertEquals(newGameDTO.getMinPlayers(), result.getMinPlayers());
        assertEquals(newGameDTO.getPlayingTime(), result.getPlayingTime());
        assertEquals(newGameDTO.getShortDescription(), result.getShortDescription());
        assertEquals(newGameDTO.getCategoriesIDs().size(), result.getCategories().size());
        assertEquals(newGameDTO.getCategoriesIDs().get(0), result.getCategories().get(0).getId());
        assertEquals(newGameDTO.getCategoriesIDs().get(1), result.getCategories().get(1).getId());
        assertEquals(1L, result.getId());

    }

    @Test
    void testAddGameWhenUserRoleIsAdmin() throws GameAlreadyExistsException, BadRequestException, CategoryDoesNotExistException, IOException, EmailTypeDoesNotExists, UserDoesNotExistException {
        
        ArrayList<Long> categoriesIDs = new ArrayList<>();
        categoriesIDs.add(1L);
        categoriesIDs.add(2L);
        NewGameDTO newGameDTO = GameTestsUtils.createNewGameDTO(categoriesIDs);

        Authentication authentication = null;
        when(gameRepository.existsGameByName(anyString())).thenReturn(false);
        when(userService.getUser(any())).thenReturn(UserTestUtils.createUser(Role.ADMIN));
        when(categoryService.getCategoriesByIDs(any())).thenReturn(CategoryTestUtils.createCategories());
        when(gameStatusService.getGameStatus(any())).thenReturn(GameStatusTestUtils.createGameStatus(ACCEPTED));
        when(gameRepository.save(any())).thenReturn(GameTestsUtils.createGame(newGameDTO, CategoryTestUtils.createCategories()));


        
        GameDTO result = gameService.addGame(newGameDTO, authentication);


        assertEquals(newGameDTO.getName(), result.getName());
        assertEquals(newGameDTO.getAge(), result.getAge());
        assertEquals(newGameDTO.getMaxPlayers(), result.getMaxPlayers());
        assertEquals(newGameDTO.getMinPlayers(), result.getMinPlayers());
        assertEquals(newGameDTO.getPlayingTime(), result.getPlayingTime());
        assertEquals(newGameDTO.getShortDescription(), result.getShortDescription());


    }

    @Test
    void testGetGameDTOValidLanguage() throws GameDoesNotExistException, BadRequestException {
        
        long gameId = 1L;
        String language = LanguageCodes.ENGLISH;
        when(gameRepository.findByIdAndAccepted(any(Long.class))).thenReturn(java.util.Optional.of(GameTestsUtils.createGame(ACCEPTED)));

        
        GameDTO result = gameService.getGameDTO(gameId, language);

        
        assertEquals(gameId, result.getId());
    }

    @Test
    void testGetGameDTOInvalidLanguage() {
        
        long gameId = 1L;
        String language = "InvalidLanguage";

        
        assertThrows(BadRequestException.class, () -> gameService.getGameDTO(gameId, language));
    }


    @Test
    void testGetGamesWithEmptySearchAndEmptyCategories() throws BadRequestException {
        
        int page = 0;
        int size = 10;
        Optional<String> search = Optional.empty();
        Optional<List<Integer>> categoriesIds = Optional.empty();
        String language = LanguageCodes.ENGLISH;


        ArrayList<Game> games = GameTestsUtils.createGames(ACCEPTED);
        Page<Game> gamePage = new PageImpl<>(games);

        when(gameRepository.getAllAccepted(any(Pageable.class))).thenReturn(gamePage);

        
        ResultsDTO<GameDTO> result = gameService.getGames(page, size, search, categoriesIds, language);

        
        assertNotNull(result);
        assertEquals(result.getResults().size(), games.size());
    }

    @Test
    void testGetGamesWithInvalidLanguage() {
        
        int page = 0;
        int size = 10;
        Optional<String> search = Optional.empty();
        Optional<List<Integer>> categoriesIds = Optional.empty();
        String language = "INVALID_LANGUAGE";

        
        assertThrows(BadRequestException.class, () ->
                gameService.getGames(page, size, search, categoriesIds, language));
    }

    @Test
    void testGetPopularGamesWithEnglishLanguage() throws BadRequestException {
        
        Pageable pageable = PageRequest.of(0, 10);
        List<Game> games = GameTestsUtils.createGames(ACCEPTED);
        Page<Game> gamePage = new PageImpl<>(games, pageable, games.size());
        when(gameRepository.getPopularAcceptedGames(pageable)).thenReturn(gamePage);

        
        ResultsDTO<GameDTO> resultsDTO = gameService.getPopularGames(0, 10, LanguageCodes.ENGLISH);

        
        assertEquals(games.size(), resultsDTO.getResults().size());
        assertEquals(gamePage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(gamePage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetPopularGamesWithPolishLanguage() throws BadRequestException {
        
        Pageable pageable = PageRequest.of(0, 10);
        List<Game> games = GameTestsUtils.createGames(ACCEPTED);
        Page<Game> gamePage = new PageImpl<>(games, pageable, games.size());
        when(gameRepository.getPopularAcceptedGames(pageable)).thenReturn(gamePage);

        
        ResultsDTO<GameDTO> resultsDTO = gameService.getPopularGames(0, 10, LanguageCodes.POLISH);

        
        assertEquals(games.size(), resultsDTO.getResults().size());
        assertEquals(gamePage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(gamePage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetPopularGamesWithInvalidLanguage() {
        assertThrows(BadRequestException.class, () -> gameService.getPopularGames(0, 10, "InvalidLanguage"));
    }

    @Test
    void testRejectGameSuccessfully() throws UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);
        GameStatus gamestatus  = GameStatusTestUtils.createGameStatus(REJECTED);

        Game existingGame = GameTestsUtils.createGame(ACCEPTED);
        when(gameRepository.findGameById(gameId)).thenReturn(Optional.of(existingGame));
        when(gameStatusService.getGameStatus(REJECTED)).thenReturn(gamestatus);

        
        assertDoesNotThrow(() -> gameService.rejectGame(authentication, gameId));

        
        assertEquals(REJECTED, existingGame.getGameStatus().getStatus());
        verify(gameRepository).save(existingGame);
    }

    @Test
    void testRejectGameWithNonAdminUser() throws UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(false);

        
        assertThrows(IllegalAccessException.class, () -> gameService.rejectGame(authentication, gameId));

        
        verifyNoInteractions(gameRepository, gameStatusService);
    }

    @Test
    void testRejectGameWithAlreadyRejectedGame() throws UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        
        Game rejectedGame = GameTestsUtils.createGame(REJECTED);
        when(gameRepository.findGameById(gameId)).thenReturn(Optional.of(rejectedGame));

        
        assertThrows(GameAlreadyRejectedException.class, () -> gameService.rejectGame(authentication, gameId));

        
        verifyNoInteractions(gameStatusService);
    }

    @Test
    void testRejectGameWithNonexistentGame() throws UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        
        when(gameRepository.findGameById(gameId)).thenReturn(Optional.empty());

        
        assertThrows(GameDoesNotExistException.class, () -> gameService.rejectGame(authentication, gameId));

        
        verifyNoInteractions(gameStatusService);
    }

    @Test
    void testAcceptGameSuccessfully() throws  UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        Game existingGame = GameTestsUtils.createGame(PENDING);
        GameStatus gameStatus = GameStatusTestUtils.createGameStatus(ACCEPTED);
                /* create an existing game with status other than ACCEPTED */;
        when(gameRepository.findGameById(gameId)).thenReturn(Optional.of(existingGame));
        when(gameStatusService.getGameStatus(ACCEPTED)).thenReturn(gameStatus);

        
        assertDoesNotThrow(() -> gameService.acceptGame(authentication, gameId));

        
        assertEquals(ACCEPTED, existingGame.getGameStatus().getStatus());
        verify(gameRepository).save(existingGame);
    }

    @Test
    void testAcceptGameWithNonAdminUser() throws UserDoesNotExistException {
        
        Authentication authentication = any();
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(false);

        
        assertThrows(IllegalAccessException.class, () -> gameService.acceptGame(authentication, gameId));

        
        verifyNoInteractions(gameRepository, gameStatusService);
    }

    @Test
    void testAcceptGameWithAlreadyAcceptedGame() throws UserDoesNotExistException {
        
        Authentication authentication =any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        
        Game acceptedGame = GameTestsUtils.createGame(ACCEPTED);
        when(gameRepository.findGameById(gameId)).thenReturn(Optional.of(acceptedGame));

        
        assertThrows(GameAlreadyAcceptedException.class, () -> gameService.acceptGame(authentication, gameId));

        
        verifyNoInteractions(gameStatusService);
    }

    @Test
    void testAcceptGameWithNonexistentGame() throws UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication */;
        long gameId = 1L;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        
        when(gameRepository.findGameById(gameId)).thenReturn(Optional.empty());

        
        assertThrows(GameDoesNotExistException.class, () -> gameService.acceptGame(authentication, gameId));

        
        verifyNoInteractions(gameStatusService);
    }


    @Test
    void testGetGamesToAcceptWithAdminUserAndEnglishLanguage() throws UserDoesNotExistException, IllegalAccessException, BadRequestException {
        
        Authentication authentication = any();
        int page = 0;
        int size = 10;
        String language = LanguageCodes.ENGLISH;
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        
        Pageable pageable = PageRequest.of(page, size);
        List<Game> games = GameTestsUtils.createGames(PENDING);
        GameStatus gameStatus = GameStatusTestUtils.createGameStatus(PENDING);
        Page<Game> gamePage = new PageImpl<>(games, pageable, games.size());
        when(gameStatusService.getGameStatus(PENDING)).thenReturn(gameStatus);
        when(gameRepository.findAllByGameStatus(pageable, gameStatusService.getGameStatus(PENDING))).thenReturn(gamePage);

        
        ResultsDTO<GameDTO> resultsDTO = gameService.getGamesToAccept(authentication, page, size, language);

        
        assertEquals(games.size(), resultsDTO.getResults().size());
        assertEquals(gamePage.getTotalElements(), resultsDTO.getPaginationInfo().getTotalElements());
        assertEquals(gamePage.getTotalPages(), resultsDTO.getPaginationInfo().getTotalPages());
    }

    @Test
    void testGetGamesToAcceptWithNonAdminUser() throws UserDoesNotExistException {
        
        Authentication authentication =any() /* create a mock Authentication for a non-admin user */;
        int page = 0;
        int size = 10;
        String language = LanguageCodes.ENGLISH;
        when(roleService.checkIfAdmin(authentication)).thenReturn(false);

        
        assertThrows(IllegalAccessException.class, () -> gameService.getGamesToAccept(authentication, page, size, language));

        
        verifyNoInteractions(gameRepository, gameStatusService);
    }

    @Test
    void testGetGamesToAcceptWithInvalidLanguage() throws UserDoesNotExistException {
        
        Authentication authentication = any() /* create a mock Authentication for an admin user */;
        int page = 0;
        int size = 10;
        String invalidLanguage = "InvalidLanguage";
        when(roleService.checkIfAdmin(authentication)).thenReturn(true);

        
        assertThrows(BadRequestException.class, () -> gameService.getGamesToAccept(authentication, page, size, invalidLanguage));


    }

}