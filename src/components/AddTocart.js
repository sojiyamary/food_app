import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AddToCart = ({ cartItems, onRemoveItem }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Calculate total price (assuming a fixed price of $10 per item)
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * 10, 0);

    const handleCheckout = () => {
        if (!user) {
            alert("You must be logged in to proceed to checkout!");
            navigate("/login");
            return;
        }
        navigate("/checkout"); // Redirect to checkout page
    };

    return (
        <div className="addtocart_wrapper">
            <h4>Cart Items</h4>
            <ul>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <img src={item.cartImg} className="br" alt="dish" />
                            <div>
                                <h6>{item.cartTitle}</h6>
                                <span>Quantity: {item.quantity}</span>
                            </div>
                            <button onClick={() => onRemoveItem(item.cartTitle)} className="remove-button">
                                ✖
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No items in the cart.</li>
                )}
            </ul>

            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <h5>Total Price: ${totalPrice}</h5>
                    <button onClick={handleCheckout} className="checkout-button">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddToCart;
