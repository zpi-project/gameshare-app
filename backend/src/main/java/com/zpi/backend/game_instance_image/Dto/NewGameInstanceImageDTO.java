package com.zpi.backend.game_instance_image.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewGameInstanceImageDTO {
    private Blob newGameInstanceImage;
}