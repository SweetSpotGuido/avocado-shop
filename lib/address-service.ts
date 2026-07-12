import { supabase } from "./supabase";

async function getCurrentUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export async function getAddresses() {
    const user = await getCurrentUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", {
            ascending: false,
        });

    if (error) throw error;

    return data ?? [];
}

export async function createAddress(values: any) {
    const user = await getCurrentUser();

    if (!user) throw new Error("No autenticado");

    const { error } = await supabase
        .from("addresses")
        .insert({
            ...values,
            user_id: user.id,
        });

    if (error) throw error;
}

export async function updateAddress(
    id: number,
    values: any
) {
    const { error } = await supabase
        .from("addresses")
        .update(values)
        .eq("id", id);

    if (error) throw error;
}

export async function deleteAddress(id: number) {
    const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function setDefaultAddress(
    id: number
) {
    const user = await getCurrentUser();

    if (!user) return;

    await supabase
        .from("addresses")
        .update({
            is_default: false,
        })
        .eq("user_id", user.id);

    await supabase
        .from("addresses")
        .update({
            is_default: true,
        })
        .eq("id", id);
}

export async function getDefaultAddress() {
    const user = await getCurrentUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_default", true)
        .single();

    if (error) return null;

    return data;
}