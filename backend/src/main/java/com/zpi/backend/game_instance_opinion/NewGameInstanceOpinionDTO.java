package com.zpi.backend.game_instance_opinion;

import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewGameInstanceOpinionDTO {
    private String gameInstanceUuid;
    private int stars;
    private String description;
    // TODO Add reservation
//    private String reservationUuid;

    public boolean validate() throws BadRequestException {
        if (ValueChecker.isStringEmpty(gameInstanceUuid))
            throw new BadRequestException("Invalid UUID");
        if (stars < 1 || stars > 5)
            throw new BadRequestException("Stars must be between 1 and 5");
        if (ValueChecker.isStringEmpty(description))
            throw new BadRequestException("Description cannot be empty");
        if (description.length() > 500)
            throw new BadRequestException("Description cannot have more than 500 characters.");
        return true;
    }

}
