import { Poppins } from "next/font/google";
import React from "react";
import "./globals.css";
import TopNav from "./components/topnav";
import NextWebVitals from "nextlevelpackage";
import Script from 'next/script';
import SessionWrapper from './components/SessionWrapper'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '400', '600'],
  style: ['normal', 'italic']
})

export const metadata = {
  title: 'NextLevel',
  description: 'NextLevel Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={poppins.className}>
        <SessionWrapper>
          <TopNav />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
