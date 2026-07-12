"use client";

import { useEffect, useState } from "react";

import {
    createAddress,
    deleteAddress,
    getAddresses,
    setDefaultAddress,
} from "@/lib/address-service";

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<any[]>([]);

    const [form, setForm] = useState({
        receiver: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
    });

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setAddresses(await getAddresses());
    }

    async function save() {
        await createAddress(form);

        setForm({
            receiver: "",
            phone: "",
            address: "",
            city: "",
            province: "",
            postal_code: "",
        });

        load();
    }

    return (
        <main className="max-w-5xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-8">

                Mis direcciones

            </h1>

            <div className="bg-white rounded-xl shadow p-8 space-y-4">

                <input
                    placeholder="Destinatario"
                    className="border rounded p-3 w-full"
                    value={form.receiver}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            receiver: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Teléfono"
                    className="border rounded p-3 w-full"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Dirección"
                    className="border rounded p-3 w-full"
                    value={form.address}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            address: e.target.value,
                        })
                    }
                />

                <div className="grid grid-cols-3 gap-4">

                    <input
                        placeholder="Ciudad"
                        className="border rounded p-3"
                        value={form.city}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                city: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Provincia"
                        className="border rounded p-3"
                        value={form.province}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                province: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="CP"
                        className="border rounded p-3"
                        value={form.postal_code}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                postal_code: e.target.value,
                            })
                        }
                    />

                </div>

                <button
                    onClick={save}
                    className="bg-green-600 text-white rounded-lg px-8 py-3"
                >
                    Agregar dirección
                </button>

            </div>

            <div className="mt-8 space-y-4">

                {addresses.map((address) => (

                    <div
                        key={address.id}
                        className="bg-white rounded-xl shadow p-6"
                    >

                        <h2 className="font-bold">

                            {address.receiver}

                            {address.is_default && (
                                <span className="ml-2 text-green-600">
                                    (Predeterminada)
                                </span>
                            )}

                        </h2>

                        <p>{address.address}</p>

                        <p>
                            {address.city} - {address.province}
                        </p>

                        <div className="flex gap-3 mt-4">

                            <button
                                onClick={async () => {

                                    await setDefaultAddress(
                                        address.id
                                    );

                                    load();

                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Predeterminada
                            </button>

                            <button
                                onClick={async () => {

                                    await deleteAddress(
                                        address.id
                                    );

                                    load();

                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </main>
    );
}