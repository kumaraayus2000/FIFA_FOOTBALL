
// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
// import { useLocation } from "react-router-dom";


// const PaymentForm = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const location = useLocation();
//   const amount = location.state?.amount || 0; 
//   const [discountedAmount, setDiscountedAmount] = useState(amount);


//   const handleApplyCoupon = () => {
//     if (couponCode === "danielpeters17") {
//       const discounted = amount * 0.75; // Apply 25% discount
//       setDiscountedAmount(discounted);
//       setMessage("Coupon applied! 25% discount applied.");
//     } else {
//       setMessage("Invalid coupon code.");
//     }
//   };

//   const handlePayment = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       // Request Payment Intent from backend
//       const response = await axios.post("http://localhost:8080/api/payment/create-payment-intent", {
//         amount: discountedAmount * 100, // Convert to cents
//       });

//       const { clientSecret } = response.data;

//       // Confirm Payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         setMessage(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         setMessage("Payment successful!");
//       }
//     } catch (error) {
//       setMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Pay ${discountedAmount}
//       </Typography>

//       <TextField
//         fullWidth
//         label="Coupon Code"
//         value={couponCode}
//         onChange={(e) => setCouponCode(e.target.value)}
//         margin="normal"
//         variant="outlined"
//       />
//       <Button
//         variant="outlined"
//         color="secondary"
//         fullWidth
//         sx={{ marginBottom: 3 }}
//         onClick={handleApplyCoupon}
//         disabled={!couponCode}
//       >
//         Apply Coupon
//       </Button>

//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               color: "#424770",
//               "::placeholder": {
//                 color: "#aab7c4",
//               },
//             },
//             invalid: {
//               color: "#9e2146",
//             },
//           },
//         }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ marginTop: 3 }}
//         onClick={handlePayment}
//         disabled={!stripe || loading}
//       >
//         {loading ? <CircularProgress size={24} /> : "Pay Now"}
//       </Button>

//       {message && (
//         <Typography variant="body1" color={message.includes("successful") || message.includes("Coupon applied") ? "green" : "red"} sx={{ marginTop: 2 }}>
//           {message}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default PaymentForm;


import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;
  const [discountedAmount, setDiscountedAmount] = useState(amount);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode === "danielpeters17") {
      const discounted = amount * 0.75; // Apply 25% discount
      setDiscountedAmount(discounted);
      setMessage("Coupon applied! 25% discount applied.");
    } else {
      setMessage("Invalid coupon code.");
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Request Payment Intent from backend
      const response = await axios.post("http://localhost:8080/api/payment/create-payment-intent", {
        amount: discountedAmount * 100, // Convert to cents
      });

      const { clientSecret } = response.data;

      // Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        setTimeout(() => {
          navigate("/success", { state: { amount: discountedAmount } }); // Redirect to success page
        }, 2000);
      }
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/betting"); // Redirect back to the betting page
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Pay ${discountedAmount}
      </Typography>

      <TextField
        fullWidth
        label="Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ marginBottom: 3 }}
        onClick={handleApplyCoupon}
        disabled={!couponCode}
      >
        Apply Coupon
      </Button>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
        onClick={handlePayment}
        disabled={!stripe || loading}
      >
        {loading ? <CircularProgress size={24} /> : "Pay Now"}
      </Button>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleCancel}
      >
        Cancel
      </Button>

      {message && (
        <Typography variant="body1" color={message.includes("successful") || message.includes("Coupon applied") ? "green" : "red"} sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default PaymentForm;
