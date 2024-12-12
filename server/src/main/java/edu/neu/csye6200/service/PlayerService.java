package edu.neu.csye6200.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.neu.csye6200.model.Player;
import edu.neu.csye6200.repository.PlayerRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PlayerService implements PlayerServiceInterface {
	@Autowired
	private PlayerRepository playerRepository;

	public List<Player> getAllPlayers() {
		return playerRepository.findAll();
	}

	// Add user to the database
	public Player addPlayer(Object player) {
		return playerRepository.save((Player) player);
	}

	// Delete user from the database by ID
	public void deletePlayer(int id) {
		Player player = playerRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Player not found with ID: " + id));
		playerRepository.delete(player);
	}

	public Player updatePlayer(int id, Player updatedPlayer) {
		// Fetch the existing user by ID
		Player existingPlayer = playerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Player not found with ID: " + id));

		// Update the fields
		existingPlayer.setName(updatedPlayer.getName());
		existingPlayer.setAge(updatedPlayer.getAge());
		existingPlayer.setNationality(updatedPlayer.getNationality());
		existingPlayer.setPosition(updatedPlayer.getPosition());
		existingPlayer.setPosition(updatedPlayer.getAvatar());

		// Save the updated user back to the database
		return playerRepository.save(existingPlayer);
	}
}
