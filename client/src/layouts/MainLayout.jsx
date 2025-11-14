// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/MainLayout.css";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
