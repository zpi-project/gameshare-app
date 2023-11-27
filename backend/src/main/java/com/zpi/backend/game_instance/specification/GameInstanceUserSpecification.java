package com.zpi.backend.game_instance.specification;

import com.zpi.backend.game.Game;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.user.User;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class GameInstanceUserSpecification implements Specification<GameInstance> {
    private final GameInstanceUserSearch criteria;

    public GameInstanceUserSpecification(GameInstanceUserSearch ts) {
        criteria = ts;
    }

    @Override
    public Predicate toPredicate(Root<GameInstance> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        Path<Boolean> active = root.get("isActive");
        Path<Game> game = root.get("game");
        Path<String> name = game.get("name");
        Path<User> owner = root.get("owner");
        Path<String> userUUID = owner.get("uuid");

        final List<Predicate> predicates = new ArrayList<>();

        if (criteria.getSearchName() != null) {
            predicates.add(
                    cb.like(
                            cb.lower(name),
                            "%" + criteria.getSearchName().toLowerCase() + "%")
            );
        }

        if (criteria.getUserUUID() != null) {
            predicates.add(cb.equal(userUUID, criteria.getUserUUID()));
        }

        if (criteria.getActive() != null) {
            predicates.add(cb.equal(active, criteria.getActive()));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}


