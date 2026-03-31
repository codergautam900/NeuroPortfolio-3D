import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Cinematic Portfolio | Creative Full-Stack Engineer",
    template: "%s | Cinematic Portfolio",
  },
  description:
    "A premium 3D-first portfolio built with Next.js, React 19, motion systems, and a polished contact pipeline.",
  keywords: [
    "Next.js portfolio",
    "3D portfolio",
    "creative developer",
    "full-stack engineer",
    "React Three Fiber",
  ],
  openGraph: {
    title: "Cinematic Portfolio",
    description:
      "Creative full-stack engineering with immersive 3D visuals and premium product storytelling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinematic Portfolio",
    description:
      "Creative full-stack engineering with immersive 3D visuals and premium product storytelling.",
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
