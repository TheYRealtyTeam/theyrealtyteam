
import React, { useEffect, useRef } from 'react'

export const AnimationObserver = () => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementsRef = useRef<Element[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observerRef.current?.unobserve(entry.target)
          elementsRef.current = elementsRef.current.filter(el => el !== entry.target)
        }
      })
    }, observerOptions)

    const observeElements = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.active)')
      
      revealElements.forEach((el) => {
        if (!elementsRef.current.includes(el)) {
          elementsRef.current.push(el)
          observerRef.current?.observe(el)
        }
      })
    }

    // Initial observation
    const timer = setTimeout(observeElements, 100)

    return () => {
      clearTimeout(timer)
      if (observerRef.current) {
        elementsRef.current.forEach((el) => {
          observerRef.current?.unobserve(el)
        })
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}

export default AnimationObserver
