package com.zpi.backend.recommendation;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "association_rules")
public class AssociationRule {

    private static final String comma = ",";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String antecedent;

    private String consequent;

    private double support;

    private double confidence;

    private double lift;

    @Transient
    private Set<Long> antecedentSet;

    @Transient
    private Set<Long> consequentSet;

    public AssociationRule(Set<Long> antecedent, Set<Long> consequent, double support, double confidence, double lift) {
        this.antecedentSet = antecedent;
        this.consequentSet = consequent;
        this.support = support;
        this.confidence = confidence;
        this.lift = lift;
        this.antecedent = convertSetToString(antecedentSet);
        this.consequent = convertSetToString(consequentSet);
    }

    public AssociationRule(Long id, String antecedent, String consequent, double support, double confidence, double lift) {
        this.id = id;
        this.antecedent = antecedent;
        this.consequent = consequent;
        this.support = support;
        this.confidence = confidence;
        this.lift = lift;
        this.antecedentSet = convertSetFromString(antecedent);
        this.consequentSet = convertSetFromString(consequent);

    }

    public static AssociationRule generateAssociationRule(Set<Long> antecedent, Set<Long> consequent, double support, double confidence) {
        double lift = (confidence == 0) ? 0 : support / confidence;
        return new AssociationRule(antecedent, consequent, support, confidence, lift);
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

    private Set<Long> convertSetFromString(String stringSet){
        Set<Long> set = new HashSet<>();
        for (String str: stringSet.split(comma))
            set.add(Long.getLong(str));
        return set;
    }
}
