import { notFound } from "next/navigation";

import {
    getOrder,
} from "@/lib/order-service";

import {
    getOrderItems,
} from "@/lib/order-item-service";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({
    params,
}: Props) {

    const { id } = await params;

    const order = await getOrder(Number(id));

    if (!order) notFound();

    const items = await getOrderItems(order.id);

    return (

        <main className="max-w-5xl mx-auto py-12">

            <h1 className="text-4xl font-bold mb-8">

                Pedido #{order.id}

            </h1>

            <div className="bg-white rounded-xl shadow">

                <table className="w-full">

                    <thead>

                        <tr>

                            <th className="p-4 text-left">
                                Producto
                            </th>

                            <th>
                                Cant.
                            </th>

                            <th>
                                Precio
                            </th>

                            <th>
                                Total
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item: any) => (

                            <tr
                                key={item.id}
                                className="border-t"
                            >

                                <td className="p-4">

                                    {item.product_name}

                                </td>

                                <td>

                                    {item.quantity}

                                </td>

                                <td>

                                    ${item.price}

                                </td>

                                <td>

                                    ${item.subtotal}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="bg-white rounded-xl shadow mt-8 p-6">

                <p>

                    <strong>Estado:</strong>

                    {" "}

                    {order.status}

                </p>

                <p>

                    <strong>Pago:</strong>

                    {" "}

                    {order.payment_status}

                </p>

                <p>

                    <strong>Tracking:</strong>

                    {" "}

                    {order.tracking_code || "-"}

                </p>

                <div className="bg-white rounded-xl shadow p-6 mt-8">

                    <h2 className="text-2xl font-bold mb-4">

                        Dirección de envío

                    </h2>

                    <p>

                        {order.addresses.receiver}

                    </p>

                    <p>

                        {order.addresses.address}

                    </p>

                    <p>

                        {order.addresses.city}

                        {" - "}

                        {order.addresses.province}

                    </p>

                    <p>

                        {order.addresses.postal_code}

                    </p>

                </div>

            </div>

        </main>

    );

}