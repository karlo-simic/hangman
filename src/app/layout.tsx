import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";

import { cn } from "@/shared/lib";
import { ThemeProvider } from "@/entities/theme";
import { ContentCenter, Toaster } from "@/shared/ui";

import { StoreProvider } from "@/app/store/store-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hangman",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const userName = cookieStore.get("userName");

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StoreProvider userName={userName?.value}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col lg:py-16 py-4">
              <ContentCenter className="flex flex-col flex-1">
                {children}
              </ContentCenter>
            </main>
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
