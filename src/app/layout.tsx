import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, Caveat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Puck Platform — Premium Templates, Live in Minutes",
  description:
    "Pick a premium business template, customize it in a visual editor, and publish your site in minutes. No coding required.",
  openGraph: {
    title: "Puck Platform — Premium Templates, Live in Minutes",
    description: "Pick a premium business template, customize it visually, and publish in minutes. No coding required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  );
}
