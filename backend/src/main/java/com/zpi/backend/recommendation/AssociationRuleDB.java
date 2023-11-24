package com.zpi.backend.recommendation;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "association_rules")
public class AssociationRuleDB {

    private static final String comma = ",";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "antecedent")
    private String antecedentStr;

    @Column(name = "consequent")
    private String consequentStr;

    private double support;

    private double confidence;

    private double lift;

    public AssociationRuleDB(AssociationRule associationRule) {
        this.antecedentStr = convertSetToString(associationRule.getAntecedent());
        this.consequentStr = convertSetToString(associationRule.getConsequent());
        this.support = associationRule.getSupport();
        this.confidence = associationRule.getConfidence();
        this.lift = associationRule.getLift();
    }


    private String convertSetToString(Set<Long> set){
        StringBuilder sb = new StringBuilder();
        for (Long elem : set){
            sb.append(elem);
            sb.append(comma);
        }
        sb.deleteCharAt(sb.lastIndexOf(comma));
        return sb.toString();
    }

}
