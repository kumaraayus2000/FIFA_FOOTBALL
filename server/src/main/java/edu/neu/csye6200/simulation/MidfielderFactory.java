package edu.neu.csye6200.simulation;

public class MidfielderFactory extends AbstractPlayerFactory{
    @Override
    public AbstractPlayer getObject(int id, String position, String name) {
        return new Midfielder(id, position, name);
    }
}
