import {useEffect, useState} from 'react';
import axios from 'axios'; // If you're using axios
import { loadStripe } from "@stripe/stripe-js";

function Completion() {
  const [ messageBody, setMessageBody ] = useState('');

  useEffect(() => {

    const getPubKey = async () => {
        const res = await axios.get('https://samplenode-dxa9fdevhecvcbez.eastus2-01.azurewebsites.net/api/config');
        const { publishableKey } = res.data;
        const stripePromise = loadStripe(publishableKey);
        stripePromise.then(async (stripe) => {
            const url = new URL(window.location);
            const clientSecret = url.searchParams.get('payment_intent_client_secret');
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      
            setMessageBody(error ? `> ${error.message}` : (
              <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
            ));
          });
      }
      getPubKey();
    
  }, []);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;