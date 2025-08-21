
import React, { useEffect, useRef } from 'react';

export const AnimationObserver = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Element[]>([]);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  // Function to observe elements with the 'reveal' class
  const observeElements = () => {
    try {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      
      revealElements.forEach((el) => {
        // Only observe if not already observed
        if (!elementsRef.current.includes(el)) {
          elementsRef.current.push(el);
          observerRef.current?.observe(el);
        }
      });
    } catch (error) {
      // Error observing elements - continue without animation
    }
  };

  useEffect(() => {
    if (!window.IntersectionObserver) {
      // Browser doesn't support IntersectionObserver
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    try {
      // Create the IntersectionObserver
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once element is revealed, stop observing it
            observerRef.current?.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Initial observation
      observeElements();
      
      // Set up MutationObserver to detect DOM changes (like tab switching)
      mutationObserverRef.current = new MutationObserver((mutations) => {
        let shouldCheck = false;
        
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' && 
            mutation.attributeName === 'data-state' && 
            (mutation.target as Element).getAttribute('data-state') === 'active'
          ) {
            shouldCheck = true;
          }
          
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldCheck = true;
          }
        });
        
        if (shouldCheck) {
          // Wait a bit for the DOM to settle
          setTimeout(observeElements, 50);
        }
      });
      
      // Observe the entire document for changes
      mutationObserverRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-state', 'class'],
      });
    } catch (error) {
      // Error setting up IntersectionObserver - continue without animation
    }

    return () => {
      if (observerRef.current) {
        elementsRef.current.forEach((el) => {
          try {
            observerRef.current?.unobserve(el);
          } catch (error) {
            // Error cleaning up observer element - continue
          }
        });
        observerRef.current.disconnect();
      }
      
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
    };
  }, []);

  return null;
};

export default AnimationObserver;
