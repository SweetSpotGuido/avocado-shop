import { supabase } from "./supabase";

export async function getDashboard() {
    const [{ count: products }, { count: orders }] = await Promise.all([
        supabase
            .from("products")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("orders")
            .select("*", { count: "exact", head: true }),
    ]);

    const { data: lastOrders } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);

    const { data: lastProducts } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);

    const { data: totals } = await supabase
        .from("orders")
        .select("total")
        .eq("status", "Pagado");

    const sales =
        totals?.reduce(
            (sum, order) => sum + Number(order.total),
            0
        ) ?? 0;

    return {
        products: products ?? 0,
        orders: orders ?? 0,
        sales,
        lastOrders: lastOrders ?? [],
        lastProducts: lastProducts ?? [],
    };
}