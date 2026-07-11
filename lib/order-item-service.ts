import { supabase } from "./supabase";

export async function createOrderItems(
  orderId: number,
  items: any[]
) {
  const rows = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    product_name: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  }));

  const { error } = await supabase
    .from("order_items")
    .insert(rows);

  if (error) throw error;
}
