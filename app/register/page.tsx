"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Usuario creado");

    router.push("/login");
  }

  return (
    <main className="max-w-md mx-auto mt-24">

      <div className="bg-white shadow rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Crear cuenta
        </h1>

        <input
          className="border rounded p-3 w-full mb-4"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border rounded p-3 w-full mb-6"
          placeholder="Contraseña"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="bg-green-600 text-white w-full py-3 rounded-lg"
        >
          Registrarme
        </button>

      </div>

    </main>
  );
}
