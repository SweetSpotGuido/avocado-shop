import { supabase } from "./supabase";

export async function updateShipping(
    orderId: number,
    values: {
        shipping_company?: string;
        tracking_code?: string;
        tracking_url?: string;
        label_url?: string;
        shipping_status?: string;
    }
) {
    const { error } = await supabase
        .from("orders")
        .update(values)
        .eq("id", orderId);

    if (error) throw error;
}