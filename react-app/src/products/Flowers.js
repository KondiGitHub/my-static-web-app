import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartContext } from '../CartContext';
import './Flower.css'
import axios from 'axios'; // If you're using axios
import { UserContext } from '../UserContext';

function Flowers() {
  const [bouquets, setBouquets] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart, cartCount } = useContext(CartContext);
  const { user } = useContext(UserContext); // Access context
  

  const handleAddToCart = (bouquet) => {
    addToCart(bouquet);
  };

  useEffect(() => {
    const fetchBouquets = async () => {
      axios.get('https://samplenode-dxa9fdevhecvcbez.eastus2-01.azurewebsites.net/api/flowers')
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
      <header className="header">
        <h1 className="header-h1">Stock Cloth Flowers for Sale</h1>
        <div className="header-buttons">
          <Link to="/signup">Sign Up</Link>
          {user ? <span>Welcome, {user.name}!</span> : <Link to="/login">Sign In</Link>}
          <Link to="/cart">Cart ({cartCount})</Link>
        </div>
      </header>
      <p className="header-p">
        Choose from a wide variety of beautiful cloth flower bouquets!
      </p>
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
                className="add-to-cart-btn"
              >Add to Cart</button>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
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