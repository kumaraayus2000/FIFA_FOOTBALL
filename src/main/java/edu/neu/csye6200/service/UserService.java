package edu.neu.csye6200.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.neu.csye6200.model.User;
import edu.neu.csye6200.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService implements UserServiceInterface{
	@Autowired
	private UserRepository userRepository;

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// Add user to the database
	public User addUser(Object user) {
		return userRepository.save((User)user);
	}

	// Delete user from the database by ID
	public void deleteUser(int id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
		userRepository.delete(user);
	}

	public User updateUser(int id, User updatedUser) {
		// Fetch the existing user by ID
		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

		// Update the fields
		existingUser.setName(updatedUser.getName());
		existingUser.setAge(updatedUser.getAge());
		existingUser.setNationality(updatedUser.getNationality());
		existingUser.setPosition(updatedUser.getPosition());

		// Save the updated user back to the database
		return userRepository.save(existingUser);
	}
}
