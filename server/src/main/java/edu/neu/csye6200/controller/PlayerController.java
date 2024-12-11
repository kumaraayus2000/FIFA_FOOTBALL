package edu.neu.csye6200.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.neu.csye6200.model.Player;
import edu.neu.csye6200.service.PlayerService;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

	@Autowired
	private PlayerService playerService;

	// POST endpoint to add a player
	@PostMapping
	public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
		Player savedPlayer = playerService.addPlayer(player);
		return ResponseEntity.ok(savedPlayer); // Returns the saved user
	}

	// DELETE endpoint to delete a player by ID
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePlayer(@PathVariable int id) {
		playerService.deletePlayer(id);
		return ResponseEntity.ok("Player deleted successfully");
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/players")
	public ResponseEntity<List<Map<String, Object>>> getAllPlayerNames() {
		List<Player> players = playerService.getAllPlayers();

		List<Map<String, Object>> response = players.stream().map(player -> {
			Map<String, Object> playerDetails = new HashMap<>();
			playerDetails.put("id", player.getId());
			playerDetails.put("name", player.getName());
			playerDetails.put("age", player.getAge());
			playerDetails.put("nationality", player.getNationality());
			playerDetails.put("position", player.getPosition());
			playerDetails.put("avatar", player.getAvatar());
			return playerDetails;
		}).collect(Collectors.toList());

		return ResponseEntity.ok(response);

	}

	@PutMapping("/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable int id, @RequestBody Player updatedPlayer) {
		Player player = playerService.updatePlayer(id, updatedPlayer);
		return ResponseEntity.ok(player); // Return the updated player in the response
	}
}
