import type { Metadata } from 'next';
import PatientGuidePage from '@/components/ui/PatientGuidePage';

export const metadata: Metadata = {
    title: 'Instrukcja pielęgnacji nakładki | APM Digital Lab',
    description: 'Jak czyścić, nosić i dbać o nakładkę dentystyczną. Instrukcja dla pacjentów.',
    robots: 'noindex, nofollow',
};

export default function PatientPage() {
    return <PatientGuidePage />;
}
