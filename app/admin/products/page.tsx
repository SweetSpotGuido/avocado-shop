"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/lib/product-service";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);

    async function loadProducts() {
        const data = await getProducts();
        setProducts(data);
    }

    async function remove(id: number) {
        if (!confirm("¿Eliminar producto?")) return;

        await deleteProduct(id);

        loadProducts();
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div>

            <div className="flex justify-between mb-8">

                <h1 className="text-3xl font-bold">
                    Productos
                </h1>

                <Link
                    href="/admin/products/new"
                    className="bg-green-600 text-white px-5 py-3 rounded-lg"
                >
                    Nuevo Producto
                </Link>

            </div>

            <table className="w-full bg-white rounded-xl shadow">

                <thead className="bg-zinc-100">
                    <tr>
                        <th className="p-4"></th>
                        <th className="text-left">Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product.id} className="border-t">

                            <td className="p-3">
                                <img
                                    src={product.image_url || "/no-image.png"}
                                    className="w-16 h-16 rounded-lg object-cover"
                                    alt={product.name}
                                />
                            </td>

                            <td>{product.name}</td>

                            <td className="text-center">
                                ${product.price}
                            </td>

                            <td className="text-center">
                                {product.stock}
                            </td>

                            <td className="text-center">
                                {product.active ? "Activo" : "Oculto"}
                            </td>

                            <td>
                                <div className="flex justify-center gap-4">

                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="text-blue-600"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => remove(product.id)}
                                        className="text-red-600"
                                    >
                                        Eliminar
                                    </button>

                                </div>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}
