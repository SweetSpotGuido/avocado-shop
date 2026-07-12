import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/product-service";

export default async function HomeProducts() {
    const products = await getFeaturedProducts();

    if (products.length === 0) {
        return (
            <section className="max-w-7xl mx-auto py-20">
                <h2 className="text-4xl font-bold mb-10">
                    Productos destacados
                </h2>

                <div className="bg-white rounded-xl shadow p-10 text-center">
                    Todavía no hay productos.
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto py-20">

            <h2 className="text-4xl font-bold mb-10">
                Productos destacados
            </h2>

            <div className="grid grid-cols-4 gap-6">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </section>
    );
}