import { NextResponse } from "next/server";
import { Payment } from "mercadopago";

import { mp } from "@/lib/mercadopago";

import {
    setOrderPaid,
} from "@/lib/order-service";

import {
    decreaseOrderStock,
} from "@/lib/order-item-service";

import {
    notifyNewOrder,
} from "@/lib/notifications";

import { getOrder } from "@/lib/order-service";

export async function POST(req: Request) {

    const body = await req.json();

    if (body.type !== "payment") {
        return NextResponse.json({
            ok: true,
        });
    }

    const payment = new Payment(mp);

    const result = await payment.get({
        id: body.data.id,
    });

    if (result.status !== "approved") {
        return NextResponse.json({
            ok: true,
        });
    }

    const orderId = Number(
        result.external_reference
    );

    const order = await getOrder(orderId);

    await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-order-email`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId,
                email: order.customer_email,
                total: order.total,
            }),
        }
    );

    await setOrderPaid(
        orderId,
        String(result.id)
    );

    await decreaseOrderStock(orderId);

    await notifyNewOrder(orderId);

    return NextResponse.json({
        ok: true,
    });

}