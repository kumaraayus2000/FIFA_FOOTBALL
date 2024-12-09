package edu.neu.csye6200.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.neu.csye6200.model.Customer;
import edu.neu.csye6200.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Register a new customer
    public Customer registerCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Authenticate a customer (login)
    public Optional<Customer> loginCustomer(String email, String password) {
        return customerRepository.findByEmail(email)
                .filter(customer -> customer.getPassword().equals(password));
    }

    // Update customer profile
    public Customer updateCustomer(int id, Customer updatedCustomer) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));

        // Update fields
        existingCustomer.setUsername(updatedCustomer.getUsername());
        existingCustomer.setAvatar(updatedCustomer.getAvatar());
        existingCustomer.setBio(updatedCustomer.getBio());

        return customerRepository.save(existingCustomer);
    }

    // Get a customer by ID
    public Optional<Customer> getCustomerById(int id) {
        return customerRepository.findById(id);
    }
}
