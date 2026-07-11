"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { addToCart } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";

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
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

        </main>
    );
}
