package edu.neu.csye6200.simulation;

public abstract class AbstractPlayerFactory {
    public abstract AbstractPlayer getObject(int id, String position, String name);
}
