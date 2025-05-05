import { Outfit } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from 'react-hot-toast';
import ReactQueryProvider from "./providers";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>CMWI Dashboard</title>
      </head>
      <body suppressHydrationWarning className={`${outfit.variable} dark:bg-gray-900`}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              zIndex: 9999,
            },
          }}
        />
        <NextTopLoader
          color="#1122B8DC"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <ThemeProvider>
          <SidebarProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
