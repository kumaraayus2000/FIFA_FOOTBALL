package edu.neu.csye6200.service;

import edu.neu.csye6200.model.Game;
import edu.neu.csye6200.model.Match;
import edu.neu.csye6200.repository.GameRepository;
import edu.neu.csye6200.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private MatchService matchService;

    @Autowired
    private WinnerService winnerService;

    // Simulate a game and process betting logic
    public Map<String, Object> simulateGameWithBet(int matchId, String teamName, double betAmount) {
        // Fetch match details from Match table
        Match match = matchService.getMatchById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found with ID: " + matchId));

        // Create and save a new game in the Game table
        Game game = new Game();
        game.setTeamA(match.getTeamA());
        game.setTeamB(match.getTeamB());
        game.setGameDate(match.getMatchDate().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime()); // Convert Date to LocalDateTime
        gameRepository.save(game);

        // Determine winner
        String winner = winnerService.determineWinner(game.getTeamA(), game.getTeamB());
        game.setWinner(winner);

        // Save the updated game result
        gameRepository.save(game);

        // Calculate betting outcome
        boolean isWinner = winner.equalsIgnoreCase(teamName);
        double outcome = isWinner ? betAmount * 2 : -betAmount;

        // Prepare the response
        Map<String, Object> result = new HashMap<>();
        result.put("game", game);
        result.put("teamChosen", teamName);
        result.put("winner", winner);
        result.put("betAmount", betAmount);
        result.put("outcome", outcome);
        result.put("status", isWinner ? "You won!" : "You lost!");

        return result;
    }
}