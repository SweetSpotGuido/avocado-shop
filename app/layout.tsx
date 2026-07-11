import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Avocado Shop",
  description: "Tecnología",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">

      <body className="bg-gray-100">

        <Header />

        {children}

        <Footer />

      </body>

    </html>
  );
}
