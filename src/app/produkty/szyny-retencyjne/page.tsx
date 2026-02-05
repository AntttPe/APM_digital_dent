import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Szyny retencyjne | Digital Dental Lab',
    description: 'Cyfrowo projektowane szyny retencyjne z pełną kontrolą nad geometrią i retencją',
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