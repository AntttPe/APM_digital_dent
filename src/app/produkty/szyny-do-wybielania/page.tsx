import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Szyny do wybielania nakładowego 3D',
    description: 'Szyny do wybielania z precyzyjnymi rezerwuarami żelowymi. Dopasowane na skanie 3D, bez tradycyjnego wycisku. Dostawa 1–3 dni robocze.',
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