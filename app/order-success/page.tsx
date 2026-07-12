interface Props {
    searchParams: Promise<{
        collection_id?: string;
        payment_id?: string;
        status?: string;
        external_reference?: string;
    }>;
}

export default async function Page({
    searchParams,
}: Props) {

    const params = await searchParams;

    return (

        <main className="max-w-3xl mx-auto py-24 text-center">

            <div className="bg-white rounded-xl shadow p-12">

                <h1 className="text-5xl font-bold text-green-600">

                    ¡Pago aprobado!

                </h1>

                <p className="mt-8">

                    Pedido:

                    <strong>

                        {" "}
                        #{params.external_reference}

                    </strong>

                </p>

                <p className="mt-3">

                    Pago:

                    <strong>

                        {" "}
                        {params.payment_id}

                    </strong>

                </p>

            </div>

        </main>

    );

}