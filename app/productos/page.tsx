"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { addToCart } from "@/lib/cart";

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProducts(data || []);
  }

  return (
    <main className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Productos
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <img
              src={product.image_url || "/no-image.png"}
              alt={product.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {product.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {product.description}
              </p>

              <p className="text-3xl text-green-700 font-bold mt-4">
                ${Number(product.price).toLocaleString()}
              </p>

              <button
                onClick={() => {
                  addToCart(product);
                  alert("Producto agregado al carrito");
                }}
                className="w-full bg-green-600 text-white rounded-lg py-3 mt-5 hover:bg-green-700"
              >
                Agregar al carrito
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}
