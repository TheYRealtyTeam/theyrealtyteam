import React, { useEffect } from 'react'

// Eager imports to avoid multiple React instances during lazy chunking
import MainNavbar from '../components/navbar/MainNavbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import AreasSection from '../components/AreasSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'

const Index = () => {
  useEffect(() => {
    document.title = "Y Realty Team | Property Management Nationwide"
    console.log('[Index] loaded v4')
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AreasSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Index
