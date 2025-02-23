import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-white"
      style={{ backgroundColor: "#112D4E" }}
    >
      <h1>🎉 Welcome to FinSync! 📊 Let's get your finances in sync! 💼</h1>
    </div>
  );
}

export default WelcomeScreen;
