import Hero from '@/sections/Hero';
import DigitalWorkflow from '@/sections/DigitalWorkflow';
import Products from '@/sections/Products';
import InjectionSystem from '@/sections/InjectionSystem';
import Software from '@/sections/Software';
import Technology from '@/sections/Technology';
import Contact from '@/sections/Contact';

export default function Home() {
    // ⚠️ PRODUCTION FLAGS
    const SHOW_INJECTION_SYSTEM = false; // false na produkcji
    const SHOW_SOFTWARE = false; // false na produkcji

    return (
        <>
            <Hero />
            <DigitalWorkflow />
            <Products />

            {/* 🚧 DEVELOPMENT ONLY - InjectionSystem */}
            {SHOW_INJECTION_SYSTEM && <InjectionSystem />}

            <Technology />
            <Contact />

            {/* 🚧 DEVELOPMENT ONLY - Software */}
            {SHOW_SOFTWARE && <Software />}

        </>
    );
}