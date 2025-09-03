"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem("token", data.token);
        router.push("/admin");
      } else {
        setError(data.error || "Usuario o contraseña incorrectos");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />
        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded w-full font-semibold">
          Entrar
        </button>
      </form>
    </div>
  );
}
