import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Aarav Sharma | CS BTech Portfolio",
    template: "%s | Aarav Sharma",
  },
  description:
    "A premium 3D-first portfolio for a CS BTech student focused on full-stack products, AI experiments, and standout frontend execution.",
  keywords: [
    "CS student portfolio",
    "BTech portfolio",
    "Next.js student portfolio",
    "3D portfolio",
    "full-stack student developer",
  ],
  openGraph: {
    title: "Aarav Sharma | CS BTech Portfolio",
    description:
      "CS BTech student portfolio with immersive 3D visuals, strong product thinking, and full-stack project depth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarav Sharma | CS BTech Portfolio",
    description:
      "CS BTech student portfolio with immersive 3D visuals, strong product thinking, and full-stack project depth.",
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
