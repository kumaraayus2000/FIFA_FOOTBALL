package edu.neu.csye6200.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> request) {
        Stripe.apiKey = stripeApiKey;

        try {
            // Retrieve amount from the request
            int amount = (int) request.get("amount"); // Amount in cents
            String currency = (String) request.getOrDefault("currency", "usd");

            // Create Payment Intent
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", currency);
            params.put("payment_method_types", new String[]{"card"});

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Respond with the Payment Intent Client Secret
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());
            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
