import Link from "next/link";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
    return (
        <main>

            <section className="bg-gradient-to-r from-green-600 to-green-400 text-white">

                <div className="max-w-7xl mx-auto px-8 py-24">

                    <h1 className="text-6xl font-black">
                        Tecnología al mejor precio
                    </h1>

                    <p className="text-2xl mt-6 max-w-2xl">
                        Comprá auriculares, relojes inteligentes y accesorios.
                    </p>

                    <Link
                        href="/productos"
                        className="inline-block mt-10 bg-white text-green-700 px-8 py-4 rounded-xl font-bold"
                    >
                        Ver productos
                    </Link>

                </div>

            </section>

            <HomeProducts />

            <section className="bg-white py-20">

                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">

                    <div className="rounded-xl border p-8">

                        <h3 className="text-2xl font-bold">
                            🚚 Envíos
                        </h3>

                        <p className="mt-4">
                            Envíos a todo el país.
                        </p>

                    </div>

                    <div className="rounded-xl border p-8">

                        <h3 className="text-2xl font-bold">
                            💳 Pagos
                        </h3>

                        <p className="mt-4">
                            Mercado Pago.
                        </p>

                    </div>

                    <div className="rounded-xl border p-8">

                        <h3 className="text-2xl font-bold">
                            🛡 Garantía
                        </h3>

                        <p className="mt-4">
                            Garantía oficial.
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}