package com.zpi.backend.email_type;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "email_types")
public class EmailType {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false,unique = true)
    private String type;
}
