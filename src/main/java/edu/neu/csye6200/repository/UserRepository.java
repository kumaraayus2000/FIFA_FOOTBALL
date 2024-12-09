package edu.neu.csye6200.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.neu.csye6200.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	// Custom query methods (if needed) can be added here.
}
