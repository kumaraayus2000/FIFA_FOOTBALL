package edu.neu.csye6200.service;


import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class RandomWinnerService implements WinnerService {
    @Override
    public String determineWinner(String teamA, String teamB) {
        Random random = new Random();
        return random.nextBoolean() ? teamA : teamB;
    }
}