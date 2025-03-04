// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null); // Holds the logged-in user info

//     const login = (userData) => {
//         setUser(userData);
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user"); // Clear user data from localStorage
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Function to generate a unique order ID (using Date.now and random number)
const generateOrderId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const cartRef = doc(db, 'carts', currentUser.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCartItems(cartSnap.data().items || []);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        setCartItems([]); // Empty cart when user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to clear cart (used for logout & checkout)
  const clearCart = async () => {
    setCartItems([]); // Clear local cart
    if (user) {
      try {
        await setDoc(doc(db, 'carts', user.uid), { items: [] }); // Clear cart in Firestore
      } catch (error) {
        console.error('Error clearing cart in Firestore:', error);
      }
    }
  };

  // Function to place an order and clear the cart
  const placeOrder = async (orderDetails) => {
    if (!user) {
      console.error('User is not authenticated. Cannot place order.');
      return;
    }

    try {
      // Logic to create the order in Firestore (e.g., saving the order to the "orders" collection)
      const orderRef = doc(db, 'orders', generateOrderId()); // Generate a unique order ID
      await setDoc(orderRef, {
        userId: user.uid,
        orderDetails: orderDetails,
        status: 'pending',
        timestamp: new Date(),
      });

      // After order is successfully placed, clear the cart
      await clearCart(); // Clear the cart after order is placed
      console.log('Order placed and cart cleared.');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await clearCart(); // Empty cart on logout
      console.log('user loggedout and cart cleared.');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, cartItems, setCartItems, clearCart, placeOrder }}>
      {children}
    </AuthContext.Provider>
  );
};
