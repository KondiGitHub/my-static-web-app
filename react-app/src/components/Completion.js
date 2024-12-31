import {useEffect, useState, useContext} from 'react';
import axios from 'axios'; // If you're using axios
import { loadStripe } from "@stripe/stripe-js";
import { ConfigContext } from '../ConfigContext';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../CartContext';

function Completion() {
  const [ messageBody, setMessageBody ] = useState('');
  const config = useContext(ConfigContext);
  const location = useLocation();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
  const updateOrder = async (error, paymentIntent) => {
  
    const orderNumber = queryParams.get('orderNumber');
     const orderResponse = await axios.put(
        `${config.NODE_SERVICE}/api/order/${orderNumber}`, {
          paymentTrackId: paymentIntent ? paymentIntent.id : null,
          purchaseStatus: error ? error.message : paymentIntent.status
        }
      );
      if('succeeded' === paymentIntent.status ) {
        clearCart();
      }
      console.log(orderResponse.data);
    }

    const getPubKey = async () => {
        const res = await axios.get(
          `${config.NODE_SERVICE}/api/config`);
        const { publishableKey } = res.data;
        const stripePromise = loadStripe(publishableKey);
        stripePromise.then(async (stripe) => {
            const url = new URL(window.location);
            const clientSecret = url.searchParams.get('payment_intent_client_secret');
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
            updateOrder(error, paymentIntent);

            setMessageBody(error ? `> ${error.message}` : (
              <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
            ));
          });
      }
      
      getPubKey();
    
  }, [config.NODE_SERVICE,location,clearCart]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;