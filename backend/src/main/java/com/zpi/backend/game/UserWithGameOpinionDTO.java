package com.zpi.backend.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zpi.backend.user.UserGameGuestDTO;
import jakarta.persistence.Tuple;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithGameOpinionDTO {
    private UserGameGuestDTO user;
    private double userRate;
    private String gameInstanceUUID;
    private String gameName;
    private double gameInstanceRate;

}
