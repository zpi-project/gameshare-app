package com.zpi.backend.image.dto;

import com.zpi.backend.image.game_instance_image.GameInstanceImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileDTO {
    private long id;
    private String fileName;
    private String fileURL;

    public FileDTO(GameInstanceImage gameInstanceImage) {
        this.id = gameInstanceImage.getId();
        this.fileName = gameInstanceImage.getImageName();
        this.fileURL = gameInstanceImage.getImageLink();
    }

    public FileDTO(String fileName, String fileURL) {
        this.fileName = fileName;
        this.fileURL = fileURL;
    }
}
