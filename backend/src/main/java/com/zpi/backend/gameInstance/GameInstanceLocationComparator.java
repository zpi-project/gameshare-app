package com.zpi.backend.gameInstance;

import java.util.Comparator;

public class GameInstanceLocationComparator implements Comparator<GameInstance> {
    @Override
    public int compare(GameInstance o1, GameInstance o2) {
        return (int) Math.sqrt(o1.getOwner().getLocationLatitude() + o2.getOwner().getLocationLatitude() +
                o1.getOwner().getLocationLongitude() + o2.getOwner().getLocationLongitude())*100000000;
    }
}
