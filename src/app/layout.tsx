import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Gautam Sagar | Full Stack Portfolio",
    template: "%s | Gautam Sagar",
  },
  description:
    "Interactive portfolio of Gautam Sagar, a B.Tech CSE student and full stack developer focused on MERN, Next.js, realtime systems, and practical AI-powered products.",
  keywords: [
    "Gautam Sagar portfolio",
    "full stack developer portfolio",
    "MERN stack portfolio",
    "Next.js portfolio",
    "AI integration portfolio",
    "Socket.IO portfolio",
    "BTech CSE portfolio",
    "React Node MongoDB portfolio",
    "student developer portfolio",
  ],
  openGraph: {
    title: "Gautam Sagar | Full Stack Portfolio",
    description:
      "B.Tech CSE portfolio with MERN, Next.js, realtime systems, and practical AI-enabled full-stack development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gautam Sagar | Full Stack Portfolio",
    description:
      "B.Tech CSE portfolio with MERN, Next.js, realtime systems, and practical AI-enabled full-stack development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
