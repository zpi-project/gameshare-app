package com.zpi.backend.emails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.IllformedLocaleException;
import java.util.Locale;

@Service
public class EmailTranslationService {

    private final MessageSource messageSource;

    @Autowired
    public EmailTranslationService(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String getMessage(String code, String languageCode) {
        Locale locale;
        try {
            locale = new Locale.Builder().setLanguage(languageCode).build();
        } catch (IllformedLocaleException ex){
            locale = Locale.ENGLISH;
        }
        return messageSource.getMessage(code, null, locale);
    }

}
