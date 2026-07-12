"use client";

import { useRouter } from "next/navigation";

import { generateShippingLabel } from "@/lib/shipping";

export default function ShippingActions({
    orderId,
    label,
}: {
    orderId: number;
    label: string | null;
}) {
    const router = useRouter();

    async function generate() {
        await generateShippingLabel(orderId);

        router.refresh();
    }

    return (
        <div className="space-y-3">

            <button
                onClick={generate}
                className="w-full bg-blue-600 text-white rounded-lg py-3"
            >
                Generar etiqueta
            </button>

            {label && (
                <a
                    href={label}
                    target="_blank"
                    className="block w-full bg-green-600 text-white rounded-lg py-3 text-center"
                >
                    Descargar etiqueta
                </a>
            )}

        </div>
    );
}