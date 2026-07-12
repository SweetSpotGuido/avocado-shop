import { NextResponse } from "next/server";

import { resend } from "@/lib/resend";

export async function POST(req: Request) {

    const body = await req.json();

    await resend.emails.send({

        from: "Avocado Shop <ventas@avocadotech.ar>",

        to: body.email,

        subject: `Pedido #${body.orderId}`,

        html: `
      <h1>Gracias por tu compra</h1>

      <p>

      Tu pedido <b>#${body.orderId}</b>
      fue recibido correctamente.

      </p>

      <p>

      Total:

      <b>$${Number(body.total).toLocaleString()}</b>

      </p>
    `,

    });

    return NextResponse.json({
        ok: true,
    });

}