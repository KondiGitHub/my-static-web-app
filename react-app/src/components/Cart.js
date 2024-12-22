import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from "react-router-dom";

function Cart() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);

    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px'
                    }}>
                        {cart.map((item) => (
                            <div key={item._id} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: '1px solid #ccc',
                                padding: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#fff',
                                maxWidth: '150px'
                            }}>
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <h3 style={{ fontSize: '1rem', textAlign: 'center' }}>{item.title}</h3>
                                <p>${item.price}</p>
                                <button onClick={() => removeFromCart(item._id)} style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    borderRadius: '3px'
                                }}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button onClick={clearCart} style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        borderRadius: '3px',
                        marginRight: '10px'
                    }}>Clear Cart</button>
                    <Link to="/payment" style={{
                        textDecoration: 'none',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '3px'
                    }}>Go to Payment</Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
