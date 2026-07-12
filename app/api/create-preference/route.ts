import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

import { mp } from "@/lib/mercadopago";

export async function POST(req: Request) {

    const body = await req.json();

    const preference = new Preference(mp);

    const response = await preference.create({
        body: {
            items: body.items,

            external_reference: String(body.orderId),

            back_urls: {
                success: "http://localhost:3000/order-success",
                failure: "http://localhost:3000/cart",
                pending: "http://localhost:3000/cart",
            },

            auto_return: "approved",
        },
    });
}

