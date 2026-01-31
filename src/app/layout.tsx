import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { I18nProvider } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Digital Dental Laboratory | Precision 3D Printing',
  description: 'Future of digital dentistry. Precision-engineered dental solutions from 3D scans.',
  openGraph: {
    title: 'Digital Dental Laboratory',
    description: 'Precision 3D printing for digital dentistry',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="font-sans">
        <I18nProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
