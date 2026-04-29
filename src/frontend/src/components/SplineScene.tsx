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
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <div className={className}>
        <spline-viewer url={scene} />
      </div>
    </Suspense>
  )
} 
