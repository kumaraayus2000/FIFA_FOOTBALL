package edu.neu.csye6200.controller;


import java.util.ArrayList;

public class GameDetailVo implements Cloneable{
    String venue;
    String teamName1;
    String teamName2;
    ArrayList<Integer> team1;
    ArrayList<Integer> team2;

    public String getVenue() {
        return venue;
    }

    public String getTeamName1() {
        return teamName1;
    }

    public String getTeamName2() {
        return teamName2;
    }

    public ArrayList<Integer> getTeam1() {
        return team1;
    }

    public ArrayList<Integer> getTeam2() {
        return team2;
    }
}
