import ProductPage from '@/components/ui/ProductPage';

export const metadata = {
    title: 'Retencja stała drukowana | Digital Dental Lab',
    description: 'Cyfrowo projektowana retencja stała z żywicy biokompatybilnej - precyzja zamiast ręcznego wyginania',
};

export default function FixedRetainerPage() {
    return (
        <ProductPage
            productKey="fixedRetainer"
            imagePath="/images/products/fixed-retainer/hero.webp"
            accentColor="from-emerald-500 to-teal-500"
            gradient="from-emerald-500/10 to-teal-500/10"
        />
    );
}
