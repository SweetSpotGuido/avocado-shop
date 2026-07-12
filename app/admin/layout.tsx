import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex">

            <aside className="w-64 bg-zinc-900 text-white p-6">

                <h1 className="text-2xl font-bold mb-10">
                    🥑 Avocado Shop
                </h1>

                <nav className="space-y-3">

                    <Link
                        href="/admin"
                        className="block hover:text-green-400"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/products"
                        className="block hover:text-green-400"
                    >
                        Productos
                    </Link>

                    <Link
                        href="/admin/orders"
                        className="block hover:text-green-400"
                    >
                        Pedidos
                    </Link>

                    <Link
                        href="/admin/customers"
                        className="block hover:text-green-400"
                    >
                        Clientes
                    </Link>

                    <Link
                        href="/admin/categories"
                        className="block hover:text-green-400"
                    >
                        Categorías
                    </Link>

                </nav>

            </aside>

            <main className="flex-1 bg-gray-100 p-8">
                {children}
            </main>

        </div>
    );
}
