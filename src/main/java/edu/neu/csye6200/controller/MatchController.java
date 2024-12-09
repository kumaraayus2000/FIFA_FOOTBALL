package edu.neu.csye6200.controller;

import edu.neu.csye6200.model.Match;
import edu.neu.csye6200.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    @Autowired
    private MatchService matchService;

    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        Match savedMatch = matchService.createMatch(match);
        return ResponseEntity.ok(savedMatch);
    }

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        List<Match> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable int id) {
        return matchService.getMatchById(id)
                .map(match -> ResponseEntity.ok(match))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
