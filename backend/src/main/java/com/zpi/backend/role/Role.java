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

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long role_id;

    @Column(nullable = false,unique = true)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Role role = (Role) o;
        return getRole_id() != null && Objects.equals(getRole_id(), role.getRole_id());
    }
    public Role(String name) {
        this.name = name;
    }
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
