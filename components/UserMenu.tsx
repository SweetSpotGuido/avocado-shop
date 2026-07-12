"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getUser, signOut } from "@/lib/auth";

export default function UserMenu() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const currentUser = await getUser();
        setUser(currentUser);
        setLoading(false);
    }

    async function logout() {
        await signOut();
        router.push("/");
        router.refresh();
    }

    if (loading) {
        return (
            <div className="text-sm text-gray-500">
                Cargando...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center gap-4">

                <Link
                    href="/login"
                    className="hover:text-green-600"
                >
                    Ingresar
                </Link>

                <Link
                    href="/register"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Registrarse
                </Link>

            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">

            <span className="text-sm text-gray-600">
                {user.email}
            </span>

            <Link
                href="/account/orders"
                className="hover:text-green-600"
            >
                Mis pedidos
            </Link>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                Salir
            </button>

        </div>
    );
}