import { supabase } from "./supabase";
import { Product, ProductInput } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("id", { ascending: false });

    if (error) throw error;

    return (data ?? []) as Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .eq("featured", true)
        .order("id", { ascending: false });

    if (error) throw error;

    return (data ?? []) as Product[];
}

export async function getProduct(id: number): Promise<Product | null> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return null;

    return data as Product;
}

export async function getProductBySlug(
    slug: string
): Promise<Product | null> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) return null;

    return data as Product;
}

export async function createProduct(product: ProductInput) {
    const { error } = await supabase
        .from("products")
        .insert(product);

    if (error) throw error;
}

export async function updateProduct(
    id: number,
    product: ProductInput
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

    if (!product) return;

    const { error } = await supabase
        .from("products")
        .update({
            stock: Math.max(product.stock - quantity, 0)
        })
        .eq("id", id);

    if (error) throw error;
}
