// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Sidebar.css"; // optional styles

export default function Sidebar() {
  const { logout } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <h2>EduTool</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/lessons">Lessons</Link>
          </li>
          <li>
            <Link to="/grades">Grades</Link>
          </li>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
        </ul>
      </nav>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
}
