package edu.neu.csye6200.simulation;

public class AbstractPlayer {
    // id is same as id from Player table
    protected int id;
    // health score ranking from high to low based on position (prone to injury during the game)
    // from low to high: forward, defender, midfielder, goalkeeper
    // forward healthScore [60,80] inclusive both ends
    // defender healthScore [65,85] inclusive both ends
    // midfielder healthScore [75,90] inclusive both ends
    // goalkeeper healthScore [80,95] inclusive both ends
    protected int healthScore;
    protected String position;
    protected String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(int healthScore) {
        this.healthScore = healthScore;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
