import AdminCard from "@/components/AdminCard";

export default function AdminPage() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <AdminCard
          title="Productos"
          value={0}
          href="/admin/products"
        />

        <AdminCard
          title="Pedidos"
          value={0}
          href="/admin/orders"
        />

        <AdminCard
          title="Clientes"
          value={0}
          href="/admin/customers"
        />

        <AdminCard
          title="Ventas"
          value="$0"
          href="/admin/orders"
        />

      </div>

    </div>
  );
}
