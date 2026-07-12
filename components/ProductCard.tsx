"use client";

import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">

            <Link href={`/producto/${product.slug}`}>

                <Image
                    src={product.image_url || "/no-image.png"}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover"
                />

            </Link>

            <div className="p-5">

                <h2 className="text-xl font-bold">
                    {product.name}
                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                </p>

                <p className="text-3xl font-bold text-green-600 mt-4">
                    ${Number(product.price).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    Stock: {product.stock}
                </p>

                <div className="flex gap-3 mt-5">

                    <Link
                        href={`/producto/${product.slug}`}
                        className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg text-center hover:bg-green-50"
                    >
                        Ver detalle
                    </Link>

                    <button
                        onClick={() => {
                            addToCart(product);
                            alert("Producto agregado al carrito");
                        }}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                    >
                        Comprar
                    </button>

                </div>

            </div>

        </div>
    );
}