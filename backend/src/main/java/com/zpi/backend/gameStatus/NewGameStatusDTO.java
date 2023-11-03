package com.zpi.backend.gameStatus;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import lombok.Data;

@Data
public class NewGameStatusDTO {
    private String status;

    public boolean validate() throws BadRequestException {
        if(ValueChecker.isStringEmpty(status))
            throw new BadRequestException("Status cannot be empty");
        return true;
    }
}
