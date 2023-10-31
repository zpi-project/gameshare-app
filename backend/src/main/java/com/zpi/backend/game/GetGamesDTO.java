package com.zpi.backend.game;

import com.zpi.backend.dto.Pagination;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetGamesDTO {
    private List<Game> games;
    private Pagination paginationInfo;
}
