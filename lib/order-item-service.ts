import { supabase } from "./supabase";

export async function getOrderItems(orderId: number) {
    const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

    if (error) throw error;

    return data ?? [];
}

export async function createOrderItems(
    orderId: number,
    items: any[]
) {
    const rows = items.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
    }));

    const { error } = await supabase
        .from("order_items")
        .insert(rows);

    if (error) throw error;
}