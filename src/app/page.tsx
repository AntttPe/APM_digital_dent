import Hero from '@/sections/Hero';
import DigitalWorkflow from '@/sections/DigitalWorkflow';
import Products from '@/sections/Products';
import Technology from '@/sections/Technology';
import Contact from '@/sections/Contact';
import WhyDigital from '@/sections/WhyDigital';
import WhyChooseUs from '@/sections/WhyChooseUs';

export default function Home() {
    return (
        <>
            <Hero />
            <DigitalWorkflow />
            <Products />
            <WhyDigital />
            <WhyChooseUs />
            <Technology />
            <Contact />
        </>
    );
}
