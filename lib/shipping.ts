import { supabase } from "./supabase";

export async function generateShippingLabel(
    orderId: number
) {
    const tracking = "CA" + Date.now();

    const label =
        "https://example.com/label.pdf";

    const { error } = await supabase
        .from("orders")
        .update({
            shipping_provider: "Correo Argentino",
            tracking_code: tracking,
            shipping_label_url: label,
            shipping_status: "Generada",
        })
        .eq("id", orderId);

    if (error) throw error;
}