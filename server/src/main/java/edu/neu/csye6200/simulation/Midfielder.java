package edu.neu.csye6200.simulation;

import java.util.Random;

public class Midfielder extends AbstractPlayer{

    public Midfielder(int id, String position, String name) {
        Random random = new Random();
        // midfielder healthScore [75,90] inclusive both ends
        this.healthScore = random.nextInt(16) + 75;
        this.position = position;
        this.name = name;
        this.id = id;
    }
}
