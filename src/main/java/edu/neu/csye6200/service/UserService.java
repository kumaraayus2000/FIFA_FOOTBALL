package edu.neu.csye6200.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.neu.csye6200.model.User;
import edu.neu.csye6200.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// Add user to the database
	public User addUser(User user) {
		return userRepository.save(user);
	}

	// Delete user from the database by ID
	public void deleteUser(int id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
		userRepository.delete(user);
	}
}
