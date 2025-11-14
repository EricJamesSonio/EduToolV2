import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Lessons from "../pages/Lessons";
import Grades from "../pages/Grades";
import Schedule from "../pages/Schedule";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // wait until auth state is loaded

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="grades" element={<Grades />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

