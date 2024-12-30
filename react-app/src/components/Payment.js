import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import axios from 'axios'; // If you're using axios
import { CartContext } from '../CartContext';
import { ConfigContext } from '../ConfigContext';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

function Payment() {

 const { cart } = useContext(CartContext);
 const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price * item.quantity), 0);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ clientSecret, setClientSecret ] = useState('');
  const [ stripePromise, setStripePromise ] = useState('');
  const [data, setData] = useState(null);
   const config = useContext(ConfigContext);
  const [ orderNumber, setOrderNumber ] = useState('');
  const navigate = useNavigate(); // Use useHistory instead of useNavigate
  

  useEffect(() => {

    if (cart.length === 0) {
      navigate('/cart'); // Redirect to cart if the cart is empty
    }

    const getPubKey = async () => {
      const res = await axios.get(
        `${config.NODE_SERVICE}/api/config`);
      const { publishableKey } = res.data;
      const stripePromiseTemp = loadStripe(publishableKey);
      setStripePromise(stripePromiseTemp);
    }

    const sendOrder =  async () => {
      try {

       
        const orderResponse = await axios.post(
          `${config.NODE_SERVICE}/api/order`, {
            items: cart.map(item => ({
              id: item._id,
              price: item.price,
              tag: item.tag,
              src: item.src,
              title: item.title,
              category: item.category,
              quantity: item.quantity
            })),
            totalPrice,
          },{ withCredentials: true }
        );

        const { orderNumber } = orderResponse.data;
        console.log("orderNumber",orderNumber);
        setOrderNumber(orderNumber);
      } catch (err) {
        setErrorMessage(err.message); // Handle errors
        setData("done");
      }
    }
   

    const postData = async () => {
      try {
        
        const res = await axios.post(
          `${config.NODE_SERVICE}/api/create-payment-intent`,
          {orderAmount: totalPrice*100},{ withCredentials: true }
        );
        const { clientSecret } = res.data;
        setClientSecret(clientSecret);
        setData("done");
      } catch (err) {
        setErrorMessage(err.message); // Handle errors
        setData("done");
      }
    };

    getPubKey();
    sendOrder();
    postData();
  }, [cart, config.NODE_SERVICE,totalPrice,navigate]);

  if (!data) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <div>
      {
        errorMessage ? (<p style={{ color: "red" }} > {errorMessage}</p >)
          : (<Elements stripe={stripePromise} options={{ clientSecret }}>
            <div>
            < Header title={"Payment"} />
              <h4>orderAmount: ${totalPrice}</h4>
              <h4>orderNumber: {orderNumber}</h4>
              <CheckoutForm orderNumber={orderNumber}/>
            </div>
          </Elements>
          )
      }
    </div>


  );

}

export default Payment;