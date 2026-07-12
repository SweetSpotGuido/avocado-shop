import { supabase } from "./supabase";

export async function createPayment(data: any) {
    const { error } = await supabase
        .from("payments")
        .insert(data);

    if (error) throw error;
}

export async function updateOrderPayment(
    orderId: number,
    status: string
) {
    const { error } = await supabase
        .from("orders")
        .update({
            payment_status: status,
        })
        .eq("id", orderId);

    if (error) throw error;
}