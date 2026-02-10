import type { Metadata } from 'next';
import './globals.css';
import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Feline Digital Solutions | Agile. Precise. Elegant.',
  description: 'Feline Digital Solutions provides agile, precise, and elegant technology services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ThreeBackground />

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
