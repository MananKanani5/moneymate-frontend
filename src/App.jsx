import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "animate.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./context/AuthContext";
import AccountPage from "./pages/AccountPage";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./pages/NotFound";
import ExpensesPage from "./pages/ExpensesPage";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import { ToastContainer } from "react-toastify";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" newestOnTop pauseOnHover />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute element={<PrivateLayout />} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-account" element={<AccountPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
