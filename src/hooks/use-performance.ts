
import { useEffect, useRef, useState } from 'react';

// Intersection Observer hook
export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref.current, options]);

  return { ref, isIntersecting };
}

export function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        // Web Vitals ni track qilamiz
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
          
          // Analytics ga yuborish
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(entry.startTime),
              event_category: 'Performance',
            });
          }
        }

        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round((entry as any).processingStart - entry.startTime),
              event_category: 'Performance',
            });
          }
        }

        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round((entry as any).value * 1000),
              event_category: 'Performance',
            });
          }
        }
      });
    });

    // Web Vitals ni kuzatamiz
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);
}
