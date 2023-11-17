package com.zpi.backend.email_logs;

import com.zpi.backend.emails.EmailType;
import com.zpi.backend.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    @Column(length = 2000)
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
    }
}
