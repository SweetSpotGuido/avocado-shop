import { supabase } from "./supabase";
import { Order } from "@/types/order";

export async function createOrder(order: any) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Debe iniciar sesión");
    }

    const { data, error } = await supabase
        .from("orders")
        .insert({
            ...order,
            user_id: user.id,
        })
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
        .select(`
        *,
        addresses(*)
    `)
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

export async function getMyOrders() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
}

export async function setOrderPaid(
    orderId: number,
    paymentId: string
) {
    const { error } = await supabase
        .from("orders")
        .update({
            status: "Pagado",
            payment_status: "approved",
            mp_payment_id: paymentId,
            paid_at: new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) throw error;
}

export async function markEmailSent(
    orderId: number
) {
    await supabase
        .from("orders")
        .update({
            email_sent: true,
        })
        .eq("id", orderId);
}