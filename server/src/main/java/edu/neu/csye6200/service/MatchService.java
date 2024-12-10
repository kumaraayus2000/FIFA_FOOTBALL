package edu.neu.csye6200.service;

import edu.neu.csye6200.model.Match;
import edu.neu.csye6200.repository.MatchRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;

    @Transactional
    public Match createMatch(Match match) {
        return matchRepository.save(match); // Save the Match entity to the database
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(int id) {
        return matchRepository.findById(id);
    }
}