// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// function Hero() {
//     const { user, logout } = useContext(AuthContext); // Access user and logout from context
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout(); // Clear user data
//         navigate("/"); // Redirect to main page
//     };

//     return (
//         <div className="hero">
//             <img
//                 src="https://media.istockphoto.com/id/1295633127/photo/grilled-chicken-meat-and-fresh-vegetable-salad-of-tomato-avocado-lettuce-and-spinach-healthy.jpg?s=2048x2048&w=is&k=20&c=kSvkCkmXwVbLzyS3t1XbB9rLVyvYPPOy2Qt98T31-RU="
//                 alt="Hero"
//             />
//             <div className="hero-content">
//                 <h2>It's All About Good Food</h2>
//                 <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corrupti
//                     at quibusdam voluptate rerum minima natus accusantium impedit officiis
//                     ad pariatur sed consequuntur maiores, provident ipsum, earum soluta
//                     suscipit unde!
//                 </p>
//                 <div className="auth-links">
//                     {user ? (
//                         <>
//                             <span>Welcome, {user.email}</span>
//                             <button onClick={handleLogout}>Logout</button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/login">Login</Link>
//                             <Link to="/register">Register</Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Hero;


// src/Hero.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Hero() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from context
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout failed:', error); // Logs any errors
    }
  };

  return (
    <div className="hero">
      <img
        src="https://media.istockphoto.com/id/1295633127/photo/grilled-chicken-meat-and-fresh-vegetable-salad-of-tomato-avocado-lettuce-and-spinach-healthy.jpg?s=2048x2048&w=is&k=20&c=kSvkCkmXwVbLzyS3t1XbB9rLVyvYPPOy2Qt98T31-RU="
        alt="Hero"
      />
      <div className="hero-content">
        <h2>It's All About Good Food</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corrupti
          at quibusdam voluptate rerum minima natus accusantium impedit officiis
          ad pariatur sed consequuntur maiores, provident ipsum, earum soluta
          suscipit unde!
        </p>
        <div className="auth-links">
          {user ? (
            <>
              <span>Welcome, {user.email}</span>
              <button onClick={handleLogout}>Logout</button> {/* Calls handleLogout on click */}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
