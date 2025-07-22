import type React from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { PersonProvider } from "./PersonContext";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/dashboard/app-sidebar";
import { cookies } from "next/headers";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visygo - AI-Powered Immigration Processing",
  description: "Streamline your immigration process with Visygo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SidebarProvider>
            <PersonProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1">{children}</main>
              </div>
            </PersonProvider>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
