// import React, { useState } from 'react';
// import AddTocart from "./AddTocart";

// function Specialdishes(props) {
//     const [cartItems, setCartItems] = useState([]); // State to store cart items with quantity

//     const addtocarHandler = (cartImg, cartTitle) => {
//         setCartItems((prevItems) => {
//             const existingItemIndex = prevItems.findIndex((item) => item.cartTitle === cartTitle);

//             if (existingItemIndex >= 0) {
//                 // If the item exists, increment its quantity
//                 const updatedItems = prevItems.map((item, index) =>
//                     index === existingItemIndex
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//                 return updatedItems;
//             }

//             // If the item doesn't exist, add it with quantity 1
//             return [...prevItems, { cartImg, cartTitle, quantity: 1 }];
//         });
//     };

//     const removeCartItem = (cartTitle) => {
//         setCartItems((prevItems) =>
//             prevItems.filter((item) => item.cartTitle !== cartTitle)
//         );
//     };

//     const spacialmenu = props.specialmenu.map((menuItem, index) => (
//         <li key={index}>
//             <img src={menuItem.strMealThumb} className="br" alt="dishes" />
//             <h3 className="text-center">{menuItem.strMeal}</h3>
//             <button onClick={() => addtocarHandler(menuItem.strMealThumb, menuItem.strMeal)}>Add to Cart</button>
//         </li>
//     ));

//     return (
//         <section className="special-dishes">
//             <div className="container">
//                 <div className="special-menu">
//                     <ul className="flex flex-wrap gap-30">
//                         {spacialmenu}
//                     </ul>
//                 </div>
//             </div>
//             <AddTocart cartItems={cartItems} onRemoveItem={removeCartItem} />
//         </section>
//     );
// }

// export default Specialdishes;

import React, { useState, useEffect, useContext } from 'react';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";
import { AuthContext } from "./AuthContext";
import AddToCart from "./AddTocart";

function SpecialDishes(props) {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCartItems();
        }
    }, [user]);

    const fetchCartItems = async () => {
        if (!user) return;
        try {
            const cartRef = doc(db, "carts", user.uid);
            const cartSnap = await getDoc(cartRef);
            if (cartSnap.exists()) {
                setCartItems(cartSnap.data().items || []);
            } else {
                setCartItems([]); // If no cart exists, set to empty
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

   const addToCartHandler = async (cartImg, cartTitle) => {
    if (!user) {
        alert("Please login to add items to the cart.");
        return;
    }

    try {
        const cartRef = doc(db, "carts", user.uid);
        const existingItem = cartItems.find(item => item.cartTitle === cartTitle);

        let updatedCart;
        if (existingItem) {
            updatedCart = cartItems.map(item =>
                item.cartTitle === cartTitle ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cartItems, { cartImg, cartTitle, quantity: 1 }];
        }

        setCartItems(updatedCart);
        await setDoc(cartRef, { items: updatedCart }, { merge: true });
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};


    const removeCartItem = async (cartTitle) => {
        if (!user) return;
        const updatedCart = cartItems.filter(item => item.cartTitle !== cartTitle);
        setCartItems(updatedCart);
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: updatedCart }, { merge: true });
    };

    return (
        <section className="special-dishes">
            <div className="container">
                <div className="special-menu">
                    <ul className="flex flex-wrap gap-30">
                        {props.specialmenu.map((menuItem, index) => (
                            <li key={index}>
                                <img src={menuItem.strMealThumb} className="br" alt="dishes" />
                                <h3 className="text-center">{menuItem.strMeal}</h3>
                                <button onClick={() => addToCartHandler(menuItem.strMealThumb, menuItem.strMeal)}>
                                    Add to Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <AddToCart cartItems={cartItems} onRemoveItem={removeCartItem} />
        </section>
    );
}

export default SpecialDishes;

