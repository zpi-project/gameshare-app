package com.zpi.backend.image.game_image;

import com.zpi.backend.configuration.DataBucketUtil;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game.Game;
import com.zpi.backend.game.GameRepository;
import com.zpi.backend.game.exception.GameDoesNotExistException;
import com.zpi.backend.image.exception.*;
import com.zpi.backend.image.dto.FileDTO;
import com.zpi.backend.role.RoleService;
import com.zpi.backend.user.exception.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GameImageService {

    private final GameRepository gameRepository;
    private final DataBucketUtil dataBucketUtil;
    private final RoleService roleService;

    public FileDTO addImageToGame(Long gameId, MultipartFile multipartFile)
            throws BadRequestException, GameDoesNotExistException, ImageAlreadyExistsException {
        Game game = gameRepository.findGameById(gameId)
                .orElseThrow(() -> new GameDoesNotExistException("Game (id = "+gameId+") does not exists."));
        if (!game.getImage().isEmpty() && !game.getImage().isBlank())
            throw new ImageAlreadyExistsException("Game (id = "+gameId+") already has an image. To change image you need " +
                    "to remove it first sending DELETE request for endpoint games/{gameId}/images.");
        return uploadFiles(multipartFile, game);
    }

    private FileDTO uploadFiles(MultipartFile file, Game game) throws BadRequestException {

        FileDTO fileDto;
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null) {
            throw new BadRequestException("Original file name is null");
        }

        Path path = new File(originalFileName).toPath();

        try {
            String contentType = Files.probeContentType(path);
            fileDto = dataBucketUtil.uploadFile(file, originalFileName, contentType);

            if (fileDto != null) {
                gameRepository.updateImageLink(game, fileDto.getFileURL());
            }
        } catch (FileWriteException | InvalidFileTypeException e){
            throw e;
        } catch (Exception e) {
            throw new GCPFileUploadException("[1] Error occurred while uploading - "+e.getMessage());
        }
        return fileDto;
    }

    // TODO Delete photos from Google Storage - needed?
    public void deleteGameImage(Authentication authentication, Long gameId) throws UserDoesNotExistException, IllegalAccessException, GameDoesNotExistException {
        if (!roleService.checkIfAdmin(authentication)) {
            throw new IllegalAccessException("User is not an admin.");
        }
        Optional<Game> gameOptional = gameRepository.findGameById(gameId);
        if (gameOptional.isEmpty())
            throw new GameDoesNotExistException("Game (ID = "+gameId+") does not exists.");
        gameRepository.updateImageLink(gameOptional.get(), "");
    }

}
