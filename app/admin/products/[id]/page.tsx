"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ImageUpload from "@/components/ImageUpload";
import { getCategories } from "@/lib/category-service";
import {
    getProduct,
    updateProduct,
} from "@/lib/product-service";

import { ProductInput } from "@/types/product";

interface Category {
    id: number;
    name: string;
}

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<Category[]>([]);

    const [product, setProduct] = useState<ProductInput>({
        name: "",
        slug: "",
        description: "",

        category_id: 0,

        sku: "",
        barcode: "",

        image_url: "",

        price: 0,
        price_old: 0,

        stock: 0,

        weight: 0,
        width: 0,
        height: 0,
        depth: 0,

        featured: false,
        active: true,
    });

    const load = useCallback(async () => {
        const [productData, categoriesData] = await Promise.all([
            getProduct(Number(id)),
            getCategories(),
        ]);

        if (productData) {
            const { id: _, created_at: __, ...rest } = productData as any;
            setProduct(rest);
        }

        setCategories(categoriesData);
        setLoading(false);
    }, [id]);

    useEffect(() => {
        load();
    }, [load]);

    async function save() {
        await updateProduct(Number(id), product);
        router.push("/admin/products");
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <main className="max-w-5xl mx-auto">

            <h1 className="text-4xl font-bold mb-10">
                Editar Producto
            </h1>

            <div className="bg-white rounded-xl shadow p-8 space-y-6">

                <ImageUpload
                    value={product.image_url}
                    onChange={(url) =>
                        setProduct((prev) => ({
                            ...prev,
                            image_url: url,
                        }))
                    }
                />

                <input
                    className="border rounded-lg p-3 w-full"
                    placeholder="Nombre"
                    value={product.name}
                    onChange={(e) =>
                        setProduct((prev) => ({
                            ...prev,
                            name: e.target.value,
                            slug: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, "-"),
                        }))
                    }
                />

                <textarea
                    rows={5}
                    className="border rounded-lg p-3 w-full"
                    placeholder="Descripción"
                    value={product.description}
                    onChange={(e) =>
                        setProduct((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />

                <div className="grid grid-cols-2 gap-5">

                    <select
                        className="border rounded-lg p-3"
                        value={product.category_id}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                category_id: Number(e.target.value),
                            }))
                        }
                    >
                        <option value={0}>
                            Seleccionar categoría
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}

                    </select>

                    <input
                        className="border rounded-lg p-3"
                        placeholder="SKU"
                        value={product.sku}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                sku: e.target.value,
                            }))
                        }
                    />

                    <input
                        className="border rounded-lg p-3"
                        placeholder="Código de barras"
                        value={product.barcode}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                barcode: e.target.value,
                            }))
                        }
                    />

                </div>

                <div className="grid grid-cols-3 gap-5">

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Precio"
                        value={product.price}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                price: Number(e.target.value),
                            }))
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Precio anterior"
                        value={product.price_old}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                price_old: Number(e.target.value),
                            }))
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                stock: Number(e.target.value),
                            }))
                        }
                    />

                </div>

                <div className="grid grid-cols-4 gap-5">

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Peso"
                        value={product.weight}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                weight: Number(e.target.value),
                            }))
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Ancho"
                        value={product.width}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                width: Number(e.target.value),
                            }))
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Alto"
                        value={product.height}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                height: Number(e.target.value),
                            }))
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Profundidad"
                        value={product.depth}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                depth: Number(e.target.value),
                            }))
                        }
                    />

                </div>

                <div className="flex items-center gap-8">

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={product.featured}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    featured: e.target.checked,
                                }))
                            }
                        />

                        Destacado

                    </label>

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={product.active}
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    active: e.target.checked,
                                }))
                            }
                        />

                        Activo

                    </label>

                </div>

                <button
                    onClick={save}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
                >
                    Guardar Cambios
                </button>

            </div>

        </main>
    );
}