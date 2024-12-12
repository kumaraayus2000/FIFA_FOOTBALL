package edu.neu.csye6200.service;


import edu.neu.csye6200.model.Match;
import edu.neu.csye6200.model.Player;
import edu.neu.csye6200.repository.PlayerRepository;
import edu.neu.csye6200.simulation.AbstractPlayer;
import edu.neu.csye6200.simulation.PlayerFactory;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class GameSimulationService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private MatchService matchService;

    // Simulate a game and process betting logic
    public Map<String, Object> startGame(String venue,
                                         String teamName1,
                                         String teamName2,
                                         ArrayList<Integer> team1,
                                         ArrayList<Integer> team2) {
        Match match = new Match();
        match.setTeamA(teamName1);
        match.setTeamB(teamName2);
        match.setVenue(venue);
        match.setMatchDate(new Date());
        // initialize a playerFactory
        PlayerFactory playerFactory = new PlayerFactory();

        List<AbstractPlayer> team1Players = new ArrayList<>();
        for (Integer i: team1){
            Player player = playerRepository.findById(i)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + i));
            AbstractPlayer ap = playerFactory.getObject(player.getId(), player.getPosition(), player.getName());
            team1Players.add(ap);
        }

        List<AbstractPlayer> team2Players = new ArrayList<>();
        for (Integer i: team2){
            Player player = playerRepository.findById(i)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + i));
            AbstractPlayer ap = playerFactory.getObject(player.getId(), player.getPosition(), player.getName());
            team2Players.add(ap);
        }

        // Compute winning team
        int scoreA = team1Players.stream()
                .mapToInt(AbstractPlayer::getHealthScore)
                .sum();

        int scoreB = team2Players.stream()
                .mapToInt(AbstractPlayer::getHealthScore)
                .sum();

        String score = "";
        String winner = "";
        if (scoreA > scoreB){
            score = "1-0";
            winner = teamName1;
        } else if (scoreA == scoreB) {
            score = "0-0";
            winner = "draw";
        } else if (scoreA < scoreB) {
            score = "0-1";
            winner = teamName2;
        }

        match.setScore(score);

        // Each player's score is dropped 5% after each match
        // The player is non-playable is score is below 60
        List<String> idsBelow60Team1 = team1Players.stream()
                .peek(p -> p.setHealthScore((int) (p.getHealthScore() * 0.95)))
                .filter(p -> p.getHealthScore() < 60)
                .map(AbstractPlayer::getName)
                .collect(Collectors.toList());

        List<String> idsBelow60Team2 = team2Players.stream()
                .peek(p -> p.setHealthScore((int) (p.getHealthScore() * 0.95)))
                .filter(p -> p.getHealthScore() < 60)
                .map(AbstractPlayer::getName)
                .collect(Collectors.toList());


        // Prepare the response
        Map<String, Object> result = new HashMap<>();
        result.put("idsBelow60Team1", idsBelow60Team1);
        result.put("idsBelow60Team2", idsBelow60Team2);
        result.put("winner", winner);

        matchService.createMatch(match);
        return result;
    }
}