import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductBySlug } from "@/lib/product-service";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductPage({
    params,
}: Props) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) notFound();

    return (
        <main className="max-w-7xl mx-auto p-10">

            <div className="grid grid-cols-2 gap-16">

                <Image
                    src={product.image_url || "/no-image.png"}
                    alt={product.name}
                    width={700}
                    height={700}
                    className="rounded-xl w-full h-auto"
                />
                <div>

                    <p className="text-gray-500">
                        Categoría #{product.category_id}
                    </p>

                    <h1 className="text-5xl font-bold mt-3">
                        {product.name}
                    </h1>

                    <p className="mt-8">
                        {product.description}
                    </p>

                    <h2 className="text-5xl text-green-600 font-bold mt-10">
                        ${Number(product.price).toLocaleString()}
                    </h2>

                    <p className="mt-5">
                        Stock: {product.stock}
                    </p>

                    <AddToCartButton product={product} />

                </div>

            </div>

        </main>
    );
}
