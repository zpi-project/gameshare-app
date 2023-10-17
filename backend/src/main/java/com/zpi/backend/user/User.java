package com.zpi.backend.user;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.zpi.backend.role.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class User{

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;


    @Column(name = "googleId",length = 255,nullable = false,unique = true)
    private String googleId;

    @Column(name= "uuid",length = 255,nullable = false,unique = true)
    private String uuid = UUID.randomUUID().toString();

    @Column(name = "email",length = 255,nullable = false)
    private String email;

    @Column(name = "firstName",length = 255,nullable = true)
    private String firstName;

    @Column(name = "lastName",length = 255,nullable = true)
    private String lastName;

    @Column(name = "phoneNumber",length = 255,nullable = true)
    private String phoneNumber;


    @Column(name = "locationLongitude",nullable = true)
    private double locationLongitude;

    @Column(name = "locationLatitude",nullable = true)
    private double locationLatitude;

    @Column(name = "avatarLink",length = 255,nullable = true)
    private String avatarLink;

    @ManyToOne
    private Role role;
    public User(String email,String avatarLink,String googleId) {
        this.googleId = googleId;
        this.email = email;
        this.avatarLink = avatarLink;
    }

    public static User fromGoogleTokenPayload(GoogleIdToken.Payload payload) {
        return new User(
                payload.getEmail(),
                payload.get("picture").toString(),
                payload.get("sub").toString()
        );
    }

    public void update(UpdateUserDTO updateUserDTO){
        this.firstName = updateUserDTO.getFirstName();
        this.lastName = updateUserDTO.getLastName();
        this.phoneNumber = updateUserDTO.getPhoneNumber();
        this.locationLatitude = updateUserDTO.getLocationLatitude();
        this.locationLongitude = updateUserDTO.getLocationLongitude();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return getId() != null && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
