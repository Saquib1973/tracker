import { Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import AuthProvider from "./api/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track your Issues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="lime" grayColor="mauve" radius="large">
              <Navbar />
              <main className="p-2 max-w-3xl mx-auto mt-10">{children}</main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
