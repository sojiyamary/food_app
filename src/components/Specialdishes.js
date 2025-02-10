import React, { useState } from 'react';
import AddTocart from "./AddTocart";

function Specialdishes(props) {
    const [cartItems, setCartItems] = useState([]); // State to store cart items with quantity

    const addtocarHandler = (cartImg, cartTitle) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((item) => item.cartTitle === cartTitle);

            if (existingItemIndex >= 0) {
                // If the item exists, increment its quantity
                const updatedItems = prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return updatedItems;
            }

            // If the item doesn't exist, add it with quantity 1
            return [...prevItems, { cartImg, cartTitle, quantity: 1 }];
        });
    };

    const removeCartItem = (cartTitle) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.cartTitle !== cartTitle)
        );
    };

    const spacialmenu = props.specialmenu.map((menuItem, index) => (
        <li key={index}>
            <img src={menuItem.strMealThumb} className="br" alt="dishes" />
            <h3 className="text-center">{menuItem.strMeal}</h3>
            <button onClick={() => addtocarHandler(menuItem.strMealThumb, menuItem.strMeal)}>Add to Cart</button>
        </li>
    ));

    return (
        <section className="special-dishes">
            <div className="container">
                <div className="special-menu">
                    <ul className="flex flex-wrap gap-30">
                        {spacialmenu}
                    </ul>
                </div>
            </div>
            <AddTocart cartItems={cartItems} onRemoveItem={removeCartItem} />
        </section>
    );
}

export default Specialdishes;
