package com.zpi.backend.game_instance_image;

import com.zpi.backend.configuration.DataBucketUtil;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.exception.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceRepository;
import com.zpi.backend.game_instance_image.exception.GCPFileUploadException;
import com.zpi.backend.game_instance_image.exception.GameInstanceImageDoesNotExistException;
import com.zpi.backend.game_instance_image.exception.IllegalFileTypeException;
import com.zpi.backend.game_instance_image.exception.TooManyImagesException;
import com.zpi.backend.user.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GameInstanceImageService {
    private static final int MAX_GAME_INSTANCE_PHOTOS = 3;
    private static final String PNG_CONTENT_TYPE = "image/png";
    private static final String JPEG_CONTENT_TYPE = "image/jpeg";


    GameInstanceImageRepository gameInstanceImageRepository;
    GameInstanceRepository gameInstanceRepository;
    DataBucketUtil dataBucketUtil;

//    TODO implement addImageToGameInstance endpoint
    public FileDTO addImageToGameInstance(Authentication authentication, String gameInstanceUUID,
                                          MultipartFile multipartFile) throws GameInstanceDoesNotExistException, BadRequestException, TooManyImagesException, IllegalFileTypeException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository
                .findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        // Checking type of file
        if (!Objects.equals(multipartFile.getContentType(), PNG_CONTENT_TYPE) &&
                !Objects.equals(multipartFile.getContentType(), JPEG_CONTENT_TYPE))
            throw new IllegalFileTypeException("Content type has to be image/png or image/jpeg");
        System.out.println(multipartFile.getContentType());
        // Blocker to check if the GI has got 3 or more images
        int imagesAmount = gameInstanceRepository.howManyGameInstanceImages(gameInstanceUUID);
        if (imagesAmount >= MAX_GAME_INSTANCE_PHOTOS)
            throw new TooManyImagesException("The Game Instance has already " +MAX_GAME_INSTANCE_PHOTOS +" or more images");
        return new FileDTO(uploadFiles(multipartFile, gameInstanceOptional.get()));
    }

    private GameInstanceImage uploadFiles(MultipartFile file, GameInstance gameInstance) throws BadRequestException {

        GameInstanceImage inputFile = null;
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null) {
            throw new BadRequestException("Original file name is null");
        }

        Path path = new File(originalFileName).toPath();

        try {
            String contentType = Files.probeContentType(path);
            FileDTO fileDto = dataBucketUtil.uploadFile(file, originalFileName, contentType);

            if (fileDto != null) {
                inputFile = new GameInstanceImage(fileDto.getFileName(), fileDto.getFileURL(), gameInstance);
                gameInstanceImageRepository.save(inputFile);
            }

        } catch (Exception e) {
            throw new GCPFileUploadException("[1] Error occurred while uploading - "+e.getMessage());
        }
        return inputFile;
    }

    // TODO Delete photos from Google Storage - needed?
    public void deleteGameInstanceImage(Authentication authentication, String gameInstanceImageUUID) throws GameInstanceImageDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        Optional<GameInstanceImage> gameInstanceImageOptional = gameInstanceImageRepository
                .findByGameInstanceUuidAndGameInstance_OwnerGoogleId(gameInstanceImageUUID, googleId);
        if (gameInstanceImageOptional.isEmpty())
            throw new GameInstanceImageDoesNotExistException("Game Instance Image (UUID = "+gameInstanceImageUUID+") does not exists or the User is not the Owner.");
        gameInstanceImageRepository.delete(gameInstanceImageOptional.get());
    }

    // TODO Delete photos from Google Storage - needed?
    public void deleteGameInstanceImagesByGameInstance(Authentication authentication, String gameInstanceUUID) throws GameInstanceDoesNotExistException {
        String googleId = ((User)authentication.getPrincipal()).getGoogleId();
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository
                .findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (UUID = "+gameInstanceOptional+") does not exists or the User is not the Owner.");
        gameInstanceImageRepository.deleteAllByGameInstanceUuid(gameInstanceUUID);
    }

}
