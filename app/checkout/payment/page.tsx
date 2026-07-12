import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function PaymentPage() {
    return (
        <Suspense
            fallback={
                <main className="max-w-xl mx-auto py-20">
                    <h1 className="text-3xl font-bold">
                        Preparando pago...
                    </h1>
                </main>
            }
        >
            <PaymentClient />
        </Suspense>
    );
}