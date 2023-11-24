package com.zpi.backend.recommendation;

import java.util.*;

public class AprioriAlgorithm {

    private final int minSupport;
    private final int noOfTransactions;
    private final double minConfidence;
    private final List<Set<Long>> transactions;
    private final List<Set<Long>> itemSet;
    private final Map<Set<Long>, Integer> itemsSupport;

    public AprioriAlgorithm(int minSupport, double minConfidence, List<Set<Long>> transactions) {
        this.minSupport = minSupport;
        this.minConfidence = minConfidence;
        this.transactions = transactions;
        noOfTransactions = transactions.size();
        itemSet = new ArrayList<>();
        itemsSupport = new HashMap<>();
    }

    public void run(){
        createItemSet();
        printInfo();
        aprioriStart();
    }

    private void createItemSet(){
        for(Set<Long> items : transactions)
            for(Long i: items)
                if (!(itemSet.contains(Set.of(i))))
                    itemSet.add(Set.of(i));
    }

    private void printInfo(){
        System.out.println("---------------------------------------------");
        System.out.println("No of Items = "+ itemSet.size());
        System.out.println("No of Transactions = " + noOfTransactions);
        System.out.println("Minimum Support = "+ minSupport);
        System.out.println("Minimum Confidence = "+minConfidence);
        System.out.println("---------------------------------------------");
    }

    private void addItemsToMapOverMinSupport(List<Set<Long>> setsToVerify) {
        for(Set<Long> item: setsToVerify) {
            int countItemOccurrence=0;
            for(Set<Long> transaction: transactions)
                if(transaction.containsAll(item))
                    countItemOccurrence++;

            if(countItemOccurrence >= minSupport) {
                itemsSupport.put(item, countItemOccurrence);
            }
        }
    }

    private void aprioriStart() {
        addItemsToMapOverMinSupport(itemSet);
        List<Set<Long>> combinations = itemsSupport.keySet().stream().toList();

        while(combinations.size()>1) {
            combinations = generateCombinations(combinations);
            addItemsToMapOverMinSupport(combinations);
        }

        System.out.println(itemsSupport);
//        generateAssociationRules();
    }

    private void generateCombinationsHelper(List<Long> set, int n, int start, List<Long> current, List<Set<Long>> result) {
        if (current.size() == n) {
            result.add(new HashSet<>(current));
            return;
        }

        for (int i = start; i < set.size(); i++) {
            current.add(set.get(i));
            generateCombinationsHelper(set, n, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }

    private List<Set<Long>> generateCombinations(List<Set<Long>> combinations){
        List<Set<Long>> newCombinations = new ArrayList<>();
        int combinationLength = combinations.get(0).size() + 1;
        Set<Long> allInOneSet = new HashSet<>();
        for (Set<Long> c : combinations)
            allInOneSet.addAll(c);
        generateCombinationsHelper(allInOneSet.stream().toList(), combinationLength, 0, new ArrayList<>(), newCombinations);
        return newCombinations;
    }

}
