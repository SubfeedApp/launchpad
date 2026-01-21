import "./globals.css";

export const metadata = {
  title: "Research AI - Powered by Subfeed",
  description: "AI-powered search with real-time sources",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
