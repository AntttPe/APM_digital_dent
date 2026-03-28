import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Szyny retencyjne drukowane 3D',
    description: '95% szyn przyjętych bez korekty przy osadzeniu. Każda identyczna z projektem CAD. Zamów online, dostawa 1–3 dni robocze.',
};

export default function RetainersPage() {
    return (
        <ProductPage
            productKey="retainers"
            imagePath="/images/products/retainers/hero.webp"
            accentColor="from-blue-500 to-cyan-500"
            gradient="from-blue-500/10 to-cyan-500/10"
        />
    );
}