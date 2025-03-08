import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="font-medium text-base text-orange-500">
      Log Out
    </button>
  );
};

export default LogoutButton;
