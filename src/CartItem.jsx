import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.cost.slice(1)) * item.quantity), 0).toFixed(2);
    };

    const calculateTotalCost = (item) => {
        return (parseFloat(item.cost.slice(1)) * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity === 1) {
            dispatch(removeItem(item.name));
        } else {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">${item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    </div>
                ))
            )}
            <div className="total_cart_amount">Total Amount: ${calculateTotalAmount()}</div>
            <button className="continue_shopping_btn" onClick={onContinueShopping}>Continue Shopping</button>
            <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
        </div>
    );
}

export default CartItem;
