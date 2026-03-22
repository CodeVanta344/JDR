import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to detect viewport changes in real-time and calculate optimal scale
 * Updates CSS variables dynamically based on current screen resolution
 */
export function useViewportScale() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
    devicePixelRatio: window.devicePixelRatio,
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  });

  const calculateScale = useCallback((width, height) => {
    // Base resolution reference (Full HD)
    const baseWidth = 1920;
    const baseHeight = 1080;
    
    // Calculate scale based on width primarily, with height as secondary factor
    const widthScale = width / baseWidth;
    const heightScale = height / baseHeight;
    
    // Use the smaller dimension to ensure everything fits
    let scale = Math.min(widthScale, heightScale);
    
    // Clamp scale to reasonable limits
    const minScale = 0.6;  // Minimum 60% for very small screens
    const maxScale = 1.4;  // Maximum 140% for very large screens
    
    scale = Math.max(minScale, Math.min(maxScale, scale));
    
    // Adjust for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    if (dpr >= 2) {
      // Slightly reduce scale on high DPI to prevent everything being too small
      scale *= 0.95;
    }
    
    return scale;
  }, []);

  const updateViewport = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = calculateScale(width, height);
    const dpr = window.devicePixelRatio || 1;
    
    setViewport({
      width,
      height,
      scale,
      devicePixelRatio: dpr,
      orientation: width > height ? 'landscape' : 'portrait'
    });

    // Update CSS variables in real-time
    const root = document.documentElement;
    root.style.setProperty('--viewport-width', `${width}px`);
    root.style.setProperty('--viewport-height', `${height}px`);
    root.style.setProperty('--ui-scale', scale.toFixed(3));
    root.style.setProperty('--device-pixel-ratio', dpr.toString());
    
    // Update font size based on scale
    const baseFontSize = Math.max(12, Math.min(18, 16 * scale));
    root.style.setProperty('--dynamic-font-size', `${baseFontSize}px`);
    
    // Apply compact mode for small heights
    if (height < 700) {
      document.body.classList.add('hud-compact');
    } else {
      document.body.classList.remove('hud-compact');
    }
    
    // Apply ultra-wide layout for very wide screens
    if (width / height > 2) {
      document.body.classList.add('ultrawide-layout');
    } else {
      document.body.classList.remove('ultrawide-layout');
    }
  }, [calculateScale]);

  useEffect(() => {
    // Initial calculation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateViewport();

    // Listen for resize events with debouncing for performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateViewport, 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', updateViewport);
    
    // Listen for device pixel ratio changes (when moving between monitors)
    const mediaQuery = window.matchMedia('(resolution: 1dppx)');
    const handleDprChange = () => updateViewport();
    mediaQuery.addEventListener('change', handleDprChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateViewport);
      mediaQuery.removeEventListener('change', handleDprChange);
      clearTimeout(resizeTimeout);
    };
  }, [updateViewport]);

  return viewport;
}

/**
 * Hook to detect if screen size matches specific breakpoint
 */
export function useBreakpoint(breakpoint) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQuery.matches);

    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return matches;
}

/**
 * Predefined breakpoints for common screen sizes
 */
export const breakpoints = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px) and (max-width: 1440px)',
  wide: '(min-width: 1441px) and (max-width: 1920px)',
  ultrawide: '(min-width: 1921px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  highDpi: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
};
