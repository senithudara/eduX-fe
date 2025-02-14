import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { StudentProvider } from "./context/StudentContext";
import CoursesPage from "./pages/CoursesPage";
import HelpPage from "./pages/HelpPage";

function App() {
  return (
    <StudentProvider>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />{" "}
          {/* to redirect the user to login page*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/home" element={<Home />} />{" "}
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
