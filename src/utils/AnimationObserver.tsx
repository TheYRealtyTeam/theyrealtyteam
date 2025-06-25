
import React, { useEffect, useRef } from 'react';

export const AnimationObserver = () => {
  console.log('AnimationObserver: Component initialized');
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Element[]>([]);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const isInitializedRef = useRef(false);
  const mountedRef = useRef(true);

  // Safe function to observe elements with the 'reveal' class
  const observeElements = () => {
    if (!mountedRef.current || !observerRef.current) return;
    
    try {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      
      if (revealElements.length > 0) {
        console.log(`AnimationObserver: Found ${revealElements.length} unobserved reveal elements`);
      }
      
      revealElements.forEach((el) => {
        if (!elementsRef.current.includes(el) && mountedRef.current) {
          elementsRef.current.push(el);
          observerRef.current?.observe(el);
        }
      });
    } catch (error) {
      console.error('AnimationObserver: Error finding reveal elements:', error);
    }
  };

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current || !mountedRef.current) return;
    
    // Check for browser support
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      console.warn('AnimationObserver: IntersectionObserver not supported');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    try {
      console.log('AnimationObserver: Setting up observers');
      
      // Create the IntersectionObserver
      observerRef.current = new IntersectionObserver((entries) => {
        if (!mountedRef.current) return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && mountedRef.current) {
            console.log('AnimationObserver: Element revealed:', entry.target.className);
            entry.target.classList.add('active');
            
            // Stop observing this element
            observerRef.current?.unobserve(entry.target);
            elementsRef.current = elementsRef.current.filter(el => el !== entry.target);
          }
        });
      }, observerOptions);

      // Mark as initialized
      isInitializedRef.current = true;

      // Initial observation with delay for DOM readiness
      const initialTimeout = setTimeout(() => {
        if (mountedRef.current) {
          observeElements();
        }
      }, 200);
      
      // Set up MutationObserver for dynamic content
      if (window.MutationObserver) {
        mutationObserverRef.current = new MutationObserver((mutations) => {
          if (!mountedRef.current) return;
          
          let shouldCheck = false;
          
          mutations.forEach((mutation) => {
            if (!mountedRef.current) return;
            
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
          
          if (shouldCheck && mountedRef.current) {
            setTimeout(() => {
              if (mountedRef.current) {
                observeElements();
              }
            }, 150);
          }
        });
        
        // Observe document changes
        mutationObserverRef.current.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['data-state', 'class'],
        });
      }

      return () => {
        clearTimeout(initialTimeout);
      };
      
    } catch (error) {
      console.error('AnimationObserver: Error setting up observers:', error);
    }

    return () => {
      console.log('AnimationObserver: Cleaning up observers');
      mountedRef.current = false;
      
      try {
        if (observerRef.current) {
          elementsRef.current.forEach((el) => {
            observerRef.current?.unobserve(el);
          });
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        
        if (mutationObserverRef.current) {
          mutationObserverRef.current.disconnect();
          mutationObserverRef.current = null;
        }
        
        // Reset state
        elementsRef.current = [];
        isInitializedRef.current = false;
      } catch (error) {
        console.error('AnimationObserver: Error during cleanup:', error);
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default AnimationObserver;
