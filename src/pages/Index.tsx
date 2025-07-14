import React, { useEffect } from 'react'
import MainNavbar from '../components/navbar/MainNavbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import AreasSection from '../components/AreasSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const Index = () => {
  console.log('Index component rendering');
  
  useEffect(() => {
    document.title = "Y Realty Team | Premium Property Management Services"
    console.log('Index component mounted');
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