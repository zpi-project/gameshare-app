package com.zpi.backend.game_instance_image;

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
}
