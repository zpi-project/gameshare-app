package com.zpi.backend.recommendation;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssociationRule {

    private static final String comma = ",";

    private Set<Long> antecedent;

    private Set<Long> consequent;

    private double support;

    private double confidence;

    private double lift;

    public AssociationRule(AssociationRuleDB associationRuleDB){
        this.antecedent = convertSetFromString(associationRuleDB.getAntecedentStr());
        this.consequent = convertSetFromString(associationRuleDB.getConsequentStr());
        this.lift = associationRuleDB.getLift();
        this.support = associationRuleDB.getSupport();
        this.confidence = associationRuleDB.getConfidence();
    }

    public AssociationRule(Set<Long> antecedent, Set<Long> consequent, double support, double confidence) {
        this.antecedent = antecedent;
        this.consequent = consequent;
        this.support = support;
        this.confidence = confidence;
        this.lift = (confidence == 0) ? 0 : support / confidence;
    }

    private Set<Long> convertSetFromString(String stringSet){
        Set<Long> set = new HashSet<>();
        for (String str: stringSet.split(comma))
            set.add(Long.parseLong(str));
        return set;
    }
}
