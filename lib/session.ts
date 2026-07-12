import { supabase } from "./supabase";

export async function requireUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("LOGIN_REQUIRED");
    }

    return user;
}