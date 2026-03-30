import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ProfessionalGate from '@/components/ui/ProfessionalGate';
import { I18nProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';

const inter = Inter({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: '300',
    display: 'swap',
    variable: '--font-cormorant',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://apmdental.pl'),
    title: {
        default: 'Szyny stomatologiczne drukowane 3D — APM Dental Lab',
        template: '%s | APM Dental Lab',
    },
    description: 'Szyny retencyjne, relaksacyjne i do wybielania nakładkowego drukowane 3D. Od pliku STL do gotowej szyny w 48h. Cyfrowe laboratorium dla gabinetów i klinik stomatologicznych.',
    icons: {
        icon: '/images/logos/favicon.svg',
    },
    openGraph: {
        siteName: 'APM Dental Lab',
        type: 'website',
        locale: 'pl_PL',
        images: [
            {
                url: '/api/og',
                width: 1200,
                height: 630,
                alt: 'APM Dental Lab — Szyny stomatologiczne drukowane 3D',
            },
        ],
    },
    robots: { index: true, follow: true },
};

// Anti-flash: reads localStorage/system preference before first paint
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if((s||p)==='dark')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            {/* Preload pierwszej klatki hero — skraca LCP na mobile */}
            <link rel="preload" as="image" href="/images/hero/sequence/0001.webp" fetchPriority="high" />
        </head>
        <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider>
            <I18nProvider>
                <ProfessionalGate />
                <ScrollProgress />
                <Header />
                <main>{children}</main>
                <Footer />
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
