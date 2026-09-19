import type { Metadata } from "next";
import { Manrope, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({ variable: "--font-dm-serif", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "ReserveFlow | Restaurant reservations made simple",
  description: "Real time restaurant reservations and capacity control for hospitality teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmSerif.variable}`}>{children}</body>
    </html>
  );
}
