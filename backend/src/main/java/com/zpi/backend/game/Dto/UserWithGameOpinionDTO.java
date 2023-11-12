package com.zpi.backend.game.Dto;

import com.zpi.backend.user.Dto.UserGuestDTO;
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
