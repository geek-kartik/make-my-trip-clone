import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MakeMyTrip - #1 Travel Website for Flight & Hotel Booking",
  description:
    "Find best deals at MakeMyTrip for Flight Tickets & Hotels Booking. Book cheap air tickets online for your upcoming trip with MakeMyTrip."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
