import React, { useEffect, Suspense, lazy } from 'react'
import MainNavbar from '../components/navbar/MainNavbar'
import Footer from '../components/Footer'

// Component-level code splitting for home sections
const HeroSection = lazy(() => import('../components/HeroSection'))
const AboutSection = lazy(() => import('../components/AboutSection'))
const ServicesSection = lazy(() => import('../components/ServicesSection'))
const AreasSection = lazy(() => import('../components/AreasSection'))
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'))
const ContactSection = lazy(() => import('../components/ContactSection'))

const Index = () => {
  useEffect(() => {
    document.title = "Y Realty Team | Property Management Nationwide"
    console.log('[Index] loaded v2')
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
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
      <Footer />
    </div>
  )
}

export default Index
