import { useState, useEffect } from "react"
import { CalendarDays } from "lucide-react"

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className=" flex items-center justify-center p-4">
      <div className={`bg-gray-800 text-red-500 rounded-3xl relative overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ width: '650px', height: '450px' }}>
        <div className="absolute inset-0 z-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="30" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
              <circle id="pattern-circle" cx="5" cy="5" r="1" fill="#fff"></circle>
            </pattern>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-8">
          <div className="w-16 h-16 mb-4 rounded-full bg-white flex items-center justify-center border-4 border-red-500 animate-pulse">
            <CalendarDays className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-red-500">Reservieren Sie Ihren Tisch</h1>
          <p className="text-1xl  mb-4 text-white text-center">Genießen Sie authentische mexikanische Küche in El Sabor Mexicano. Reservieren Sie jetzt!</p>
                  <button
    type="submit"
    name="action"
    value="animated-border"
    className="relative px-6 py-3 font-bold text-gray-100 group"
  >
    <span className="absolute inset-0 transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 border-2 border-gray-300"></span>
    <span className="relative">  Jetzt Reservieren</span>
  </button>
        </div>
      </div>
    </div>
  )
}