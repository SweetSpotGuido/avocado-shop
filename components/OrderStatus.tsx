"use client";

import { useState } from "react";

import { updateOrderStatus } from "@/lib/order-service";

const STATUS = [
    "Pendiente",
    "Pagado",
    "Preparando",
    "Enviado",
    "Entregado",
    "Cancelado",
];

export default function OrderStatus({
    id,
    status,
}: {
    id: number;
    status: string;
}) {
    const [value, setValue] = useState(status);
    const [saving, setSaving] = useState(false);

    async function change(newStatus: string) {
        setSaving(true);

        await updateOrderStatus(id, newStatus);

        setValue(newStatus);

        setSaving(false);
    }

    return (
        <select
            value={value}
            disabled={saving}
            className="border rounded-lg p-3 w-full"
            onChange={(e) => change(e.target.value)}
        >
            {STATUS.map((status) => (
                <option
                    key={status}
                    value={status}
                >
                    {status}
                </option>
            ))}
        </select>
    );
}