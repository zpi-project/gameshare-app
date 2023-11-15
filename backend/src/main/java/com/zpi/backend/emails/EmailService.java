package com.zpi.backend.emails;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class EmailService {

    @Value("${FRONTEND_HOST}")
    private String frontend_host;
    @Value("${FRONTEND_PORT}")
    private String frontend_port;
    public static final String EMAIL_TEMPLATE = "email-template";
    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;
    private final EmailTranslationService translationService;

    public EmailService(JavaMailSender emailSender, TemplateEngine templateEngine, EmailTranslationService emailTranslationService) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
        this.translationService = emailTranslationService;
    }

    public Context setContextForEmailTemplate(String title, String header, String message, String languageCode){
        Context context = new Context();
        context.setVariable("title", title);
        context.setVariable("header", header);
        context.setVariable("message", message);
        context.setVariable("app_url", frontend_host + ":"+frontend_port);
        context.setVariable("default_message",
                translationService.getMessage("email.default-message", languageCode));
        context.setVariable("button",
                translationService.getMessage("email.button", languageCode));
        context.setVariable("language", languageCode);

        return context;

    }
    public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            emailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("Error while sending an email. "+e.getMessage());
        }
    }

    // Particular emails
    public Context getRegistrationEmailContext(String languageCode) {
        String title = translationService.getMessage("email.registration.title", languageCode);
        String header = translationService.getMessage("email.registration.header", languageCode);
        String message = translationService.getMessage("email.registration.message", languageCode);
        return setContextForEmailTemplate(title, header, message, languageCode);
    }
}