import { supabase } from "./supabase";

export interface Category {
    id: number;
    name: string;
    slug: string;
    image_url: string;
    active: boolean;
    created_at?: string;
}

export type CategoryInput = Omit<Category, "id" | "created_at">;

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("active", true)
        .order("name");

    if (error) throw error;

    return (data ?? []) as Category[];
}

export async function getCategory(
    id: number
): Promise<Category | null> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

    if (error) return null;

    return data as Category;
}

export async function getCategoryBySlug(
    slug: string
): Promise<Category | null> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) return null;

    return data as Category;
}

export async function createCategory(
    category: CategoryInput
) {
    const { error } = await supabase
        .from("categories")
        .insert(category);

    if (error) throw error;
}

export async function updateCategory(
    id: number,
    category: CategoryInput
) {
    const { error } = await supabase
        .from("categories")
        .update(category)
        .eq("id", id);

    if (error) throw error;
}

export async function deleteCategory(id: number) {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) throw error;
}