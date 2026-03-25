import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Galeria realizacji — APM Digital Lab',
    description: 'Prawdziwe zdjęcia nakładek dentystycznych na zębach pacjentów.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
