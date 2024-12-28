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

  const [addedItems, setAddedItems] = useState([]); // Track added items in the cart

  const handleAddToCart = (item) => {
    if (addedItems.includes(item._id)) {
      setAddedItems(addedItems.filter(id => id !== item._id));
      removeFromCart(item._id);
    } else {
      setAddedItems([...addedItems, item._id]);
      addToCart(item);
    }
  };

  useEffect(() => {
    // Update addedBouquets only when cart changes
    const cartBouquetIds = cart.map((item) => item._id);
    setAddedItems(cartBouquetIds);
  }, [cart]); // Depend only on cart

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
      <Header title="Stocking Cloth Flowers for Sale" />
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
                  {items.map((item) => (
                    <div key={item._id} className="flower-item">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="flower-image-src"
                      />
                      <h3>{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`add-to-cart-btn ${addedItems.includes(item._id) ? 'added-to-cart' : 'add-to-cart'}`}
                      >
                        {addedItems.includes(item._id) ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>
                  ))}
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
