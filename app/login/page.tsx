"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  async function login(){

    const {error}=await signIn(email,password);

    if(error){

      alert(error.message);

      return;

    }

    router.push("/");

  }

  return(

    <main className="max-w-md mx-auto mt-24">

      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">

          Iniciar sesión

        </h1>

        <input
        className="border rounded w-full p-3 mb-4"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        className="border rounded w-full p-3 mb-6"
        placeholder="Contraseña"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button
        onClick={login}
        className="bg-green-600 text-white w-full py-3 rounded-lg">

          Ingresar

        </button>

      </div>

    </main>

  )

}
