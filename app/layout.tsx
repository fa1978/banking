import type { Metadata } from "next";
//import localFont from "next/font/local";

import "./globals.css";

/*const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});*/

import { Inter, IBM_Plex_Serif } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable:'--font-inter' ,
  weight: ['400', '700'],
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  variable:'--font-ibm-plex-serif',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern banking platform for everyone.",
  icons:{icon:'/icons/logo.svg'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
