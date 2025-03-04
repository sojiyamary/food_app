import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { db } from "../components/firebase";
import { collection, addDoc } from "firebase/firestore";

function Checkout() {
    const { user, cartItems, clearCart } = useContext(AuthContext);
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        name: user?.email || "",
        address: "",
        paymentMethod: "Credit Card",
    });

    const handleChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleOrder = async () => {
        if (!shippingInfo.address) {
            alert("Please enter your address!");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!user) {
            alert("You need to be logged in to place an order!");
            return;
        }

        try {
            console.log("Placing order...");
            
            const orderRef = await addDoc(collection(db, "orders"), {
                userId: user.uid,
                items: cartItems,
                shippingInfo,
                timestamp: new Date(),
            });

            console.log("Order placed successfully:", orderRef.id);
            clearCart(); // Clear cart after successful order
            alert("Order placed successfully!");
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="auth-container checkout-container">
            <h2>Checkout</h2>
            <form>
                <label>Name:</label>
                <input type="text" name="name" value={shippingInfo.name} readOnly />

                <label>Address:</label>
                <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} required />

                <label>Payment Method:</label>
                <select name="paymentMethod" value={shippingInfo.paymentMethod} onChange={handleChange}>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>

                <button type="button" onClick={handleOrder}>Place Order</button>
            </form>
        </div>
    );
}

export default Checkout;
