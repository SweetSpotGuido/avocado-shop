"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ImageUpload from "@/components/ImageUpload";
import { createProduct } from "@/lib/product-service";
import { getCategories } from "@/lib/category-service";

interface Category {
    id: number;
    name: string;
}

export default function NewProductPage() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);

    const [product, setProduct] = useState({
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

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        const data = await getCategories();
        setCategories(data);
    }

    async function save() {
        await createProduct(product);
        router.push("/admin/products");
    }

    return (
        <main className="max-w-5xl mx-auto">

            <h1 className="text-4xl font-bold mb-10">
                Nuevo Producto
            </h1>

            <div className="bg-white rounded-xl shadow p-8 space-y-6">

                <ImageUpload
                    value={product.image_url}
                    onChange={(url) =>
                        setProduct({
                            ...product,
                            image_url: url,
                        })
                    }
                />

                <input
                    className="border rounded-lg p-3 w-full"
                    placeholder="Nombre"
                    value={product.name}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            name: e.target.value,
                            slug: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, "-"),
                        })
                    }
                />

                <textarea
                    rows={5}
                    className="border rounded-lg p-3 w-full"
                    placeholder="Descripción"
                    value={product.description}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            description: e.target.value,
                        })
                    }
                />

                <div className="grid grid-cols-2 gap-5">

                    <select
                        className="border rounded-lg p-3"
                        value={product.category_id}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                category_id: Number(e.target.value),
                            })
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
                            setProduct({
                                ...product,
                                sku: e.target.value,
                            })
                        }
                    />

                    <input
                        className="border rounded-lg p-3"
                        placeholder="Código de barras"
                        value={product.barcode}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                barcode: e.target.value,
                            })
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
                            setProduct({
                                ...product,
                                price: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Precio anterior"
                        value={product.price_old}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price_old: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                stock: Number(e.target.value),
                            })
                        }
                    />

                </div>

                <div className="grid grid-cols-4 gap-5">

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Peso (kg)"
                        value={product.weight}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                weight: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Ancho (cm)"
                        value={product.width}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                width: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Alto (cm)"
                        value={product.height}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                height: Number(e.target.value),
                            })
                        }
                    />

                    <input
                        type="number"
                        className="border rounded-lg p-3"
                        placeholder="Profundidad (cm)"
                        value={product.depth}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                depth: Number(e.target.value),
                            })
                        }
                    />

                </div>

                <div className="flex items-center gap-8">

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={product.featured}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    featured: e.target.checked,
                                })
                            }
                        />

                        Destacado

                    </label>

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={product.active}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    active: e.target.checked,
                                })
                            }
                        />

                        Activo

                    </label>

                </div>

                <button
                    onClick={save}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
                >
                    Guardar Producto
                </button>

            </div>

        </main>
    );
}