package com.zpi.backend.game_instance.specification;

import com.zpi.backend.game.Game;
import com.zpi.backend.game_instance.GameInstance;
import com.zpi.backend.user.User;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class GameInstanceOpinionsSpecification implements Specification<GameInstance> {
    private final GameInstanceOpinionSearch criteria;

    public GameInstanceOpinionsSpecification(GameInstanceOpinionSearch ts) {
        criteria = ts;
    }

    @Override
    public Predicate toPredicate(Root<GameInstance> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

        Path<Game> game = root.get("game");
        Path<Long> gameId = game.get("id");
        Path<User> owner = root.get("owner");
        Path<Double> latitude = owner.get("locationLatitude");
        Path<Double> longitude = owner.get("locationLongitude");

        final List<Predicate> predicates = new ArrayList<>();
        if (criteria.getGameId() != null) {
            predicates.add(cb.equal(gameId, criteria.getGameId()));
        }
        Expression<Double> orderExpression =
                cb.sqrt(cb.sum(cb.power(cb.diff(latitude, criteria.getLatitude()), 2),
                        cb.power(cb.diff(longitude, criteria.getLongitude()), 2)));
        query.orderBy(cb.asc(orderExpression));
        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
