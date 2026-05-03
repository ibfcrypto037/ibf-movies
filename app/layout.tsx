'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import Script from "next/script";
import { useEffect } from "react";
import { initTelegramApp } from "@/lib/telegram";
import { initInAppInterstitial } from "@/lib/monetag";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initTelegramApp();
    // Wait 10 seconds so user can browse first
    // Then start automatic background ads
    const timeout = setTimeout(() => {
      initInAppInterstitial()
    }, 10000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <html lang="en">
      <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <Script
          src="//libtl.com/sdk.js"
          data-zone="10954902"
          data-sdk="show_10954902"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <MobileHeader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
