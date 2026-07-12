"use client";

import { useEffect, useState } from "react";

import { getAddresses } from "@/lib/address-service";

interface Props {
    value: number | null;
    onChange: (id: number) => void;
}

export default function AddressSelector({
    value,
    onChange,
}: Props) {
    const [addresses, setAddresses] = useState<any[]>([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await getAddresses();
        setAddresses(data);

        if (data.length && value === null) {
            const selected =
                data.find((a) => a.is_default) ?? data[0];

            onChange(selected.id);
        }
    }

    if (!addresses.length) {
        return (
            <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
                <p>No tenés direcciones guardadas.</p>

                <a
                    href="/account/addresses"
                    className="text-green-600 font-semibold"
                >
                    Agregar dirección
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {addresses.map((address) => (
                <label
                    key={address.id}
                    className="border rounded-lg p-4 flex gap-3 cursor-pointer"
                >
                    <input
                        type="radio"
                        checked={value === address.id}
                        onChange={() => onChange(address.id)}
                    />

                    <div>
                        <p className="font-bold">
                            {address.receiver}
                        </p>

                        <p>{address.address}</p>

                        <p>
                            {address.city} - {address.province}
                        </p>

                        <p>{address.postal_code}</p>
                    </div>
                </label>
            ))}
        </div>
    );
}