package edu.neu.csye6200.simulation;

public class ForwardFactory extends AbstractPlayerFactory{
    @Override
    public AbstractPlayer getObject(int id, String position, String name) {
        return new Forward(id, position, name);
    }
}
