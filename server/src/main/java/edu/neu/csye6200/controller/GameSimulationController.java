package edu.neu.csye6200.controller;

import edu.neu.csye6200.service.GameService;
import edu.neu.csye6200.service.GameSimulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/gamesim")
public class GameSimulationController {

    @Autowired
    private GameSimulationService gameSimulationService;

    // Simulate a game with preselected team players
    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startSimulateGame(
             @RequestBody GameDetailVo gameDetailVo){
        Map<String, Object> result = gameSimulationService.startGame(gameDetailVo.getVenue(), gameDetailVo.getTeamName1(),
                gameDetailVo.getTeamName2(), gameDetailVo.getTeam1(), gameDetailVo.getTeam2());
        return ResponseEntity.ok(result);
    }
}
