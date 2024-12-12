package edu.neu.csye6200.simulation;

import java.util.Random;

public class Goalkeeper extends AbstractPlayer{

    public Goalkeeper(int id, String position, String name) {
        Random random = new Random();
        // goalkeeper healthScore [80,95] inclusive both ends
        this.healthScore = random.nextInt(16) + 80;
        this.position = position;
        this.name = name;
        this.id = id;
    }
}
