package com.zpi.backend.email;

import com.zpi.backend.email_log.EmailLog;
import com.zpi.backend.email_log.EmailLogRepository;
import com.zpi.backend.user.User;
import jakarta.mail.MessagingException;
import org.springframework.core.io.Resource;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Locale;

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

    public Context setContextForEmailTemplate(String title_pl, String header_pl,
                                              String title_en, String header_en, String message1_en, String message1_pl,
                                              String message2_en, String message2_pl) throws IOException {
        Context context = new Context();
        context.setVariable("pl_title", title_pl);
        context.setVariable("pl_header", header_pl);

        context.setVariable("en_title", title_en);
        context.setVariable("en_header", header_en);

        context.setVariable("en_message_1", message1_en);
        context.setVariable("pl_message_1", message1_pl);
        context.setVariable("en_message_2", message2_en);
        context.setVariable("pl_message_2", message2_pl);

        context.setVariable("pl_default_message",
                translationService.getMessage("email.default-message", "pl", null));
        context.setVariable("pl_button",
                translationService.getMessage("email.button", "pl", null));
        context.setVariable("en_default_message",
                translationService.getMessage("email.default-message", "en", null));
        context.setVariable("en_button",
                translationService.getMessage("email.button", "en", null));

        context.setVariable("language", "pl");
        context.setVariable("app_url", frontend_host + ":"+frontend_port);
        context.setVariable("logo_image", getEncodedLogo());

        return context;
    }


    @Async
    public void sendEmailWithHtmlTemplate(User user, String subject, String templateName, Context context, EmailType emailType) {
        try {
            String htmlContent = templateEngine.process(templateName, context);
            EmailLog log = new EmailLog(user,emailType, subject, htmlContent);
            // Saving log
            emailLogRepository.save(log);
            // Sending mail
            sendHTMLEmail(user.getEmail(), subject, htmlContent);
            // Updating log
            log.sent();
            emailLogRepository.save(log);
            logger.info(emailType.name() + " MAIL sent successfully");
        } catch (Exception e) {
            logger.error("Error while sending an email. "+e.getMessage());
        }
    }

    private void sendHTMLEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        emailSender.send(mimeMessage);
    }

    private String getEncodedLogo() throws IOException {
        byte[] bytes = IOUtils.toByteArray(logo_resource.getInputStream());
        Base64.Encoder encoder = Base64.getEncoder();
        String base64String = encoder.encodeToString(bytes);
        return "data:image/png;base64," + base64String;
    }

    @Scheduled(cron = "0 */5 * ? * *", zone = "Europe/Warsaw")
    public void sendUnsentEmails() {
        List<EmailLog> unsentEmails = emailLogRepository.findAllBySentIsFalse();
        logger.info("Checking e-mails to send.");
        if (unsentEmails.size() > 0) {
            for (EmailLog log : unsentEmails) {
                try {
                    sendHTMLEmail(
                            log.getReceiver().getEmail(),
                            log.getTitle(),
                            log.getContent()
                    );
                    log.sent();
                    emailLogRepository.save(log);
                    logger.info("[LOG-"+log.getId()+"] "+log.getType().name() + " MAIL sent successfully");
                } catch (Exception e) {
                    logger.error("Error while sending an email. " + e.getMessage());
                }
            }
        }
    }

    @Scheduled(cron = "0 0 8 ? * *", zone = "Europe/Warsaw")
    public void sendRemaindersAboutReservation2DaysBefore() {
        logger.info("DRAFT: Sending reservation reminders 2 days before.");
    }

    @Scheduled(cron = "0 0 8 ? * *", zone = "Europe/Warsaw")
    public void sendRemaindersAboutReservationOnDay() {
        logger.info("DRAFT: Sending reservation reminders on reservation day.");
    }

    // Particular emails
    public Context getRegistrationEmailContext() throws IOException {
        String title_pl = translationService.getMessage("email.registration.title", "pl", null);
        String header_pl = translationService.getMessage("email.registration.header", "pl", null);
        String message1_pl = translationService.getMessage("email.registration.message.1", "pl", null);
        String message2_pl = translationService.getMessage("email.registration.message.2", "pl", null);
        String title_en = translationService.getMessage("email.registration.title", "en", null);
        String header_en = translationService.getMessage("email.registration.header", "en", null);
        String message1_en = translationService.getMessage("email.registration.message.1", "en", null);
        String message2_en = translationService.getMessage("email.registration.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getPendingEmailContext(String reservationID, String gameName, Date startDate, Date endDate) throws IOException {
        SimpleDateFormat simpleDateFormatPL = new SimpleDateFormat("dd MMMM yyyy", Locale.forLanguageTag("pl"));
        SimpleDateFormat simpleDateFormatEN = new SimpleDateFormat("dd MMMM yyyy", Locale.forLanguageTag("en"));
        String[] argumentsPL = {reservationID, gameName, simpleDateFormatPL.format(startDate), simpleDateFormatPL.format(endDate)};
        String[] argumentsEN = {reservationID, gameName, simpleDateFormatEN.format(startDate), simpleDateFormatEN.format(endDate)};

        String title_pl = translationService.getMessage("email.reservation.pending.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.pending.header", "pl", null);
        String message1_pl = translationService.getMessage("email.reservation.pending.message.1", "pl", argumentsPL);
        String message2_pl = translationService.getMessage("email.reservation.pending.message.2", "pl", null);
        String title_en = translationService.getMessage("email.reservation.pending.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.pending.header", "en", null);
        String message1_en = translationService.getMessage("email.reservation.pending.message.1", "en", argumentsEN);
        String message2_en = translationService.getMessage("email.reservation.pending.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getAcceptingEmailContext(String reservationID, String gameName) throws IOException {
        String[] arguments = {reservationID, gameName};

        String title_pl = translationService.getMessage("email.reservation.accepting.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.accepting.header", "pl", null);
        String message1_pl = translationService.getMessage("email.reservation.accepting.message.1", "pl", arguments);
        String message2_pl = translationService.getMessage("email.reservation.accepting.message.2", "pl", null);
        String title_en = translationService.getMessage("email.reservation.accepting.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.accepting.header", "en", null);
        String message1_en = translationService.getMessage("email.reservation.accepting.message.1", "en", arguments);
        String message2_en = translationService.getMessage("email.reservation.accepting.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    private Context getCancelingEmailContext(String message1_en, String message1_pl,
                                             String message2_en, String message2_pl) throws IOException {
        String title_pl = translationService.getMessage("email.reservation.canceling.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.canceling.header", "pl", null);
        String title_en = translationService.getMessage("email.reservation.canceling.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.canceling.header", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getCancelingByOwnerEmailContext(String reservationID, String gameName) throws IOException {
        String[] arguments1 = {gameName, reservationID};
        String[] arguments2 = {gameName};

        String message1_pl = translationService.getMessage("email.reservation.canceling.owner.message.1", "pl", arguments1);
        String message2_pl = translationService.getMessage("email.reservation.canceling.owner.message.2", "pl", arguments2);
        String message1_en = translationService.getMessage("email.reservation.canceling.owner.message.1", "en", arguments1);
        String message2_en = translationService.getMessage("email.reservation.canceling.owner.message.2", "en", arguments2);

        return getCancelingEmailContext(message1_en, message1_pl, message2_en, message2_pl);

    }

    public Context getCancelingByRenterEmailContext(String reservationID, String gameName) throws IOException {
        String[] arguments1 = {gameName, reservationID};
        String[] arguments2 = {gameName};

        String message1_pl = translationService.getMessage("email.reservation.canceling.renter.message.1", "pl", arguments1);
        String message2_pl = translationService.getMessage("email.reservation.canceling.renter.message.2", "pl", arguments2);
        String message1_en = translationService.getMessage("email.reservation.canceling.renter.message.1", "en", arguments1);
        String message2_en = translationService.getMessage("email.reservation.canceling.renter.message.2", "en", arguments2);

        return getCancelingEmailContext(message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getRejectingEmailContext(String reservationID, String gameName) throws IOException {
        String[] arguments = {reservationID, gameName};

        String title_pl = translationService.getMessage("email.reservation.rejecting.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.rejecting.header", "pl", null);
        String message1_pl = translationService.getMessage("email.reservation.rejecting.message.1", "pl", arguments);
        String message2_pl = translationService.getMessage("email.reservation.rejecting.message.2", "pl", null);
        String title_en = translationService.getMessage("email.reservation.rejecting.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.rejecting.header", "en", null);
        String message1_en = translationService.getMessage("email.reservation.rejecting.message.1", "en", arguments);
        String message2_en = translationService.getMessage("email.reservation.rejecting.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getRemindingIn2DaysEmailContext() throws IOException {
        String title_pl = translationService.getMessage("email.reservation.in-to-days.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.in-to-days.header", "pl", null);
        String message1_pl = translationService.getMessage("email.reservation.in-to-days.message.1", "pl", null);
        String message2_pl = translationService.getMessage("email.reservation.in-to-days.message.2", "pl", null);
        String title_en = translationService.getMessage("email.reservation.in-to-days.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.in-to-days.header", "en", null);
        String message1_en = translationService.getMessage("email.reservation.in-to-days.message.1", "en", null);
        String message2_en = translationService.getMessage("email.reservation.in-to-days.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getRemindingTodayEmailContext() throws IOException {
        String title_pl = translationService.getMessage("email.reservation.today.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.today.header", "pl", null);
        String message1_pl = translationService.getMessage("email.reservation.today.message.1", "pl", null);
        String message2_pl = translationService.getMessage("email.reservation.today.message.2", "pl", null);
        String title_en = translationService.getMessage("email.reservation.today.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.today.header", "en", null);
        String message1_en = translationService.getMessage("email.reservation.today.message.1", "en", null);
        String message2_en = translationService.getMessage("email.reservation.today.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

    public Context getFinishingEmailContext() throws IOException {
        String title_pl = translationService.getMessage("email.reservation.finished.title", "pl", null);
        String header_pl = translationService.getMessage("email.reservation.finished.header", "pl", null);
        String message1_pl = translationService.getMessage("email.reservation.finished.message.1", "pl", null);
        String message2_pl = translationService.getMessage("email.reservation.finished.message.2", "pl", null);
        String title_en = translationService.getMessage("email.reservation.finished.title", "en", null);
        String header_en = translationService.getMessage("email.reservation.finished.header", "en", null);
        String message1_en = translationService.getMessage("email.reservation.finished.message.1", "en", null);
        String message2_en = translationService.getMessage("email.reservation.finished.message.2", "en", null);

        return setContextForEmailTemplate(title_pl, header_pl, title_en, header_en,
                message1_en, message1_pl, message2_en, message2_pl);
    }

}