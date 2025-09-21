import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";

export default function LoginButtons() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    // Podés redirigir al login o home
    window.location.href = "/";
  }

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <>
      <header className="flex justify-between p-4 hover:text-primary active:text-primary text-sm">
        {loggedIn ? (
          <button className="cursor-pointer" onClick={logout}>
            Cerrar sesión
          </button>
        ) : (
          <button className="cursor-pointer" onClick={() => setShowLogin(true)}>
            Iniciar sesión
          </button>
        )}
      </header>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSuccess={() => handleLoginSuccess()}
        />
      )}
    </>
  );
}
