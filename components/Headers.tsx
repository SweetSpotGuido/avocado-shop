import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-green-600 text-white">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">

                <Link href="/" className="text-2xl font-bold">
                    🥑 Avocado Shop
                </Link>

                <input
                    className="w-[500px] rounded-md px-4 py-2 text-black"
                    placeholder="Buscar productos..."
                />

                <nav className="flex gap-6">
                    <Link href="/productos">Productos</Link>
                    <Link href="/login">Ingresar</Link>
                    <Link
                        href="/cart"
                        className="text-2xl"
                    >
                        🛒
                    </Link>
                </nav>

            </div>
        </header>
    );
}
