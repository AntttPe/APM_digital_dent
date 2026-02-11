import Hero from '@/sections/Hero';
import DigitalWorkflow from '@/sections/DigitalWorkflow';
import Products from '@/sections/Products';
import InjectionSystem from '@/sections/InjectionSystem';
import Software from '@/sections/Software';
import Technology from '@/sections/Technology';
import Contact from '@/sections/Contact';
import WhyDigital from '@/sections/WhyDigital';
import WhyChooseUs from '@/sections/WhyChooseUs'; // ← dodaj

export default function Home() {
    const SHOW_INJECTION_SYSTEM = false;
    const SHOW_SOFTWARE = false;
    const SHOW_FIXED_RETAINER = false;

    return (
        <>
            <Hero />
            <DigitalWorkflow />
            <Products showFixedRetainer={SHOW_FIXED_RETAINER} />
            <WhyDigital />
            <WhyChooseUs /> {/* ← dodaj po WhyDigital */}
            {SHOW_INJECTION_SYSTEM && <InjectionSystem />}
            <Technology />
            <Contact />
            {SHOW_SOFTWARE && <Software />}
        </>
    );
}