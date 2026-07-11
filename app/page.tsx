import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto p-8">

        <section className="bg-green-100 rounded-xl p-16 text-center">

          <h1 className="text-5xl font-bold">
            Bienvenido a Avocado Shop
          </h1>

          <p className="mt-6 text-xl">
            Comprá tecnología al mejor precio.
          </p>

        </section>

      </main>

      <Footer />
    </>
  );
}
