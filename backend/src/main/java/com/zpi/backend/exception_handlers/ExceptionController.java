package com.zpi.backend.exception_handlers;

import com.zpi.backend.gameInstance.GameInstanceDoesNotExistException;
import com.zpi.backend.gameInstance.GameInstanceStatusException;
import com.zpi.backend.category.CategoryAlreadyExistsException;
import com.zpi.backend.category.CategoryDoesNotExistException;
import com.zpi.backend.game.GameAlreadyAcceptedException;
import com.zpi.backend.game.GameAlreadyExistsException;
import com.zpi.backend.game.GameAlreadyRejectedException;
import com.zpi.backend.game.GameDoesNotExistException;
import com.zpi.backend.gameInstanceImage.GameInstanceImageDoesNotExistException;
import com.zpi.backend.user.UndefinedUserException;
import com.zpi.backend.user.UserAlreadyExistsException;
import com.zpi.backend.user.UserDoesNotExistException;
import com.zpi.backend.user_opinion.DeleteSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.EditSomeoneElseOpinionException;
import com.zpi.backend.user_opinion.UserOpinionDoesNotExistException;
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

@ControllerAdvice
public class ExceptionController {

    @ResponseBody
    @ExceptionHandler(ResponseStatusException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    ResponseEntity ITEHandler(ResponseStatusException ex) {
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
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    // Game Instance Image
    @ResponseBody
    @ExceptionHandler(GameInstanceImageDoesNotExistException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity GIINEHandler(GameInstanceImageDoesNotExistException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(ex.getClass().getSimpleName())
                        .withDetail(ex.getMessage()));
    }

    // User Opinion
    @ResponseBody
    @ExceptionHandler(EditSomeoneElseOpinionException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity ESEOHandler(EditSomeoneElseOpinionException ex) {
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
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(HttpStatus.NOT_FOUND.name())
                        .withDetail(ex.getClass().getSimpleName()));
    }

}
