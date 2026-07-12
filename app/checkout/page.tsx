"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AddressSelector from "@/components/AddressSelector";

import { getCart, clearCart } from "@/lib/cart";
import { getUser } from "@/lib/auth";
import { createOrder } from "@/lib/order-service";
import { createOrderItems } from "@/lib/order-item-service";

export default function CheckoutPage() {
    const router = useRouter();

    const [cart, setCart] = useState<any[]>([]);

    const [addressId, setAddressId] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const user = await getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        setForm({
            name: "",
            email: user.email ?? "",
            phone: "",
        });

        const items = getCart();

        if (items.length === 0) {
            router.push("/cart");
            return;
        }

        setCart(items);
    }

    const total = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum + Number(item.price) * item.quantity,
            0
        );
    }, [cart]);

    async function finishOrder() {
        const user = await getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        if (!addressId) {
            alert("Seleccioná una dirección.");
            return;
        }

        try {
            const order = await createOrder({
                customer_name: form.name,
                customer_email: form.email,
                customer_phone: form.phone,

                address_id: addressId,

                total,

                status: "Pendiente",

                payment_status: "pending",
            });

            await createOrderItems(
                order.id,
                cart
            );

            clearCart();

            router.push(
                `/checkout/payment?order=${order.id}`
            );

        } catch (error) {
            console.error(error);
            alert("No se pudo crear el pedido.");
        }
    }

    return (
        <main className="max-w-6xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-10">
                Checkout
            </h1>

            <div className="grid grid-cols-2 gap-10">

                <div className="space-y-6">

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Datos del comprador
                        </h2>

                        <input
                            className="border rounded-lg p-3 w-full mb-4"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            className="border rounded-lg p-3 w-full mb-4"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />

                        <input
                            className="border rounded-lg p-3 w-full"
                            placeholder="Teléfono"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                        />

                    </div>

                    <div className="bg-white rounded-xl shadow p-6">

                        <h2 className="text-2xl font-bold mb-5">
                            Dirección de envío
                        </h2>

                        <AddressSelector
                            value={addressId}
                            onChange={setAddressId}
                        />

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow p-6 h-fit">

                    <h2 className="text-2xl font-bold mb-6">
                        Resumen
                    </h2>

                    <div className="space-y-4">

                        {cart.map((item) => (

                            <div
                                key={item.id}
                                className="flex justify-between"
                            >

                                <div>

                                    <p className="font-medium">
                                        {item.name}
                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {item.quantity} × $
                                        {Number(item.price).toLocaleString()}

                                    </p>

                                </div>

                                <strong>

                                    $
                                    {(
                                        Number(item.price) *
                                        item.quantity
                                    ).toLocaleString()}

                                </strong>

                            </div>

                        ))}

                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between text-2xl font-bold">

                        <span>Total</span>

                        <span>

                            $
                            {total.toLocaleString()}

                        </span>

                    </div>

                    <button
                        onClick={finishOrder}
                        className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
                    >
                        Continuar al pago
                    </button>

                </div>

            </div>

        </main>
    );
}