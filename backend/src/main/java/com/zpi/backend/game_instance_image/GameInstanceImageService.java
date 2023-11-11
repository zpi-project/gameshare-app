package com.zpi.backend.game_instance_image;

import com.zpi.backend.configuration.DataBucketUtil;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.game_instance.GCPFileUploadException;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.GameInstanceDoesNotExistException;
import com.zpi.backend.game_instance.GameInstanceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

@AllArgsConstructor
@Service
public class GameInstanceImageService {
    GameInstanceImageRepository gameInstanceImageRepository;
    GameInstanceRepository gameInstanceRepository;
    DataBucketUtil dataBucketUtil;

//    TODO implement addImageToGameInstance endpoint
    public FileDTO addImageToGameInstance(String googleId, String gameInstanceUUID,
                                          NewGameInstanceImageDTO newGameInstanceDTO) throws GameInstanceDoesNotExistException {
        Optional<GameInstance> gameInstanceOptional = gameInstanceRepository
                .findByUuidAndOwner_GoogleId(gameInstanceUUID, googleId);
        if (gameInstanceOptional.isEmpty())
            throw new GameInstanceDoesNotExistException("Game Instance (uuid = "+gameInstanceUUID+") does not exists or the User is not the Owner.");
        FileDTO fileDTO = new FileDTO();
        return fileDTO;
    }

    public GameInstanceImage uploadFiles(MultipartFile file) throws BadRequestException {

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
                inputFile = new GameInstanceImage(fileDto.getFileName(), fileDto.getFileURL());
                gameInstanceImageRepository.save(inputFile);
            }

        } catch (Exception e) {
            throw new GCPFileUploadException("Error occurred while uploading");
        }
        return inputFile;
    }

    public void deleteGameInstanceImage(String googleId, String gameInstanceImageUUID) throws GameInstanceImageDoesNotExistException {
        Optional<GameInstanceImage> gameInstanceImageOptional = gameInstanceImageRepository
                .findByGameInstanceUuidAndGameInstance_OwnerGoogleId(gameInstanceImageUUID, googleId);
        if (gameInstanceImageOptional.isEmpty())
            throw new GameInstanceImageDoesNotExistException("Game Instance Image (UUID = "+gameInstanceImageUUID+") does not exists or the User is not the Owner.");
        gameInstanceImageRepository.deleteById(gameInstanceImageOptional.get().getId());
    }


}
