import { supabase } from "./supabase";

export async function createOrder(order: any) {
    const { data, error } = await supabase
        .from("orders")
        .insert(order)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function getOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });

    if (error) throw error;

    return data ?? [];
}
