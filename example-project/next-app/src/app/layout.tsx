import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stencil / NextJS coexistence demo',
  description: 'A demo of using Stencil components in NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
