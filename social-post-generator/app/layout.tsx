import "./globals.css";

export const metadata = {
  title: "Social Post Generator AI - Powered by Subfeed",
  description: "AI that writes viral posts for X, LinkedIn, Threads, and Facebook",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
