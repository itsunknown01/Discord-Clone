import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextAuthProvider from "@/components/providers/next-auth-provider";
import QueryProvider from "@/components/providers/query-provider";
import { auth } from "@/services/next-auth/auth";
import ModalProvider from "@/components/providers/modal-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Discord",
  description: "Created by Ayushman Gohain",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider session={session}>
          <QueryProvider>
            <ModalProvider />
            {children}
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
