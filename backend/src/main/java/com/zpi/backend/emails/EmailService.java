package com.zpi.backend.emails;

import com.zpi.backend.email_logs.EmailLog;
import com.zpi.backend.email_logs.EmailLogRepository;
import com.zpi.backend.user.User;
import com.zpi.backend.user.UserService;
import org.springframework.core.io.Resource;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.util.Base64;

@Component
public class EmailService {

    @Value("${FRONTEND_HOST}")
    private String frontend_host;
    @Value("${FRONTEND_PORT}")
    private String frontend_port;
    @Value("classpath:images/gameshare_logo.jpeg")
    private Resource logo_resource;
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    public static final String EMAIL_TEMPLATE = "email-template";
    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;
    private final EmailTranslationService translationService;
    private final EmailLogRepository emailLogRepository;

    public EmailService(JavaMailSender emailSender, TemplateEngine templateEngine,
                        EmailTranslationService emailTranslationService, EmailLogRepository emailLogRepository) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
        this.translationService = emailTranslationService;
        this.emailLogRepository = emailLogRepository;
    }

    public Context setContextForEmailTemplate(String title, String header, String message, String languageCode) throws IOException {
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
        context.setVariable("logo_image", getEncodedLogo());

        return context;

    }


    @Async
    public void sendEmailWithHtmlTemplate(User user, String subject, String templateName, Context context, EmailType emailType) {
        EmailLog log;
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            log = new EmailLog(user,emailType, subject, htmlContent);
            // Saving log
            emailLogRepository.save(log);
            // Sending mail
            emailSender.send(mimeMessage);
            // Updating log
            log.sent();
            emailLogRepository.save(log);
            logger.info(emailType.name() + " MAIL sent successfully");
        } catch (Exception e) {
            logger.error("Error while sending an email. "+e.getMessage());
        }
    }

    private String getEncodedLogo() throws IOException {
        byte[] bytes = IOUtils.toByteArray(logo_resource.getInputStream());
        Base64.Encoder encoder = Base64.getEncoder();
        String base64String = encoder.encodeToString(bytes);
        return "data:image/png;base64," + base64String;
    }

    // TODO Check if any email hasn't been sent

    // Particular emails
    public Context getRegistrationEmailContext(String languageCode) throws IOException {
        String title = translationService.getMessage("email.registration.title", languageCode);
        String header = translationService.getMessage("email.registration.header", languageCode);
        String message = translationService.getMessage("email.registration.message", languageCode);
        return setContextForEmailTemplate(title, header, message, languageCode);
    }
}