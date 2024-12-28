import React, { createContext, useState,useEffect  } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0); // New state for item count


    // Load cart from local storage on initialization
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
        setCartCount(cartCount + 1); // Increment item count
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
        setCartCount(cartCount - 1); // Increment item count
    };

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        setCartCount(0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,updateQuantity,cartCount,setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
