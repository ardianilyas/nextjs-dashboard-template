import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finexy - Admin Dashboard Template",
  description: "Modern, high-fidelity Admin Dashboard Template built with Next.js 16, Tailwind CSS v4, and shadcn UI primitives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F4F5F8] text-slate-900 selection:bg-[#F05323] selection:text-white">
        {children}
      </body>
    </html>
  );
}
