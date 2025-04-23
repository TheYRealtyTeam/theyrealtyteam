
import React, { useEffect, useRef, useCallback } from 'react';

export const AnimationObserver = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimize by using useCallback for the observation handler
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Once activated, we can stop observing the element to improve performance
        if (observerRef.current) {
          observerRef.current.unobserve(entry.target);
        }
      }
    });
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    // Create observer with the memoized callback
    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    // Get all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    
    // Start observing elements
    if (revealElements.length > 0) {
      revealElements.forEach((el) => {
        observerRef.current?.observe(el);
      });
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  return null;
};

export default AnimationObserver;
