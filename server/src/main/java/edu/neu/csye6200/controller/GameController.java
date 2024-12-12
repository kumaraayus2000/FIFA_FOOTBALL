package edu.neu.csye6200.controller;

import edu.neu.csye6200.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    // Simulate a game and calculate bet outcome
    @PostMapping("/{matchId}/simulate")
    public ResponseEntity<Map<String, Object>> simulateGame(
            @PathVariable int matchId,
            @RequestParam String teamName,
            @RequestParam double betAmount) {
        Map<String, Object> result = gameService.simulateGameWithBet(matchId, teamName, betAmount);
        return ResponseEntity.ok(result);
    }
}
