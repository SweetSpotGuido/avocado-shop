"use client";

import { useState } from "react";

import { updateShipping } from "@/lib/shipping-service";

export default function ShippingCard({
    order,
}: {
    order: any;
}) {
    const [tracking, setTracking] = useState(
        order.tracking_code || ""
    );

    const [company, setCompany] = useState(
        order.shipping_company || "Correo Argentino"
    );

    async function save() {
        await updateShipping(order.id, {
            shipping_company: company,
            tracking_code: tracking,
            shipping_status: "Enviado",
        });

        alert("Envío actualizado");
    }

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                Envío
            </h2>

            <select
                className="border rounded-lg p-3 w-full mb-4"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            >
                <option>Correo Argentino</option>
                <option>Andreani</option>
                <option>OCA</option>
            </select>

            <input
                className="border rounded-lg p-3 w-full mb-4"
                placeholder="Tracking"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
            />

            <button
                onClick={save}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
                Guardar envío
            </button>

        </div>
    );
}