package com.zpi.backend.user;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User{

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "email",length = 255,nullable = false,unique = true)
    private String email;

    @Column(name = "firstName",length = 255,nullable = true)
    private String firstName;

    @Column(name = "lastName",length = 255,nullable = true)
    private String lastName;

    @Column(name = "phoneNumber",length = 255,nullable = true)
    private String phoneNumber;

    @Column(name = "locationName",length = 255,nullable = true)
    private String locationName;

    @Column(name = "locationLongitude",nullable = true)
    private float locationLongitude;

    @Column(name = "locationLatitude",nullable = true)
    private float locationLatitude;

    public User(String email) {
        this.email = email;
    }

    public User() {
    }

    public static User fromGoogleTokenPayload(GoogleIdToken.Payload payload) {
        return new User(
                payload.getEmail()
        );
    }
}