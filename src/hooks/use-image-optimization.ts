
import { useState, useEffect } from 'react';

interface UseImageOptimizationProps {
  src: string;
  quality?: number;
  width?: number;
  height?: number;
}

export function useImageOptimization({ 
  src, 
  quality = 75, 
  width, 
  height 
}: UseImageOptimizationProps) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setError('No image source provided');
      setIsLoading(false);
      return;
    }

    // Agar rasm allaqachon optimized bo'lsa
    if (src.includes('/_next/image')) {
      setOptimizedSrc(src);
      setIsLoading(false);
      return;
    }

    try {
      const url = new URL('/_next/image', window.location.origin);
      url.searchParams.set('url', encodeURIComponent(src));
      url.searchParams.set('q', quality.toString());
      
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());

      setOptimizedSrc(url.toString());
      setIsLoading(false);
    } catch (err) {
      setError('Failed to optimize image');
      setOptimizedSrc(src); // Fallback to original
      setIsLoading(false);
    }
  }, [src, quality, width, height]);

  return { optimizedSrc, isLoading, error };
}
