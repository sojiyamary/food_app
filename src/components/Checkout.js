import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Checkout() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        name: user?.email || "",
        address: "",
        paymentMethod: "Credit Card",
    });

    const handleChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleOrder = () => {
        if (!shippingInfo.address) {
            alert("Please enter your address!");
            return;
        }

        // Simulate order success (You can integrate with a backend API)
        alert("Order placed successfully!");
        navigate("/"); // Redirect to home page after order
    };

    return (
        <div className="checkout-container">
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
