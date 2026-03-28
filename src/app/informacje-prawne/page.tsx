import type { Metadata } from 'next';
import LegalPage from '@/components/ui/LegalPage';

export const metadata: Metadata = {
    title: 'Informacje prawne',
    robots: { index: false },
};

export default function Page() {
    return <LegalPage />;
}
