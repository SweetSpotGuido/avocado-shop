"use client";

import { useEffect, useState } from "react";

import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setCart(getCart());
  }

  const total = cart.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <main className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-10">
        Carrito
      </h1>

      <div className="space-y-5">

        {cart.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-5 flex items-center gap-5"
          >

            <img
              src={item.image_url}
              className="w-28 h-28 object-cover rounded"
              alt={item.name}
            />

            <div className="flex-1">

              <h2 className="text-xl font-bold">
                {item.name}
              </h2>

              <p className="text-green-700 text-2xl">
                ${item.price}
              </p>

            </div>

            <input
              type="number"
              value={item.quantity}
              className="w-20 border rounded p-2"
              onChange={(e) => {
                updateQuantity(
                  item.id,
                  Number(e.target.value)
                );
                load();
              }}
            />

            <button
              onClick={() => {
                removeFromCart(item.id);
                load();
              }}
              className="text-red-600"
            >
              Eliminar
            </button>

          </div>

        ))}

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">

        <h2 className="text-3xl font-bold">

          Total: ${total.toLocaleString()}

        </h2>

        <button
          className="mt-6 bg-green-600 text-white px-8 py-4 rounded-lg"
        >
          Finalizar Compra
        </button>

      </div>

    </main>
  );
}
