import EmailGenerator from '@/components/ui/EmailGenerator';

export const metadata = {
    title: 'Generator zamówienia | APM Digital Lab',
    description: 'Wygeneruj szablon maila z zamówieniem szyny stomatologicznej. Narzędzie działa wyłącznie w przeglądarce — żadne dane nie są przesyłane.',
    robots: { index: false },
};

export default function ZamowieniePage() {
    return <EmailGenerator />;
}
