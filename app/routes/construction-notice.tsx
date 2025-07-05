"use client"
import { useState, useEffect } from "react"

export function ConstructionNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the notice after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Betriebsferien</h2>
            </div>
          </div>
          
          <div className="mb-6 border border-amber-200 bg-amber-50 rounded-lg p-4 relative">
            <div className="text-gray-700 leading-relaxed pr-8">
              <strong>Wichtiger Hinweis:</strong> Wir haben Ferien bis zum 5. August. 
              <br />
              <br />
              Vielen Dank für Ihr Verständnis!
            </div>
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-2 right-2 bg-amber-600 hover:bg-amber-700 text-white h-8 w-8 rounded flex items-center justify-center transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}