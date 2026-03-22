import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'R&D — APM Digital Lab',
    description: 'Badania materiałowe, testy kliniczne i rozwój własnego oprogramowania produkcyjnego.',
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
