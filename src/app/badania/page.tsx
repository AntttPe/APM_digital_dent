import EvidencePage from '@/components/ui/EvidencePage';

export const metadata = {
    title: 'Badania i źródła naukowe',
    description: 'Dane i publikacje naukowe potwierdzające przewagę druku 3D nad termoformowaniem w produkcji szyn stomatologicznych.',
    robots: { index: false },
};

export default function Page() {
    return <EvidencePage />;
}