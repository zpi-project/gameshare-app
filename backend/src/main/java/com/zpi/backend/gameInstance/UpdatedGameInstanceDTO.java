package com.zpi.backend.gameInstance;

import com.zpi.backend.exceptionHandlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatedGameInstanceDTO{
    protected String description;
    protected double pricePerDay;

    public boolean validate() throws BadRequestException {
        if(ValueChecker.isStringEmpty(description))
            throw new BadRequestException("Description cannot be empty");
        if(description.length() > 500)
            throw new BadRequestException("Description is too long (more than 500 characters)");
        if(pricePerDay < 0)
            throw new BadRequestException("Price per day cannot be less than 0.");
        if (pricePerDay > 200)
            throw new BadRequestException("Price per day cannot be greater than 200.");
        return true;
    }
}
