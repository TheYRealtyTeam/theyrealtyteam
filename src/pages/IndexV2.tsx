import React from 'react'

// Eager imports to avoid multiple React instances during lazy chunking
import MainNavbar from '../components/navbar/MainNavbarV2'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSectionV2'
import AboutSection from '../components/AboutSectionV2'
import ServicesSection from '../components/ServicesSection'
import AreasSection from '../components/AreasSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import Map from '../components/MapV2'

const IndexV2 = () => {
  React.useEffect(() => {
    document.title = "Y Realty Team | Property Management Nationwide"
    console.log('[IndexV2] loaded')
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AreasSection />
        <section id="coverage-map" className="section-padding bg-yrealty-blue/10">
          <div className="container-custom">
            <h2 className="section-title">Our Coverage Map</h2>
            <p className="section-subtitle">Explore where the Y Realty Team operates nationwide.</p>
            <div className="rounded-xl overflow-hidden shadow-md">
              <Map />
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default IndexV2
