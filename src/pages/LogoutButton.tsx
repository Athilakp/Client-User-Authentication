// src/components/LogoutButton.tsx
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("adminId");
    navigate("/");
  };

  return (
    <Button
      type="default"
      onClick={handleLogout}
      style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
