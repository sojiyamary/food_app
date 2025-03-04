import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menus from "./Pages/Menus";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthProvider } from "./components/AuthContext";
import Checkout from "./Pages/Checkout";

import "./App.scss";

function App() {
    return (
      <AuthProvider>
      <Router>
      <Routes>
          <Route path="/" element={<Menus />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
      </Routes>
  </Router>
  </AuthProvider>
    );
}

export default App;

