import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartContext } from '../CartContext';
import './Flower.css'
import axios from 'axios'; // If you're using axios
import { UserContext } from '../UserContext';
import { ConfigContext } from '../ConfigContext';
import Header from "../components/Header";

function Flowers() {
  const [bouquets, setBouquets] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart, cartCount,removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Access context
  const config = useContext(ConfigContext);
  const [addedToCart, setAddedToCart] = useState(false);


  const [addedBouquets, setAddedBouquets] = useState([]);
  

  const handleAddToCart = (bouquet) => {
   
    if (addedBouquets.includes(bouquet._id)) {
      setAddedBouquets(addedBouquets.filter(id => id !== bouquet._id)); // Remove bouquet from the cart
      removeFromCart(bouquet._id);
    } else {
      setAddedBouquets([...addedBouquets, bouquet._id]); // Add bouquet to the cart
      addToCart(bouquet);
    }
  };

  useEffect(() => {
    const fetchBouquets = async () => {
      axios.get(
        `${config.NODE_SERVICE}/api/products`)
        .then(response => {
          setBouquets(response.data);
        })
        .catch(err => {
          setErrorMessage(err.message); // Set error message in case of failure
        });

    };

    fetchBouquets();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flower-body">
       <Header title="Stocking Cloth Flowers for Sale" />
      <h1>
        Choose from a wide variety of beautiful cloth flower bouquets!
      </h1>
      {errorMessage ? (
        <p className="err-msg">{errorMessage}</p>
      ) : (
        <div className="flower">
          {bouquets.map((bouquet) => (
            <div
              key={bouquet._id}
              className="flower-image"
            >
              <img
                src={bouquet.src}
                alt={bouquet.title}
                className="flower-image-src"
                onClick={() => handleImageClick(bouquet.src)}

              />
              <h3>{bouquet.title}</h3>
              <p>{bouquet.price}</p>
              <button onClick={() => handleAddToCart(bouquet)}
                className={`add-to-cart-btn ${addedBouquets.includes(bouquet._id) ? 'added-to-cart' : 'add-to-cart'}`}
              >{addedBouquets.includes(bouquet._id) ? 'Remove from cart' : 'Add to Cart'} </button>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="image-pop-up"
          onClick={closeImageModal}
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </div>
  );
}

export default Flowers;