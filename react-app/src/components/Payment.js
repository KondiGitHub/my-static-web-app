import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import axios from 'axios'; // If you're using axios
import { CartContext } from '../CartContext';

function Payment() {

 const { cart } = useContext(CartContext);
 const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ clientSecret, setClientSecret ] = useState('');
  const [ stripePromise, setStripePromise ] = useState('');
  const [data, setData] = useState(null);
  const [dataToSend, setDataToSend] = useState({
    orderAmount: totalPrice
  });
  

  useEffect(() => {

    const getPubKey = async () => {
      const res = await axios.get('https://samplenode-dxa9fdevhecvcbez.eastus2-01.azurewebsites.net/api/config');
      const { publishableKey } = res.data;
      const stripePromiseTemp = loadStripe(publishableKey);
      setStripePromise(stripePromiseTemp);
    }
   

    const postData = async () => {
      try {
        const res = await axios.post(
          "https://samplenode-dxa9fdevhecvcbez.eastus2-01.azurewebsites.net/api/create-payment-intent",
          dataToSend
        );
        const { clientSecret } = res.data;
        setClientSecret(clientSecret);
        setData("done");
      } catch (err) {
        setErrorMessage(err.message); // Handle errors
      }
    };

    getPubKey();
    postData();
  }, [dataToSend]);

  if (!data) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <div>
      {
        errorMessage ? (<p style={{ color: "red" }} > {errorMessage}</p >)
          : (<Elements stripe={stripePromise} options={{ clientSecret }}>
            <div>
              <h2>Payment</h2>
              <h4>orderAmount: ${totalPrice}</h4>
              <CheckoutForm />
            </div>
          </Elements>
          )
      }
    </div>


  );

}

export default Payment;