
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import AreasSection from '../components/AreasSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import AIChat from '../components/chat/AIChat'
import AnimationObserver from '../utils/AnimationObserver'

const Index = () => {
  useEffect(() => {
    document.title = "Y Realty Team | Premium Property Management Services"
    
    const metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    metaDescription.content = 'Y Realty Team offers premium property management services with expert tenant placement, maintenance coordination, and financial reporting for residential and commercial properties.'
    document.head.appendChild(metaDescription)
    
    const canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    canonicalLink.href = 'https://theYteam.co'
    document.head.appendChild(canonicalLink)
    
    return () => {
      const description = document.querySelector('meta[name="description"]')
      const canonical = document.querySelector('link[rel="canonical"]')
      if (description) description.remove()
      if (canonical) canonical.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AreasSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChat />
      <AnimationObserver />
    </div>
  )
}

export default Index
