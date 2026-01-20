import "./globals.css";

export const metadata = {
  title: "Data Extractor AI - Powered by Subfeed",
  description: "Extract clean content from any URL in Markdown, text, or HTML",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
