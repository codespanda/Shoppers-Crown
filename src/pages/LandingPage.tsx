import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import BrandsSection from '@/components/sections/BrandsSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import HowItWorks from '@/components/sections/HowItWorks'
import ShippingCalculator from '@/components/sections/ShippingCalculator'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <BrandsSection />
      <FeaturedProducts />
      <HowItWorks />
      <ShippingCalculator />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </main>
  )
}
