package com.zpi.backend.recommendation;

import java.util.*;

public class AprioriAlgorithm {

    private final double minSupport;
    private final int noOfTransactions;
    private final double minConfidence;
    private final List<Set<Long>> transactions;
    private final List<Set<Long>> itemSet;
    private final Map<Set<Long>, Integer> frequentItemSets;

    public AprioriAlgorithm(double minSupport, double minConfidence, List<Set<Long>> transactions) {
        this.minSupport = minSupport;
        this.minConfidence = minConfidence;
        this.transactions = transactions;
        noOfTransactions = transactions.size();
        itemSet = new ArrayList<>();
        frequentItemSets = new HashMap<>();
    }

    public List<AssociationRule> run() {
        createItemSet();
        printInfo();
        aprioriStart();
        return generateAssociationRules();
    }

    private void createItemSet() {
        for (Set<Long> items : transactions)
            for (Long i : items)
                if (!(itemSet.contains(Set.of(i))))
                    itemSet.add(Set.of(i));
    }

    private void printInfo() {
        System.out.println("---------------------------------------------");
        System.out.println("No of Items = " + itemSet.size());
        System.out.println("No of Transactions = " + noOfTransactions);
        System.out.println("Minimum Support = " + minSupport);
        System.out.println("Minimum Confidence = " + minConfidence);
        System.out.println("---------------------------------------------");
    }

    private void addFrequentItemSets(List<Set<Long>> setsToVerify) {
        for (Set<Long> item : setsToVerify) {
            int countItemOccurrence = 0;
            for (Set<Long> transaction : transactions)

                if (transaction.containsAll(item))
                    countItemOccurrence++;

            if ((double) countItemOccurrence /noOfTransactions >= minSupport) {
                frequentItemSets.put(item, countItemOccurrence);
            }
        }
    }

    private void aprioriStart() {
        addFrequentItemSets(itemSet);
        List<Set<Long>> candidates = frequentItemSets.keySet().stream().toList();

        while (candidates.size() > 1) {
            candidates = generateCandidates(candidates);
            addFrequentItemSets(candidates);
        }
    }

    private void generateCandidatesHelper(List<Long> set, int n, int start, List<Long> current,
                                          List<Set<Long>> result) {
        if (current.size() == n) {
            result.add(new HashSet<>(current));
            return;
        }

        for (int i = start; i < set.size(); i++) {
            current.add(set.get(i));
            generateCandidatesHelper(set, n, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }

    private List<Set<Long>> generateCandidates(List<Set<Long>> candidates) {
        List<Set<Long>> nextFrequentItemSet = new ArrayList<>();
        int combinationLength = candidates.get(0).size() + 1;
        Set<Long> allInOneSet = new HashSet<>();
        for (Set<Long> c : candidates)
            allInOneSet.addAll(c);
        generateCandidatesHelper(allInOneSet.stream().toList(), combinationLength, 0,
                new ArrayList<>(), nextFrequentItemSet);
        return nextFrequentItemSet;
    }

    private List<Set<Long>> generateSubsets(Set<Long> itemset, int i){
        List<Set<Long>> subsets = new ArrayList<>();
        generateSubsetsHelper(itemset.stream().toList(), i, 0, new ArrayList<>(), subsets);
        return subsets;
    }

    private void generateSubsetsHelper(List<Long> set, int i, int start, List<Long> currentSubset, List<Set<Long>> subsets) {
        if (currentSubset.size() == i) {
            subsets.add(new HashSet<>(currentSubset));
            return;
        }

        for (int index = start; index < set.size(); index++) {
            currentSubset.add(set.get(index));
            generateSubsetsHelper(set, i, index + 1, currentSubset, subsets);
            currentSubset.remove(currentSubset.size() - 1);
        }
    }

    public List<AssociationRule> generateAssociationRules() {
        List<AssociationRule> rules = new ArrayList<>();

        for (Set<Long> itemset : frequentItemSets.keySet()) {
            for (int i = 1; i < itemset.size(); i++) {
                List<Set<Long>> antecedents = generateSubsets(itemset, i);

                for (Set<Long> antecedent : antecedents) {
                    Set<Long> consequent = new HashSet<>(itemset);
                    consequent.removeAll(antecedent);

                    double support = calculateSupport(itemset);
                    double confidence = calculateConfidence(itemset, antecedent);

                    if (support >= minSupport && confidence >= minConfidence) {
                        rules.add(new AssociationRule(antecedent, consequent,
                                support, confidence));
                    }
                }
            }
        }
        return rules;
    }

    private double calculateSupport(Set<Long> itemset) {
        return (double) this.frequentItemSets.get(itemset) / this.noOfTransactions;
    }

    private double calculateConfidence(Set<Long> itemset, Set<Long> antecedent) {
        double supportAntecedent = calculateSupport(antecedent);
        double supportCombined = calculateSupport(itemset);

        // Avoid division by zero
        if (supportAntecedent == 0) {
            return 0.0;
        }

        return supportCombined/supportAntecedent;
    }
}
