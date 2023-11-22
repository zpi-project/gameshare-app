package com.zpi.backend.game_instance;

import com.zpi.backend.category.Category;
import com.zpi.backend.game.Game;
import com.zpi.backend.user.User;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class GameInstanceSpecification implements Specification<GameInstance> {
    private final GameInstanceSearch criteria;

    public GameInstanceSpecification(GameInstanceSearch ts) {
        criteria = ts;
    }

    @Override
    public Predicate toPredicate(Root<GameInstance> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        Path<Integer> pricePerDay = root.get("pricePerDay");
        Path<Game> game = root.get("game");
        Path<Integer> minPlayers = game.get("minPlayers");
        Path<Integer> maxPlayers = game.get("maxPlayers");
        Path<Integer> age = game.get("age");
        Path<String> name = game.get("name");
        Path<List<Category>> categories= game.get("categories");
        Path<User> owner = root.get("owner");
        Path<String> userUUID = owner.get("uuid");
        Path<Double> latitude = owner.get("locationLatitude");
        Path<Double> longitude = owner.get("locationLongitude");

        final List<Predicate> predicates = new ArrayList<>();
        if (criteria.getAge() != null) {
            predicates.add(cb.lessThanOrEqualTo(age, criteria.getAge()));
        }
        if (criteria.getPlayersNumber() != null) {
            predicates.add(cb.lessThanOrEqualTo(minPlayers, criteria.getPlayersNumber()));
            predicates.add(cb.greaterThanOrEqualTo(maxPlayers, criteria.getPlayersNumber()));
        }
        if (criteria.getCategory() != null) {
            predicates.add(cb.isMember(criteria.getCategory(), categories));
        }
        if (criteria.getSearchName() != null) {
            predicates.add(
                    cb.like(
                            cb.lower(name),
                            "%" + criteria.getSearchName().toLowerCase() + "%")
            );
        }
        if (criteria.getMaxPricePerDay() != null) {
            predicates.add(cb.lessThanOrEqualTo(pricePerDay, criteria.getMaxPricePerDay()));
        }
        if (criteria.getUserUUID() != null) {
            predicates.add(cb.equal(userUUID, criteria.getUserUUID()));
        }
        if (criteria.getUserUUID() != null) {
            predicates.add(cb.notEqual(userUUID, criteria.getLoggedInUser()));
        }

        Expression<Double> orderExpression =
                cb.sqrt(cb.sum(cb.power(cb.diff(latitude, criteria.getLatitude()), 2),
                        cb.power(cb.diff(longitude, criteria.getLongitude()), 2)));
        query.orderBy(cb.asc(orderExpression));
        return cb.and(predicates.toArray(new Predicate[0]));
    }
}


