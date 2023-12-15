package com.zpi.backend.user;

import com.zpi.backend.game.Game;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.game_instance.specification.GameInstanceSearch;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserSpecification implements Specification<User> {
    private final GameInstanceSearch criteria;

    public UserSpecification(GameInstanceSearch ts) {
        criteria = ts;
    }

    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        Join<User, GameInstance> gameInstances = root.join("gameInstances", JoinType.INNER);
        Join<GameInstance, Game> game = gameInstances.join("game", JoinType.INNER);
        final List<Predicate> predicates = new ArrayList<>();

        if (criteria.getAge() != null) {
            predicates.add(cb.lessThanOrEqualTo(game.get("age"), criteria.getAge()));
        }

        if (criteria.getPlayersNumber() != null) {
            predicates.add(cb.lessThanOrEqualTo(game.get("minPlayers"), criteria.getPlayersNumber()));
            predicates.add(cb.greaterThanOrEqualTo(game.get("maxPlayers"), criteria.getPlayersNumber()));
        }

        if (criteria.getCategory() != null) {
            predicates.add(cb.isMember(criteria.getCategory(), game.get("categories")));
        }

        if (criteria.getSearchName() != null) {
            predicates.add(
                    cb.like(
                            cb.lower(game.get("name")),
                            "%" + criteria.getSearchName().toLowerCase() + "%")
            );
        }

        if (criteria.getMaxPricePerDay() != null) {
            predicates.add(cb.lessThanOrEqualTo(gameInstances.get("pricePerDay"), criteria.getMaxPricePerDay()));
        }

        if (criteria.getUserUUID() != null) {
            predicates.add(cb.equal(root.get("uuid"), criteria.getUserUUID()));
        }
        if (criteria.getLoggedInUser() != null) {
            predicates.add(cb.notEqual(root.get("uuid"), criteria.getLoggedInUser()));
        }

        // Only active games
        predicates.add(cb.equal(gameInstances.get("isActive"), true));
        query.groupBy(root);

        if (criteria.getLatitude() != null && criteria.getLongitude() != null) {
            predicates.add(cb.isNotNull(root.get("locationLatitude")));
            predicates.add(cb.isNotNull(root.get("locationLongitude")));
            Expression<Double> orderExpression =
                    cb.sqrt(
                            cb.sum(
                                    cb.power(cb.diff(root.get("locationLatitude"), criteria.getLatitude()), 2),
                                    cb.power(cb.diff(root.get("locationLongitude"), criteria.getLongitude()), 2)
                            )
                    );
            query.orderBy(cb.asc(orderExpression));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}


