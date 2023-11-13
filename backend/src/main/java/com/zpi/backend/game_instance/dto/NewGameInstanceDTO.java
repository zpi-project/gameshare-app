package com.zpi.backend.game_instance.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class NewGameInstanceDTO extends UpdatedGameInstanceDTO {
    private long gameId;
}
