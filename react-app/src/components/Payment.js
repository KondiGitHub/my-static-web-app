import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your-publishable-key-here");

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <h2>Payment</h2>
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default Payment;