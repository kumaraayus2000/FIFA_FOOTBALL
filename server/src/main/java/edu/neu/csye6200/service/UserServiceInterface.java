package edu.neu.csye6200.service;

import edu.neu.csye6200.model.User;

import java.util.List;

public interface UserServiceInterface {

    List<User> getAllUsers();

    User addUser(Object user);

    void deleteUser(int id);

}
