// src/components/Navbar.jsx
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/Navbar.css"; // optional styles

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="navbar">
      <span>Welcome, {user?.name}</span>
    </header>
  );
}
