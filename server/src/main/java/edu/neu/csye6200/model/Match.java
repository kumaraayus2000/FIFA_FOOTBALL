package edu.neu.csye6200.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "matches", schema = "public")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "teama", nullable = false)
    private String teamA;

    @Column(name = "teamb", nullable = false)
    private String teamB;

    @Column(nullable = false)
    private String venue;

    @Column(name = "match_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date matchDate;

    @Column(name = "teamA vs teamB: socreA-scoreB (format)")
    private String score;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public Date getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(Date matchDate) {
        this.matchDate = matchDate;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }
}
