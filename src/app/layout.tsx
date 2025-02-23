import type React from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { PersonProvider } from "./PersonContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visygo - AI-Powered Immigration Processing",
  description: "Streamline your immigration process with Visygo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PersonProvider>{children}</PersonProvider>
      </body>
    </html>
  );
}
