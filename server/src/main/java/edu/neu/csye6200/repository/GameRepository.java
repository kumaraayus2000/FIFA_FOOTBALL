package edu.neu.csye6200.repository;

import org.springframework.stereotype.Repository;

import edu.neu.csye6200.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
}