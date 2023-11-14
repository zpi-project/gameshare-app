package com.zpi.backend.game.dto;

import com.zpi.backend.user.dto.UserGuestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithGameOpinionDTO {
    private UserGuestDTO user;
    private String gameInstanceUUID;
    private String gameName;
    private double gameInstanceRating;

}
