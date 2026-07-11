"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    setCart(getCart());
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-10">
        Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold">
            Tu carrito está vacío
          </h2>

          <Link
            href="/productos"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Ver productos
          </Link>

        </div>
      ) : (
        <>
          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-5 flex items-center gap-5"
              >

                <img
                  src={item.image_url || "/no-image.png"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-green-600 text-2xl font-bold">
                    ${Number(item.price).toLocaleString()}
                  </p>

                </div>

                <input
                  type="number"
                  min={1}
                  className="w-20 border rounded p-2 text-center"
                  value={item.quantity}
                  onChange={(e) => {
                    updateQuantity(
                      item.id,
                      Number(e.target.value)
                    );
                    loadCart();
                  }}
                />

                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    loadCart();
                  }}
                  className="text-red-600 font-semibold"
                >
                  Eliminar
                </button>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-xl shadow p-8 mt-10">

            <div className="flex justify-between text-3xl font-bold">

              <span>Total</span>

              <span>
                ${total.toLocaleString()}
              </span>

            </div>

            <Link
              href="/checkout"
              className="block w-full mt-8 bg-green-600 text-white text-center py-4 rounded-lg hover:bg-green-700"
            >
              Finalizar Compra
            </Link>

          </div>
        </>
      )}

    </main>
  );
}
