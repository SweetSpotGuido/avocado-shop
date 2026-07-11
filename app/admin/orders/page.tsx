"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/order-service";

export default function OrdersPage() {

    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setOrders(await getOrders());
    }

    return (

        <main>

            <h1 className="text-3xl font-bold mb-8">

                Pedidos

            </h1>

            <table className="w-full bg-white rounded-xl shadow">

                <thead>

                    <tr className="bg-zinc-100">

                        <th className="p-4">Pedido</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr
                            key={order.id}
                            className="border-t"
                        >

                            <td className="p-4">

                                #{order.id}

                            </td>

                            <td>

                                {order.customer_name}

                            </td>

                            <td>

                                ${Number(order.total).toLocaleString()}

                            </td>

                            <td>

                                {order.status}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </main>

    );

}