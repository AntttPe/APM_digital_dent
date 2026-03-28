import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Szyny relaksacyjne antybruksizmowe 3D',
    description: 'Szyny zgryzowe z kontrolowaną grubością stref ochronnych. Pacjent przestaje niszczyć szynę co 6 miesięcy. Druk 3D, dostawa 1–3 dni.',
};

export default function GuardsPage() {
    return (
        <ProductPage
            productKey="guards"
            imagePath="/images/products/guards/hero.webp"
            accentColor="from-pink-500 to-rose-500"
            gradient="from-pink-500/10 to-rose-500/10"
        />
    );
}