import Providers from "@/components/providers/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import ModalWrapper from "@/components/modals/ModalWrapper";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Air travel and tour",
  description:
    "AirTnT, An Airbnb clone with Next.js 13 app router and advanced features",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers currentUser={currentUser}>
          <ClientOnly>
            <ModalWrapper />
          </ClientOnly>
          <Navbar />

          <main className="py-6 sm:py-8 px-3 sm:px-5">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
