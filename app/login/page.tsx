"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function login() {
        await signIn(email, password);

        router.push("/checkout");
    }

    return (
        <main className="max-w-md mx-auto py-20">

            <div className="bg-white rounded-xl shadow p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Iniciar sesión
                </h1>

                <input
                    className="border rounded-lg p-3 w-full mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border rounded-lg p-3 w-full mb-6"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="bg-green-600 text-white w-full py-3 rounded-lg"
                >
                    Ingresar
                </button>

            </div>

        </main>
    );
}