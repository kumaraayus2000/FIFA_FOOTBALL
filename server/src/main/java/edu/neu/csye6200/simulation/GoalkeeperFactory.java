package edu.neu.csye6200.simulation;

public class GoalkeeperFactory extends AbstractPlayerFactory{
    @Override
    public AbstractPlayer getObject(int id, String position, String name) {
        return new Goalkeeper(id, position, name);
    }
}
