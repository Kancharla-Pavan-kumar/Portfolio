import { Inter } from "next/font/google";
import localFont from "next/font/local";

import type { Metadata } from "next";

import { LayoutWrapper } from "@/components/layout-wrapper";
import { SplashScreen } from "@/components/splash-screen";
import { StyleGlideProvider } from "@/components/styleglide-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "K.Y. Pavan Kumar — Full Stack Developer",
    template: "%s | Pavan Kumar",
  },
  description:
    "Personal portfolio of K.Y. Pavan Kumar — Full Stack Developer skilled in Java, Spring Boot, React, and modern web technologies.",
  keywords: [
    "Pavan Kumar",
    "Full Stack Developer",
    "Java Developer",
    "Spring Boot",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Software Engineer",
    "Web Developer",
  ],
  authors: [{ name: "K.Y. Pavan Kumar" }],
  creator: "K.Y. Pavan Kumar",
  publisher: "K.Y. Pavan Kumar",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "K.Y. Pavan Kumar — Full Stack Developer",
    description:
      "Personal portfolio of K.Y. Pavan Kumar — Full Stack Developer skilled in Java, Spring Boot, React, and modern web technologies.",
    siteName: "Pavan Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mainline - Modern Next.js Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K.Y. Pavan Kumar — Full Stack Developer",
    description:
      "Personal portfolio of K.Y. Pavan Kumar — Full Stack Developer skilled in Java, Spring Boot, React, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@ausrobdev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <base target="_blank"/>
      </head>
      <body className={`${dmSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StyleGlideProvider />
          <SplashScreen>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SplashScreen>
        </ThemeProvider>
      </body>
    </html>
  );
}
