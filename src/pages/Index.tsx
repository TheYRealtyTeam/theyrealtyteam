import React, { useEffect, Suspense, lazy } from 'react'

// Component-level code splitting for home sections with cache-busting
const bust = 'v2025-08-07-1'
const MainNavbar = lazy(() => import(`../components/navbar/MainNavbar?${bust}`))
const Footer = lazy(() => import(`../components/Footer?${bust}`))
const HeroSection = lazy(() => import(`../components/HeroSection?${bust}`))
const AboutSection = lazy(() => import(`../components/AboutSection?${bust}`))
const ServicesSection = lazy(() => import(`../components/ServicesSection?${bust}`))
const AreasSection = lazy(() => import(`../components/AreasSection?${bust}`))
const TestimonialsSection = lazy(() => import(`../components/TestimonialsSection?${bust}`))
const ContactSection = lazy(() => import(`../components/ContactSection?${bust}`))

const Index = () => {
  useEffect(() => {
    document.title = "Y Realty Team | Property Management Nationwide"
    console.log('[Index] loaded v4')
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
        <MainNavbar />
      </Suspense>
      <main>
        <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <AreasSection />
          <TestimonialsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Index
