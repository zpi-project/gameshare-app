package com.zpi.backend.reservations.DTO;

import com.zpi.backend.exception_handlers.BadRequestException;
import com.zpi.backend.validators.ValueChecker;
import lombok.Data;

import java.util.Date;

@Data
public class NewReservationDTO {
    private Date startDate;
    private Date endDate;
    private String gameInstanceUUID;
    private String renterComment;

    public boolean validate() throws BadRequestException {
        Date now = new Date(System.currentTimeMillis());
        if(startDate.before(now))
            throw new BadRequestException("Start date is before current date");
        if(endDate.before(startDate))
            throw new BadRequestException("End date is before start date");
        if(ValueChecker.isStringEmpty(renterComment))
            throw new BadRequestException("Comment is empty");
        if(renterComment.length() > 500)
            throw new BadRequestException("Comment is too long");
        if (ValueChecker.isStringEmpty(gameInstanceUUID))
            throw new BadRequestException("Game instance id is invalid");
        return true;
    }
}

