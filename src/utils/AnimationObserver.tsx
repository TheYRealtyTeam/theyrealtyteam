
import React from 'react';

export const AnimationObserver = () => {
  console.log('AnimationObserver component rendering');
  
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const elementsRef = React.useRef<Element[]>([]);
  const mutationObserverRef = React.useRef<MutationObserver | null>(null);

  const observeElements = React.useCallback(() => {
    try {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      
      if (revealElements.length > 0) {
        console.log(`Found ${revealElements.length} unobserved reveal elements`);
      }
      
      revealElements.forEach((el) => {
        if (!elementsRef.current.includes(el)) {
          elementsRef.current.push(el);
          observerRef.current?.observe(el);
        }
      });
    } catch (error) {
      console.error('Error finding reveal elements:', error);
    }
  }, []);

  React.useEffect(() => {
    console.log('AnimationObserver useEffect running');
    
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
            console.log('Element is now visible:', entry.target);
            entry.target.classList.add('active');
            observerRef.current?.unobserve(entry.target);
          }
        });
      }, observerOptions);

      observeElements();
      
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
          setTimeout(observeElements, 50);
        }
      });
      
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
      console.log('AnimationObserver cleanup running');
      
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
      
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
      }
    };
  }, [observeElements]);

  return null;
};

export default AnimationObserver;
