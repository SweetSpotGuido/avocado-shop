"use client";

import { useCallback, useEffect, useState } from "react";

import {
    Category,
    CategoryInput,
    getCategories,
    createCategory,
    deleteCategory,
} from "@/lib/category-service";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("");

    const load = useCallback(async () => {
        const data = await getCategories();
        setCategories(data);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    async function save() {
        if (!name.trim()) return;

        const category: CategoryInput = {
            name: name.trim(),
            slug: name
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-"),
            image_url: "",
            active: true,
        };

        await createCategory(category);

        setName("");

        await load();
    }

    async function remove(id: number) {
        await deleteCategory(id);
        await load();
    }

    return (
        <main>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">
                    Categorías
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow p-8 mb-10">
                <div className="flex gap-4">
                    <input
                        className="border rounded-lg p-3 flex-1"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        onClick={save}
                        className="bg-green-600 text-white px-6 rounded-lg"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            <table className="w-full bg-white rounded-xl shadow">
                <thead>
                    <tr className="bg-zinc-100">
                        <th className="p-4 text-left">Nombre</th>
                        <th className="text-left">Slug</th>
                        <th className="text-center">Activo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr
                            key={category.id}
                            className="border-t"
                        >
                            <td className="p-4">
                                {category.name}
                            </td>

                            <td>
                                {category.slug}
                            </td>

                            <td className="text-center">
                                {category.active ? "Sí" : "No"}
                            </td>

                            <td className="text-right p-4">
                                <button
                                    onClick={() => remove(category.id)}
                                    className="text-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}