import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/components/themeProvider";
import StoreProvider from "@/redux/storeProvider";
import ThemeLayout from "@/components/theme-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Rick and Morty characters",
    default: "Rick and Morty characters",
  },
  description:
    "This is an app for learning Next.js with examples of Rick and Morty characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <ThemeLayout>{children}</ThemeLayout>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
