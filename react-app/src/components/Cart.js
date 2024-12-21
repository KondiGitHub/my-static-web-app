import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

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
                    {cart.map((item) => (
                        <div key={item._id} style={{ marginBottom: '20px' }}>
                            <img src={item.src} alt={item.title} style={{ width: '100px' }} />
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                    ))}
                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
