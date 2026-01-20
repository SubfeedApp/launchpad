import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Summarizer AI - Powered by Subfeed",
  description: "AI that reads any URL and summarizes it instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen antialiased">{children}</body>
    </html>
  );
}
