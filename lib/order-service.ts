import { supabase } from "./supabase";
import { Order } from "@/types/order";

export async function createOrder(order: Order) {
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

export async function getOrder(id: number) {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

export async function updateOrder(
    id: number,
    values: any
) {
    const { error } = await supabase
        .from("orders")
        .update(values)
        .eq("id", id);

    if (error) throw error;
}

export async function updateOrderStatus(
    id: number,
    status: string
) {
    const values: any = {
        status,
    };

    if (status === "Enviado") {
        values.shipped_at = new Date().toISOString();
    }

    if (status === "Entregado") {
        values.delivered_at = new Date().toISOString();
    }

    const { error } = await supabase
        .from("orders")
        .update(values)
        .eq("id", id);

    if (error) throw error;
}