import { supabase } from "./supabase";

export async function getImages(productId: number) {
    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("position");

    if (error) throw error;

    return data ?? [];
}

export async function addImage(
    productId: number,
    image_url: string
) {
    const { error } = await supabase
        .from("product_images")
        .insert({
            product_id: productId,
            image_url,
        });

    if (error) throw error;
}

export async function deleteImage(id: number) {
    const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function setPrimary(id: number, productId: number) {

    await supabase
        .from("product_images")
        .update({
            is_primary: false,
        })
        .eq("product_id", productId);

    await supabase
        .from("product_images")
        .update({
            is_primary: true,
        })
        .eq("id", id);

}