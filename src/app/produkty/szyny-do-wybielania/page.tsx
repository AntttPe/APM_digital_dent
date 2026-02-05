import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Szyny do wybielania nakładowego | Digital Dental Lab',
    description: 'Precyzyjnie dopasowane szyny do wybielania z kontrolowaną grubością i rezerwuarami żelowymi',
};

export default function AlignersPage() {
    return (
        <ProductPage
            productKey="aligners"
            imagePath="/images/products/aligners/hero.webp"
            accentColor="from-zinc-100 to-white"
            gradient="from-zinc-400/10 to-slate-300/10"
        />
    );
}