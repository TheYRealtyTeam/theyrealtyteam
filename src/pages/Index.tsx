import React, { useEffect, Suspense, lazy } from 'react'

// Component-level code splitting for home sections (no per-import cache-bust)
const MainNavbar = lazy(() => import('../components/navbar/MainNavbar'))
const Footer = lazy(() => import('../components/Footer'))
const HeroSection = lazy(() => import('../components/HeroSection'))
const AboutSection = lazy(() => import('../components/AboutSection'))
const ServicesSection = lazy(() => import('../components/ServicesSection'))
const AreasSection = lazy(() => import('../components/AreasSection'))
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'))
const ContactSection = lazy(() => import('../components/ContactSection'))

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
