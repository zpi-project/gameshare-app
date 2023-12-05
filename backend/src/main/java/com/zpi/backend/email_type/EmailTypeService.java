package com.zpi.backend.email_type;

import com.zpi.backend.email_type.exceptions.EmailTypeDoesNotExists;
import org.springframework.stereotype.Service;

import static com.zpi.backend.email_type.EmailType.*;

@Service
public class EmailTypeService {
    private final EmailTypeRepository emailTypeRepository;

    public EmailTypeService(EmailTypeRepository emailTypeRepository){
        this.emailTypeRepository = emailTypeRepository;
        saveStatuses();

    }
    public EmailType findEmailTypeByStatus(String status) throws EmailTypeDoesNotExists {
       return emailTypeRepository.findEmailTypeByType(status)
               .orElseThrow(() -> new EmailTypeDoesNotExists(status + " status does not exists."));
    }

    private void saveStatuses(){
        saveStatus(REGISTRATION);
        saveStatus(RESERVATION_ACCEPTED);
        saveStatus(RESERVATION_EXPIRED);
        saveStatus(RESERVATION_FINISHED);
        saveStatus(RESERVATION_PENDING);
        saveStatus(RESERVATION_COMING_SOON);
        saveStatus(RESERVATION_TODAY);
        saveStatus(RESERVATION_CANCELED_BY_OWNER);
        saveStatus(RESERVATION_CANCELED_BY_RENTER);
        saveStatus(NEW_GAME);
        saveStatus(RESERVATION_REJECTED);
    }

    private void saveStatus(String type){
        if (!emailTypeRepository.existsByType(type)){
            emailTypeRepository.save(new EmailType(type));
        }
    }
}
