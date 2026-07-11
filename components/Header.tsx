"use client";

import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header className="bg-white border-b sticky top-0 z-50">

            <div className="max-w-7xl mx-auto h-20 flex items-center gap-8 px-6">

                <Logo />

                <SearchBar />

                <nav className="flex items-center gap-6">

                    <Link href="/productos">
                        Productos
                    </Link>

                    <Link href="/cart">
                        Carrito
                    </Link>

                    <Link href="/login">
                        Ingresar
                    </Link>

                </nav>

            </div>

        </header>
    );
}