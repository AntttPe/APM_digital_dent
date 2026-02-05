import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Szyny relaksacyjne | Digital Dental Lab',
    description: 'Szyny zgryzowe z kontrolowaną grubością stref dla optymalnej ochrony przed bruksizmem',
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