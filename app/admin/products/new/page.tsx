"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/product-service";
import ImageUpload from "@/components/ImageUpload";

export default function NewProduct() {
    const router = useRouter();

    const [product, setProduct] = useState({
        name: "",
        slug: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        image_url: "",
        active: true,
    });

    async function save() {
        await createProduct(product);
        router.push("/admin/products");
    }

    return (
        <div className="max-w-3xl">

            <h1 className="text-3xl font-bold mb-8">
                Nuevo Producto
            </h1>

            <div className="space-y-5">

                <input
                    className="border w-full p-3 rounded"
                    placeholder="Nombre"
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            name: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                        })
                    }
                />

                <textarea
                    className="border w-full p-3 rounded"
                    placeholder="Descripción"
                    rows={5}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            description: e.target.value,
                        })
                    }
                />

                <input
                    className="border w-full p-3 rounded"
                    placeholder="Categoría"
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            category: e.target.value,
                        })
                    }
                />

                <input
                    type="number"
                    className="border w-full p-3 rounded"
                    placeholder="Precio"
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            price: Number(e.target.value),
                        })
                    }
                />

                <input
                    type="number"
                    className="border w-full p-3 rounded"
                    placeholder="Stock"
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            stock: Number(e.target.value),
                        })
                    }
                />

                <ImageUpload
                    value={product.image_url}
                    onChange={(url) =>
                        setProduct({
                            ...product,
                            image_url: url,
                        })
                    }
                />

                <button
                    onClick={save}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                    Guardar
                </button>

            </div>

        </div>
    );
}