"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentClient() {
    const searchParams = useSearchParams();

    useEffect(() => {
        async function createPreference() {
            const orderId = searchParams.get("order");

            if (!orderId) return;

            const cart = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

            const response = await fetch(
                "/api/create-preference",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderId,
                        items: cart.map((item: any) => ({
                            title: item.name,
                            quantity: item.quantity,
                            currency_id: "ARS",
                            unit_price: Number(item.price),
                        })),
                    }),
                }
            );

            const preference = await response.json();

            window.location.href = preference.init_point;
        }

        createPreference();
    }, [searchParams]);

    return (
        <main className="max-w-xl mx-auto py-20">
            <h1 className="text-3xl font-bold">
                Redirigiendo a Mercado Pago...
            </h1>
        </main>
    );
}