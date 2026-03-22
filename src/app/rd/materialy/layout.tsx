import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Badania materiałowe — APM Digital Lab R&D',
    description: 'Systematyczna weryfikacja drukarek i żywic klinicznych. Metodologia doboru materiałów stosowanych w produkcji nakładek dentystycznych.',
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
