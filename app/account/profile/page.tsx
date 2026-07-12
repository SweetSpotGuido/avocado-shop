"use client";

import { useEffect, useState } from "react";

import {
    getProfile,
    updateProfile,
} from "@/lib/profile-service";

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        phone: "",
    });

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await getProfile();

        if (data) {
            setProfile(data);
        }
    }

    async function save() {
        await updateProfile(profile);

        alert("Datos guardados");
    }

    return (
        <main className="max-w-xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-8">

                Mis datos

            </h1>

            <div className="bg-white rounded-xl shadow p-8 space-y-4">

                <input
                    className="border rounded-lg p-3 w-full"
                    placeholder="Nombre"
                    value={profile.first_name}
                    onChange={(e) =>
                        setProfile({
                            ...profile,
                            first_name: e.target.value,
                        })
                    }
                />

                <input
                    className="border rounded-lg p-3 w-full"
                    placeholder="Apellido"
                    value={profile.last_name}
                    onChange={(e) =>
                        setProfile({
                            ...profile,
                            last_name: e.target.value,
                        })
                    }
                />

                <input
                    className="border rounded-lg p-3 w-full"
                    placeholder="Teléfono"
                    value={profile.phone}
                    onChange={(e) =>
                        setProfile({
                            ...profile,
                            phone: e.target.value,
                        })
                    }
                />

                <button
                    onClick={save}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg"
                >
                    Guardar
                </button>

            </div>

        </main>
    );
}