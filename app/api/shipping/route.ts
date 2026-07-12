import { NextResponse } from "next/server";

export async function POST() {

    return NextResponse.json({

        tracking: "CA123456789AR",

        company: "Correo Argentino",

        label_url: "",

    });

}