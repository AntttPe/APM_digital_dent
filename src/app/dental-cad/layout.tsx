import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DentalCAD — APM Digital Lab',
    description: 'Next-generation CAD engine for digital dentistry based on Signed Distance Fields.',
    robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
