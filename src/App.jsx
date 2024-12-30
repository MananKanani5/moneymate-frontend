import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import DashboardPage from "./routes/DashboardPage";
import { AuthProvider } from "./AuthContext";
import AccountPage from "./routes/AccountPage";
import PrivateRoute from "./PrivateRoute";
import "animate.css";
import NotFound from "./routes/NotFound";
import ExpensesPage from "./routes/ExpensesPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={<PrivateRoute element={<DashboardPage />} />}
          />
          <Route
            path="/my-account"
            element={<PrivateRoute element={<AccountPage />} />}
          />
          <Route
            path="/expenses"
            element={<PrivateRoute element={<ExpensesPage />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
