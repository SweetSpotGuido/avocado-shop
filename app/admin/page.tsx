import DashboardCard from "@/components/DashboardCard";
import { getDashboard } from "@/lib/dashboard-service";

export default async function AdminPage() {
    const dashboard = await getDashboard();

    return (
        <main>

            <h1 className="text-4xl font-bold mb-10">
                Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6 mb-10">

                <DashboardCard
                    title="Productos"
                    value={dashboard.products}
                />

                <DashboardCard
                    title="Pedidos"
                    value={dashboard.orders}
                />

                <DashboardCard
                    title="Ventas"
                    value={`$${dashboard.sales.toLocaleString()}`}
                />

                <DashboardCard
                    title="Clientes"
                    value="-"
                />

            </div>

            <div className="grid grid-cols-2 gap-8">

                <div className="bg-white rounded-xl shadow">

                    <div className="p-6 border-b">

                        <h2 className="text-2xl font-bold">
                            Últimos pedidos
                        </h2>

                    </div>

                    <table className="w-full">

                        <tbody>

                            {dashboard.lastOrders.map((order: any) => (

                                <tr
                                    key={order.id}
                                    className="border-b"
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

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="bg-white rounded-xl shadow">

                    <div className="p-6 border-b">

                        <h2 className="text-2xl font-bold">
                            Últimos productos
                        </h2>

                    </div>

                    <table className="w-full">

                        <tbody>

                            {dashboard.lastProducts.map((product: any) => (

                                <tr
                                    key={product.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {product.name}
                                    </td>

                                    <td>
                                        ${Number(product.price).toLocaleString()}
                                    </td>

                                    <td>
                                        Stock: {product.stock}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </main>
    );
}