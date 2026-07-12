import { getOrder } from "@/lib/order-service";
import { getOrderItems } from "@/lib/order-item-service";
import OrderStatus from "@/components/OrderStatus";
import ShippingCard from "@/components/ShippingCard";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderPage({
    params,
}: Props) {
    const { id } = await params;

    const order = await getOrder(Number(id));
    const items = await getOrderItems(Number(id));

    return (
        <main className="max-w-6xl mx-auto">

            <h1 className="text-4xl font-bold mb-8">
                Pedido #{order.id}
            </h1>

            <div className="grid grid-cols-3 gap-8">

                <div className="col-span-2 bg-white rounded-xl shadow">

                    <div className="p-6 border-b">

                        <h2 className="text-2xl font-bold">
                            Productos
                        </h2>

                    </div>

                    <table className="w-full">

                        <thead>

                            <tr className="bg-zinc-100">

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
                                    Subtotal
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

                                    <td className="text-center">
                                        {item.quantity}
                                    </td>

                                    <td className="text-center">
                                        ${Number(item.price).toLocaleString()}
                                    </td>

                                    <td className="text-center">
                                        ${Number(item.subtotal).toLocaleString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="bg-white rounded-xl shadow p-6 space-y-4">

                    <h2 className="text-2xl font-bold">
                        Cliente
                    </h2>

                    <p>
                        <strong>Nombre</strong><br />
                        {order.customer_name}
                    </p>

                    <p>
                        <strong>Email</strong><br />
                        {order.customer_email}
                    </p>

                    <p>
                        <strong>Teléfono</strong><br />
                        {order.customer_phone}
                    </p>

                    <p>
                        <strong>Dirección</strong><br />
                        {order.address}
                    </p>

                    <hr />

                    <div>

                        <strong>Estado</strong>

                        <div className="mt-2">

                            <OrderStatus
                                id={order.id}
                                status={order.status}
                            />

                        </div>

                    </div>

                    <p>

                        <strong>Seguimiento</strong>

                        <br />

                        {order.tracking_code || "-"}

                    </p>

                    <p>

                        <strong>Enviado</strong>

                        <br />

                        {order.shipped_at || "-"}

                    </p>

                    <p>

                        <strong>Entregado</strong>

                        <br />

                        {order.delivered_at || "-"}

                    </p>

                    <p>
                        <strong>Pago</strong><br />
                        {order.payment_status}
                    </p>

                    <p className="text-3xl font-bold text-green-600">

                        ${Number(order.total).toLocaleString()}

                    </p>

                    <ShippingCard order={order} />

                </div>

            </div>

        </main>
    );
}