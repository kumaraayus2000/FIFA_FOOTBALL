package edu.neu.csye6200.simulation;

import java.util.Random;

public class Forward extends AbstractPlayer{

    public Forward(int id, String position, String name) {
        Random random = new Random();
        // forward healthScore [60,80] inclusive both ends
        this.healthScore = random.nextInt(21) + 60;
        this.position = position;
        this.name = name;
        this.id = id;
    }
}
