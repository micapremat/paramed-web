import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const items = [
  { title: "Inicio", path: "/", displayLoggedIn: false },
  { title: "Institución", path: "/about", displayLoggedIn: false },
  { title: "Carreras", path: "/careers", displayLoggedIn: false },
  { title: "Cursos", path: "/blog", displayLoggedIn: true }, // sólo si logueado
  { title: "Contacto", path: "/contact", displayLoggedIn: false },
];

const currentPath = "";

export default function MenuItemsDynamic() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);

    setIsAdmin(getUser());
  }, []);

  async function getUser() {
    let token = localStorage.getItem("token");
    let res = await fetch("http://localhost:3000/api/logged-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }

  const filteredItems = items.filter((item) => {
    if (item.displayLoggedIn && !loggedIn) return false;
    return true;
  });

  return (
    <ul className="flex flex-col lg:flex-row lg:gap-3">
      {filteredItems.map((item, index) => (
        <li key={index}>
          <a
            href={item.path}
            className={`flex lg:px-3 py-2 items-center hover:text-primary ${
              currentPath === item.path
                ? "text-primary font-semibold"
                : "text-gray-600"
            }`}>
            {item.title}
          </a>
        </li>
      ))}
      {isAdmin && loggedIn && (
        <li>
          <a
            href="/admin/users"
            className="flex lg:px-3 py-2 items-center hover:text-primary cursor-pointer">
            Admin
          </a>
        </li>
      )}
    </ul>
  );
}
