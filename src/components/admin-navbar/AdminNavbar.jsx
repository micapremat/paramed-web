// src/components/Navbar.tsx
import { useState } from "react";

export default function Navbar() {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center my-5">Admin</h1>
      <nav className="">
        <ul className="flex justify-center gap-4">
          <li>
            <a href="/">Usuarios</a>
          </li>
          <li>
            <a href="/courses">Cursos</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
