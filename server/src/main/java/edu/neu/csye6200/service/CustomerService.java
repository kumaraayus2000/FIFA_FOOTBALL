package edu.neu.csye6200.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.neu.csye6200.model.Customer;
import edu.neu.csye6200.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Register a new customer
    @Transactional
    public Customer registerCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Authenticate a customer (login)
    @Transactional(readOnly = true)
    public Optional<Customer> loginCustomer(String email, String password) {
        return customerRepository.findByEmail(email)
                .filter(customer -> customer.getPassword().equals(password));
    }

    // Update customer profile
    @Transactional
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
    @Transactional(readOnly = true)
    public Optional<Customer> getCustomerById(int id) {
        return customerRepository.findById(id);
    }
}