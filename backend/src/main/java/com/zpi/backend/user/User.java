package com.zpi.backend.user;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.zpi.backend.role.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

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
    private double locationLongitude;

    @Column(name = "locationLatitude",nullable = true)
    private double locationLatitude;

    @ManyToOne
    private Role role;
    public User(String email) {
        this.email = email;
    }

    public static User fromGoogleTokenPayload(GoogleIdToken.Payload payload) {
        return new User(
                payload.getEmail()
        );
    }

    public boolean isRegistered() {
        return this.firstName != null && this.lastName != null && this.phoneNumber != null && this.locationName != null;
    }
}
