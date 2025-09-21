import React, { useState } from "react";
import UserIcon from "../ui/icons/UserIcon";

export default function Login({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data);
      localStorage.setItem("token", data.token);
      onSuccess();
      //window.location.href = "/";
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  }

  return (
    <div className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center">
      /
      <div className="bg-gradient-to-b bg-gray-100 relative p-6 rounded-xl shadow-lg  w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 ">
        <div className="w-15 rounded-full outline bg-gray-200 shadow-2xl absolute -top-8 right-1/2 translate-x-1/2 outline-primary p-2">
          <UserIcon />
        </div>
        <h2 className="text-xl font-bold my-4 text-center">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4 my-4 w-2/3">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className=" outline rounded-sm p-1 ml-5 w-full col-span-2"
              />
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className=" outline rounded-sm p-1 ml-5 w-full col-span-2"
              />
            </div>
          </div>
          <div className="text-xs text-center">
            <p>Has olvidado tu contraseña?</p>
            <button className="cursor-pointer text-primary underline my-1">
              Cambiar contraseña
            </button>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 cursor-pointer">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded cursor-pointer">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
