
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/floating-navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlantDoc - An AI based application for Crop Disease Detection",
  description: "An AI based application for Crop Disease Detection",
  icons:"favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="./logo.png" />
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
