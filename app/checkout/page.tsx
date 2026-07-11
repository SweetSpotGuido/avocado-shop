"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getCart, clearCart } from "@/lib/cart";
import { createOrder } from "@/lib/order-service";

import { createOrderItems } from "@/lib/order-item-service";
import { decreaseStock } from "@/lib/product-service";

export default function CheckoutPage() {
    const router = useRouter();

    const cart = getCart();

    const total = cart.reduce(
        (a, b) => a + b.price * b.quantity,
        0
    );

    const [form, setForm] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        address: "",
        city: "",
        province: "",
        zip_code: "",
    });

    async function finishOrder() {

        const order = await createOrder({
            ...form,
            total,
            status: "Pendiente",
        });

        await createOrderItems(order.id, cart);

        for (const item of cart) {
            await decreaseStock(item.id, item.quantity);
        }

        clearCart();

        router.push(`/order-success?id=${order.id}`);

    }

    return (
        <main className="max-w-4xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                Checkout
            </h1>

            <div className="space-y-4">

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Nombre"
                    onChange={(e) =>
                        setForm({ ...form, customer_name: e.target.value })
                    }
                />

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Email"
                    onChange={(e) =>
                        setForm({ ...form, customer_email: e.target.value })
                    }
                />

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Teléfono"
                    onChange={(e) =>
                        setForm({ ...form, customer_phone: e.target.value })
                    }
                />

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Dirección"
                    onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                    }
                />

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Ciudad"
                    onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                    }
                />

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Provincia"
                    onChange={(e) =>
                        setForm({ ...form, province: e.target.value })
                    }
                />

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Código Postal"
                    onChange={(e) =>
                        setForm({ ...form, zip_code: e.target.value })
                    }
                />

            </div>

            <div className="mt-10 bg-white rounded-xl shadow p-8">

                <h2 className="text-3xl font-bold">

                    Total

                </h2>

                <p className="text-5xl text-green-600 font-bold mt-4">

                    ${total.toLocaleString()}

                </p>

                <button
                    onClick={finishOrder}
                    className="mt-8 bg-green-600 text-white w-full py-4 rounded-lg"
                >
                    Confirmar Pedido
                </button>

            </div>

        </main>
    );
}
