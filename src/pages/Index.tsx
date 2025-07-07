
import React, { useEffect } from 'react'

const Index = () => {
  console.log('Index: Rendering Index component')
  
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
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Y Realty Team
          </h1>
          <p className="text-xl text-gray-600">
            Premium Property Management Services
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index
