import Link from "next/link";

import { getMyOrders } from "@/lib/order-service";

export default async function MyOrdersPage() {

    const orders = await getMyOrders();

    return (

        <main className="max-w-6xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-8">

                Mis pedidos

            </h1>

            <table className="w-full bg-white rounded-xl shadow">

                <thead>

                    <tr className="border-b">

                        <th className="p-4 text-left">
                            Pedido
                        </th>

                        <th>
                            Fecha
                        </th>

                        <th>
                            Estado
                        </th>

                        <th>
                            Total
                        </th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order: any) => (

                        <tr
                            key={order.id}
                            className="border-b"
                        >

                            <td className="p-4">

                                #{order.id}

                            </td>

                            <td>

                                {new Date(order.created_at)
                                    .toLocaleDateString()}

                            </td>

                            <td>

                                {order.status}

                            </td>

                            <td>

                                ${Number(order.total)
                                    .toLocaleString()}

                            </td>

                            <td>

                                <Link
                                    href={`/account/orders/${order.id}`}
                                    className="text-green-600"
                                >

                                    Ver

                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </main>

    );

}