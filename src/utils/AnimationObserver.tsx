
import React, { useEffect, useRef } from 'react';

export const AnimationObserver = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported in this browser');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    try {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once element is revealed, stop observing it
            observerRef.current?.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal');
      elementsRef.current = Array.from(revealElements);
      
      elementsRef.current.forEach((el) => {
        observerRef.current?.observe(el);
      });
    } catch (error) {
      console.error('Error setting up IntersectionObserver:', error);
    }

    return () => {
      if (observerRef.current) {
        elementsRef.current.forEach((el) => {
          try {
            observerRef.current?.unobserve(el);
          } catch (error) {
            console.error('Error cleaning up observer:', error);
          }
        });
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
};

export default AnimationObserver;
