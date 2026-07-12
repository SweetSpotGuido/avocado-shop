import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

import { mp } from "@/lib/mercadopago";

export async function POST(req: Request) {
    const body = await req.json();

    const preference = new Preference(mp);

    const result = await preference.create({
        body: {
            external_reference: String(body.orderId),

            items: body.items,

            back_urls: {
                success: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success`,
                failure: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
                pending: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
            },

            auto_return: "approved",

            notification_url:
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
        },
    });

    return NextResponse.json(result);
}
