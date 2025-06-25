
import React, { useEffect, useRef } from 'react';

export const AnimationObserver = () => {
  console.log('AnimationObserver: Component called');
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Element[]>([]);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const isInitializedRef = useRef(false);

  // Function to observe elements with the 'reveal' class
  const observeElements = () => {
    try {
      if (!observerRef.current) return;
      
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      
      if (revealElements.length > 0) {
        console.log(`Found ${revealElements.length} unobserved reveal elements`);
      }
      
      revealElements.forEach((el) => {
        // Only observe if not already observed
        if (!elementsRef.current.includes(el)) {
          elementsRef.current.push(el);
          observerRef.current?.observe(el);
        }
      });
    } catch (error) {
      console.error('Error finding reveal elements:', error);
    }
  };

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current) return;
    
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
      // Create the IntersectionObserver
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Element is now visible:', entry.target);
            entry.target.classList.add('active');
            // Once element is revealed, stop observing it
            observerRef.current?.unobserve(entry.target);
            // Remove from tracked elements
            elementsRef.current = elementsRef.current.filter(el => el !== entry.target);
          }
        });
      }, observerOptions);

      // Mark as initialized
      isInitializedRef.current = true;

      // Initial observation with a delay to ensure DOM is ready
      setTimeout(observeElements, 100);
      
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
          setTimeout(observeElements, 100);
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
      console.error('Error setting up IntersectionObserver:', error);
    }

    return () => {
      try {
        if (observerRef.current) {
          elementsRef.current.forEach((el) => {
            observerRef.current?.unobserve(el);
          });
          observerRef.current.disconnect();
        }
        
        if (mutationObserverRef.current) {
          mutationObserverRef.current.disconnect();
        }
        
        // Reset initialization flag
        isInitializedRef.current = false;
      } catch (error) {
        console.error('Error cleaning up observers:', error);
      }
    };
  }, []);

  return null;
};

export default AnimationObserver;
