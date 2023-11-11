package com.zpi.backend.game;

import com.zpi.backend.user.UserGameGuestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithGameOpinionDTO {
    private UserGameGuestDTO user;
    private String gameInstanceUUID;
    private String gameName;
    private double gameInstanceRating;

}
