'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import Script from "next/script";
import { useEffect } from "react";
import { initTelegramApp } from "@/lib/telegram";

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
    setTimeout(() => {
      if (typeof show_10954902 !== 'undefined') {
        show_10954902({
          type: 'inApp',
          inAppSettings: {
            frequency: 2,
            capping: 0.1,
            interval: 30,
            timeout: 8,
            everyPage: false
          }
        })
      }
    }, 10000)
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
