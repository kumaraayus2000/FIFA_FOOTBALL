package edu.neu.csye6200.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.neu.csye6200.model.User;
import edu.neu.csye6200.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	// POST endpoint to add a user
	@PostMapping
	public ResponseEntity<User> addUser(@RequestBody User user) {
		User savedUser = userService.addUser(user);
		return ResponseEntity.ok(savedUser); // Returns the saved user
	}

	// DELETE endpoint to delete a user by ID
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable int id) {
		userService.deleteUser(id);
		return ResponseEntity.ok("User deleted successfully");
	}

	@GetMapping("/users")
	public void getAllUsernames() {
		List<User> users = userService.getAllUsers();
		users.forEach(user -> System.out.println("Username: " + user.getName()));
	}
}
