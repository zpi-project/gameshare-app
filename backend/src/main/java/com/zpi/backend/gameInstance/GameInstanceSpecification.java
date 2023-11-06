package com.zpi.backend.gameInstance;

import com.zpi.backend.category.Category;
import com.zpi.backend.game.Game;
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

        Path<Game> game = root.get("game");
        Path<Integer> minPlayers = game.get("minPlayers");
        Path<Integer> maxPlayers = game.get("maxPlayers");
        Path<Integer> age = game.get("age");
        Path<String> name = game.get("name");
        Path<List<Category>> categories= game.get("categories");


        final List<Predicate> predicates = new ArrayList<>();
        if (criteria.getAge() != null) {
            predicates.add(cb.greaterThan(age, criteria.getAge()));
        }
        if (criteria.getPlayersNumber() != null) {
            predicates.add(cb.lessThanOrEqualTo(minPlayers, criteria.getPlayersNumber()));
            predicates.add(cb.greaterThanOrEqualTo(maxPlayers, criteria.getPlayersNumber()));
        }
        if (criteria.getCategoryId() != null) {
            predicates.add(cb.isMember(criteria.getCategoryId(), categories.get("id")));
        }
        if (criteria.getSearchName() != null) {
            predicates.add(cb.like(name, "%" + criteria.getSearchName() + "%"));
        }
        return cb.and(predicates.toArray(new Predicate[predicates.size()]));
    }
}


