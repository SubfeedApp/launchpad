import './globals.css';

export const metadata = {
  title: 'AI Chat - Powered by Subfeed',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
