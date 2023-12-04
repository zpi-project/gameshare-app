package com.zpi.backend.role;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@Entity
@Table(name = "roles")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Role {
    public static final String ADMIN = "admin";
    public static final String USER = "user";

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String name;

    public Role(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Role role = (Role) o;
        return getId() != null && Objects.equals(getId(), role.getId());
    }
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
