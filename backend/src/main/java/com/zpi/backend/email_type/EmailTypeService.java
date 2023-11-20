package com.zpi.backend.email_type;

import com.zpi.backend.email_type.exceptions.EmailTypeDoesNotExists;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailTypeService {
    private final EmailTypeRepository emailTypeRepository;
    public EmailType findEmailTypeByStatus(String status) throws EmailTypeDoesNotExists {
       return emailTypeRepository.findEmailTypeByType(status)
               .orElseThrow(() -> new EmailTypeDoesNotExists(status + " status does not exists."));
    }
}
