import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "MakeMyTrip - #1 Travel Website for Flight & Hotel Booking",
  description: "Find best deals at MakeMyTrip for Flight Tickets & Hotels Booking. Book cheap air tickets online for your upcoming trip with MakeMyTrip.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lato.variable} font-sans antialiased bg-[#f2f2f2] min-h-screen text-slate-800 selection:bg-blue-100`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
