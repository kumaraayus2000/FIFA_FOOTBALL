package edu.neu.csye6200.service;

import java.util.List;

import edu.neu.csye6200.model.Player;

public interface PlayerServiceInterface {

	List<Player> getAllPlayers();

	Player addPlayer(Object player);

	void deletePlayer(int id);

}
