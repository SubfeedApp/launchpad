import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chat - Powered by Subfeed",
  description: "Chat with AI powered by Subfeed Cloud",
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
