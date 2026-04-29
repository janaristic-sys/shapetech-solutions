'use client'

import { Suspense, useEffect } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any
    }
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  useEffect(() => {
    // Load the Spline Viewer script dynamically
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js'
    document.head.appendChild(script)

    // Hide the Spline logo badge once the viewer is loaded
    const interval = setInterval(() => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        // Try multiple selectors just in case
        const logo = viewer.shadowRoot.querySelector('#logo') || 
                     viewer.shadowRoot.querySelector('a[href*="spline"]') ||
                     viewer.shadowRoot.querySelector('.spline-watermark');
        
        if (logo) {
          logo.remove();
          clearInterval(interval);
        }
      }
    }, 100);

    // Also inject a style to hide it if it re-appears
    const style = document.createElement('style');
    style.innerHTML = `
      spline-viewer {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
    document.head.appendChild(style);

    return () => clearInterval(interval);
  }, [])

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <div className={className}>
        <spline-viewer url={scene} />
      </div>
    </Suspense>
  )
} 
