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
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          (logo as HTMLElement).style.display = 'none';
          clearInterval(interval);
        }
      }
    }, 100);

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
