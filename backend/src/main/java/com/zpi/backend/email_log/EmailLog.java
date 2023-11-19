package com.zpi.backend.email_log;

import com.zpi.backend.email.EmailType;
import com.zpi.backend.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name="email_logs")
@Data
@Entity
@NoArgsConstructor
public class EmailLog {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private User receiver;
    private EmailType type;
    private String title;
    @Column(length = 50000)
    private String content;
    private Date sendingTime;
    private boolean sent;
    private Date timestamp;

    public EmailLog(User receiver, EmailType type, String title, String content) {
        this.receiver = receiver;
        this.type = type;
        this.content = content;
        this.title = title;
        this.timestamp = new Date(System.currentTimeMillis());
        this.sent = false;
    }

    public void sent(){
        sent = true;
        sendingTime = new Date(System.currentTimeMillis());
        // We set the content for sent emails to null, because it has over 35 000 characters.
        content = null;
    }
}
