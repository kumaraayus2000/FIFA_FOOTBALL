package edu.neu.csye6200.simulation;

public class DefenderFactory extends AbstractPlayerFactory{
    @Override
    public AbstractPlayer getObject(int id, String position, String name) {
        return new Defender(id, position, name);
    }
}
