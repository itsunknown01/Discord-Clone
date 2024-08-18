import NextAuthProvider from "@/components/providers/next-auth-provider";
import QueryProvider from "@/components/providers/query-provider";
import ReduxProvider from "@/components/providers/redux-provider";
import { auth } from "@/services/next-auth/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <QueryProvider>
            <ReduxProvider>
              <ModalProvider />
              {children}</ReduxProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
