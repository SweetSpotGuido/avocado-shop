"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import {
  getProduct,
  updateProduct,
} from "@/lib/product-service";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProduct(Number(id));

    setProduct(data);

    setLoading(false);
  }

  async function save() {
    await updateProduct(Number(id), product);

    router.push("/admin/products");
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="max-w-4xl">

      <h1 className="text-3xl font-bold mb-8">
        Editar Producto
      </h1>

      <div className="bg-white rounded-xl shadow p-8 space-y-5">

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
          className="border rounded w-full p-3"
          value={product.name}
          placeholder="Nombre"
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
          rows={6}
          className="border rounded w-full p-3"
          value={product.description}
          placeholder="Descripción"
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />

        <input
          className="border rounded w-full p-3"
          value={product.category}
          placeholder="Categoría"
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
        />

        <div className="grid grid-cols-2 gap-5">

          <input
            type="number"
            className="border rounded p-3"
            value={product.price}
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
            className="border rounded p-3"
            value={product.stock}
            placeholder="Stock"
            onChange={(e) =>
              setProduct({
                ...product,
                stock: Number(e.target.value),
              })
            }
          />

        </div>

        <label className="flex items-center gap-3">

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

          Producto activo

        </label>

        <button
          onClick={save}
          className="bg-green-600 text-white px-8 py-3 rounded-lg"
        >
          Guardar Cambios
        </button>

      </div>

    </div>
  );
}
