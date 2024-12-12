package edu.neu.csye6200.simulation;

public class PlayerFactory {
    public AbstractPlayer getObject(int id, String position, String name){
        if (position.equalsIgnoreCase("Defender")){
            return new DefenderFactory().getObject(id, position, name);
        } else if (position.equalsIgnoreCase("Forward")) {
            return new ForwardFactory().getObject(id, position, name);
        } else if (position.equalsIgnoreCase("Midfielder")) {
            return new MidfielderFactory().getObject(id, position, name);
        } else if (position.equalsIgnoreCase("Goalkeeper")) {
            return new GoalkeeperFactory().getObject(id, position, name);
        }
        return null;
    }
}
