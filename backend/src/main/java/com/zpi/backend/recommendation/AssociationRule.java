package com.zpi.backend.recommendation;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "association_rules")
public class AssociationRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String antecedent;

    private String consequent;

    private double support;

    private double confidence;
}
