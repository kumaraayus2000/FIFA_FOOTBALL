package edu.neu.csye6200.simulation;

import java.util.Random;

public class Defender extends AbstractPlayer{

    public Defender(int id, String position, String name) {
        Random random = new Random();
        // defender healthScore [65,85] inclusive both ends
        this.healthScore = random.nextInt(21) + 65;
        this.position = position;
        this.name = name;
        this.id = id;
    }
}
