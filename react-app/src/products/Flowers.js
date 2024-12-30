import React, { useContext, useState, useEffect } from "react";
import { CartContext } from '../CartContext';
import { ConfigContext } from '../ConfigContext';
import Header from "../components/Header";
import axios from 'axios';
import './Flower.css';

function Flowers() {
  const [categories, setCategories] = useState([]); // Categories data with items
  const [expandedCategory, setExpandedCategory] = useState(null); // Track which category is expanded
  const [errorMessage, setErrorMessage] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const config = useContext(ConfigContext);

  //  const [addedItems, setAddedItems] = useState([]); // Track added items in the cart

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item._id);
  };

  // useEffect(() => {
  //   // Update addedBouquets only when cart changes
  //   const cartBouquetIds = cart.map((item) => item._id);
  //   setAddedItems(cartBouquetIds);
  // }, [cart]); // Depend only on cart

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.NODE_SERVICE}/api/products`, { withCredentials: true });
        const groupedByCategory = response.data.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});
        setCategories(Object.entries(groupedByCategory)); // Convert to array of [category, items]
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchCategories();
  }, [config.NODE_SERVICE]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="flower-body">
      <Header title="Handmade Craft Items" />
      <h1>Browse through a diverse range of beautiful handmade crafts</h1>

      {errorMessage ? (
        <p className="err-msg">{errorMessage}</p>
      ) : (
        <div className="categories">

          {categories.map(([category, items]) => (
            <div key={category} className="category">
              {/* Category Header */}
              <div
                className="category-header"
                onClick={() => toggleCategory(category)}
              >
                <h2>{category}: </h2>
                <button className="toggle-btn">
                  {expandedCategory === category ? "Collapse" : "Expand"}
                </button>
              </div>

              {/* Category Items */}
              {expandedCategory === category && (
                <div className="category-items">
                  {items.map((item) => {
                    const cartItem = cart.find((cartItem) => cartItem._id === item._id);
                    const quantity = cartItem ? cartItem.quantity : 0;

                    return (
                      <div key={item._id} className="flower-item">
                        <img src={item.src} alt={item.title} className="flower-image-src" />
                        <h3>{item.title}</h3>
                        <p>Price: ${item.price}</p>
                        <div className="cart-controls">
                          <button onClick={() => handleRemoveFromCart(item)} disabled={!quantity}>
                            -
                          </button>
                          <span>{quantity}</span>
                          <button onClick={() => handleAddToCart(item)}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Flowers;
