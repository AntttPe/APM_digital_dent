import type { Metadata } from 'next';
import FAQPage from '@/components/ui/FAQPage';
import pl from '@/lib/translations/pl.json';

export const metadata: Metadata = {
    title: 'FAQ — Najczęściej zadawane pytania',
    description: 'Odpowiedzi na pytania o zamówienie szyn stomatologicznych drukowanych 3D. Formaty skanów, czas realizacji, materiały, warunki współpracy.',
};

// FAQ schema dla Google rich snippets i AI Overviews
function buildFaqSchema() {
    const categories = pl.faq.categories;
    const mainEntity = categories.flatMap(cat =>
        cat.items.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.a,
            },
        }))
    );
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity,
    };
}

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
            />
            <FAQPage />
        </>
    );
}
