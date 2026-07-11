"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import { getProductBySlug } from "@/lib/product-service";
import { addToCart } from "@/lib/cart";

export default function ProductPage() {

  const { slug } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProductBySlug(slug as string);
    setProduct(data);
  }

  if (!product)
    return (
      <main className="max-w-7xl mx-auto p-20">
        Cargando...
      </main>
    );

  return (
    <main className="max-w-7xl mx-auto p-10">

      <div className="grid grid-cols-2 gap-16">

        <div>

          <Image
            src={product.image_url || "/no-image.png"}
            alt={product.name}
            width={700}
            height={700}
            className="rounded-xl w-full"
          />

        </div>

        <div>

          <p className="text-gray-500">

            {product.category}

          </p>

          <h1 className="text-5xl font-bold mt-3">

            {product.name}

          </h1>

          <p className="mt-8 text-gray-600 leading-8">

            {product.description}

          </p>

          <h2 className="text-5xl font-bold text-green-600 mt-10">

            ${Number(product.price).toLocaleString()}

          </h2>

          <p className="mt-4">

            Stock disponible: {product.stock}

          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-10 bg-green-600 text-white px-10 py-4 rounded-xl text-lg"
          >
            Agregar al carrito
          </button>

        </div>

      </div>

    </main>
  );
}
