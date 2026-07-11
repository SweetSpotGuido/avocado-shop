import { supabase } from "./supabase";

export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) throw error;

    return data ?? [];
}

export async function getProduct(id: number) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

export async function createProduct(product: any) {
    const { error } = await supabase
        .from("products")
        .insert(product);

    if (error) throw error;
}

export async function updateProduct(
    id: number,
    product: any
) {
    const { error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id);

    if (error) throw error;
}

export async function deleteProduct(id: number) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function decreaseStock(
    id: number,
    quantity: number
) {
    const product = await getProduct(id);

    const { error } = await supabase
        .from("products")
        .update({
            stock: product.stock - quantity,
        })
        .eq("id", id);

    if (error) throw error;
}