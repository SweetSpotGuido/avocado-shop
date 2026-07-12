"use client";

import { useCallback, useEffect, useState } from "react";
import { getOrders } from "@/lib/order-service";
import { Order } from "@/types/order";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    const load = useCallback(async () => {
        const data = await getOrders();
        setOrders(data as Order[]);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

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
                                <Link
                                    href={`/admin/orders/${order.id}`}
                                    className="text-green-600 hover:underline"
                                >
                                    #{order.id}
                                </Link>
                            </td>
                            <td>{order.customer_name}</td>
                            <td>${Number(order.total).toLocaleString()}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}