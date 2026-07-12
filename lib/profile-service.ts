import { supabase } from "./supabase";

export async function getProfile() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) return null;

    return data;
}

export async function updateProfile(values: any) {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
        .from("profiles")
        .upsert({
            id: user.id,
            ...values,
        });

    if (error) throw error;
}