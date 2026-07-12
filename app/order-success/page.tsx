interface Props {
    searchParams: Promise<{
        id?: string;
    }>;
}

export default async function OrderSuccessPage({
    searchParams,
}: Props) {
    const { id } = await searchParams;

    return (
        <main className="max-w-4xl mx-auto p-20 text-center">
            <h1 className="text-5xl font-bold text-green-600">
                ¡Gracias por tu compra!
            </h1>

            <p className="mt-8 text-2xl">
                Número de pedido
            </p>

            <h2 className="text-6xl font-bold mt-4">
                #{id}
            </h2>
        </main>
    );
}
