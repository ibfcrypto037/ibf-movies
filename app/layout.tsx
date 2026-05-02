'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import Script from "next/script";
import { useEffect } from "react";

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
    if (typeof window !== 'undefined' && 
        window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()
      tg.setHeaderColor('#080808')
      tg.setBackgroundColor('#080808')
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
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
