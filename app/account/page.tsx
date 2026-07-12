import Link from "next/link";

export default function AccountPage() {
    return (
        <main className="max-w-5xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-10">

                Mi cuenta

            </h1>

            <div className="grid grid-cols-2 gap-6">

                <Link
                    href="/account/profile"
                    className="bg-white rounded-xl shadow p-8 hover:shadow-lg"
                >
                    <h2 className="text-2xl font-bold">
                        Mis datos
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Editar información personal
                    </p>
                </Link>

                <Link
                    href="/account/orders"
                    className="bg-white rounded-xl shadow p-8 hover:shadow-lg"
                >
                    <h2 className="text-2xl font-bold">
                        Mis pedidos
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Historial de compras
                    </p>
                </Link>

                <Link
                    href="/account/addresses"
                    className="bg-white rounded-xl shadow p-8 hover:shadow-lg"
                >
                    <h2 className="text-2xl font-bold">
                        Direcciones
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Administrar direcciones
                    </p>
                </Link>

                <Link
                    href="/account/favorites"
                    className="bg-white rounded-xl shadow p-8 hover:shadow-lg"
                >
                    <h2 className="text-2xl font-bold">
                        Favoritos
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Productos guardados
                    </p>
                </Link>

            </div>

        </main>
    );
}