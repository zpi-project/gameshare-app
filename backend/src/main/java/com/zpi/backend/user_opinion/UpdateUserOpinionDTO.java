package com.zpi.backend.user_opinion;

import com.google.api.client.util.DateTime;
import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import lombok.Data;

@Data
public class UpdateUserOpinionDTO {
    private int stars;
    private String description;
    private DateTime timestamp;

    public boolean validate() throws BadRequestException {
        if (stars < 1 || stars > 5) {
            throw new BadRequestException("Stars must be between 1 and 5");
        }
        if(ValueChecker.isStringEmpty(description)) {
            throw new BadRequestException("Description cannot be empty");
        }
        return true;
    }
}
