package com.zpi.backend.exception_handlers;

import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.exception.GameInstanceStatusException;
import com.zpi.backend.category.exception.CategoryAlreadyExistsException;
import com.zpi.backend.category.exception.CategoryDoesNotExistException;
import com.zpi.backend.game.exception.GameAlreadyAcceptedException;
import com.zpi.backend.game.exception.GameAlreadyExistsException;
import com.zpi.backend.game.exception.GameAlreadyRejectedException;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.game_instance_image.exception.*;
import com.zpi.backend.game_instance_opinion.exception.GameInstanceOpinionDoesNotExistException;
import com.zpi.backend.user.exception.UndefinedUserException;
import com.zpi.backend.user.exception.UserAlreadyExistsException;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import com.zpi.backend.user_opinion.exception.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.EditSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.exception.UserOpinionDoesNotExistException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.mediatype.problem.Problem;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@ControllerAdvice
public class ExceptionController {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionController.class);

    @ResponseBody
    @ExceptionHandler(ResponseStatusException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    ResponseEntity ITEHandler(ResponseStatusException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.UNAUTHORIZED)
                        .withTitle(HttpStatus.UNAUTHORIZED.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

    @ResponseBody
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity BREHandler(BadRequestException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.BAD_REQUEST)
                        .withTitle(HttpStatus.BAD_REQUEST.name())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(IllegalAccessException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    ResponseEntity IAEHandler(IllegalAccessException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.FORBIDDEN)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    //    User
    @ResponseBody
    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity UAEHandler(UserAlreadyExistsException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.BAD_REQUEST)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity UDNEHandler(UserDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(UndefinedUserException.class)
    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT)
    ResponseEntity<Problem> UUEHandler(UndefinedUserException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.I_AM_A_TEAPOT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.I_AM_A_TEAPOT)
                        .withTitle(HttpStatus.I_AM_A_TEAPOT.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

    // Categories
    @ResponseBody
    @ExceptionHandler(CategoryAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity CAEHandler(CategoryAlreadyExistsException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(CategoryDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity CDNEHandler(CategoryDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    // Games
    @ResponseBody
    @ExceptionHandler(GameAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity GAEHandler(GameAlreadyExistsException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(GameDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity GNEHandler(GameDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));

    }

    @ResponseBody
    @ExceptionHandler(GameAlreadyAcceptedException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity GAAHandler(GameAlreadyAcceptedException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(GameAlreadyRejectedException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity GARHandler(GameAlreadyRejectedException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    // Game Instance

    @ResponseBody
    @ExceptionHandler(GameInstanceDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity GINEHandler(GameInstanceDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(GameInstanceStatusException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity GISHandler(GameInstanceStatusException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    // User Opinion
    @ResponseBody
    @ExceptionHandler(EditSomeoneElseOpinionException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity ESEOHandler(EditSomeoneElseOpinionException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.BAD_REQUEST)
                        .withTitle(HttpStatus.BAD_REQUEST.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

    @ResponseBody
    @ExceptionHandler(DeleteSomeoneElseOpinionException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity DSEOHandler(DeleteSomeoneElseOpinionException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.BAD_REQUEST)
                        .withTitle(HttpStatus.BAD_REQUEST.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

    @ResponseBody
    @ExceptionHandler(UserOpinionDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity ODNEHandler(UserOpinionDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(HttpStatus.NOT_FOUND.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

    // Game Instance Opinion
    @ResponseBody
    @ExceptionHandler(GameInstanceOpinionDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity GIODNEHandler(GameInstanceOpinionDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(HttpStatus.NOT_FOUND.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

    // Game Instance Image
    @ResponseBody
    @ExceptionHandler(GameInstanceImageDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity GIINEHandler(GameInstanceImageDoesNotExistException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(TooManyImagesException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity TMIEHandler(TooManyImagesException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    // Uploading photos
    @ResponseBody
    @ExceptionHandler(FileWriteException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity FWEHandler(FileWriteException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(InvalidFileTypeException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity IFTEHandler(InvalidFileTypeException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.BAD_REQUEST)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(GCPFileUploadException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity GCPFUEHandler(GCPFileUploadException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }
    @ResponseBody
    @ExceptionHandler(IOException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity IOEHandler(IOException ex) {
        logger.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }
}
