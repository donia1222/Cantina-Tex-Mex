import { useState } from "react"
import { Utensils, Calendar, Ham, ChevronLeft, ChevronRight } from "lucide-react"
import GoogleBussines from '~/components/GoogleBussines'


export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    { id: 1, name: "Roland Vogler", rating: 5, comment: "Preiswerte Mittagsmenüs. Gutes Essen (Tex-Mex) und Cocktails.", avatar: "/unnamed.png" },
    { id: 2, name: "Ralph Heeb", rating: 5, comment: "Reservation von Vorteil ... gute Auswahl an Gerichten und Getränke. Sehr nette und Aufmerksame Bedienungen.", avatar: "/unnamed-1.png" },
    { id: 3, name: "Garry Cane", rating: 5, comment: "A very pleasant dining experience with good food. Not the place to go for a quiet meal. Really busy and very loud. Will be going again. Ive lived in the area for twenty years and didn't know about it until a friend suggested we go there.", avatar: "/unnamed-2.png" },
    { id: 4, name: "C.Mullis", rating: 5, comment: "Dieses Restaurant zeigt was Professionalität heisst. Von Anfang bis zum Schluss einfach nur Top", avatar: "/unnamed-1-1.png" },
  ]

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  return (
    <div className="bg-gray-800 text-white p-2 min-h-screen rounded-3xl relative pb-20 mb-20">
      <div className="absolute inset-0 z-0 opacity-20">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#ffffff"></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl font-medium text-center mb-8 text-gray-800">
          Das erwartet Sie in El Sabor Mexicano.
        </h1>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {/* Karte für authentische Aromen */}
          <div className="relative rounded-3xl overflow-hidden">
            <img 
              src="/img_45701.jpg" 
              alt="Bunte mexikanische Gerichte" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <div className="mb-4">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-medium leading-tight">
                Genießen Sie authentische Mexikanische Küche in jedem Bissen.
              </h2>
            </div>
          </div>

          {/* Bewertungsabschnitt */}
          <div className="rounded-3xl bg-black p-6 relative overflow-hidden flex flex-col justify-center h-full">
            <div className="relative z-10">
              {/* Google My Business Logo */}
              <div className="flex justify-center mb-20">
              <GoogleBussines />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={reviews[currentIndex].avatar} 
                    alt={`Avatar von ${reviews[currentIndex].name}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{reviews[currentIndex].name}</h3>

                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
            <svg
            key={i}
            className={`w-5 h-5 ${
              i < reviews[currentIndex].rating ? "text-red-500" : "text-gray-100"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-lg italic mb-20">"{reviews[currentIndex].comment}"</p>
              <div className="flex justify-between">
                <button 
                  onClick={prevReview} 
                  className="text-blue-500 hover:text-gray-300 transition duration-300"
                  aria-label="Vorherige Bewertung"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button 
                  onClick={nextReview} 
                  className="text-blue-500 hover:text-gray-300 transition duration-300"
                  aria-label="Nächste Bewertung"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-green-500/10 rounded-3xl " />


          </div>

          {/* Karte für das Hauptgericht */}
          <div className="rounded-3xl bg-zinc-900 p-6 flex flex-col justify-center h-full">
            <Calendar className="w-8 h-8 text-red-500 mb-4" />
            <h2 className="text-2xl font-medium">
              Probieren Sie unser<br />
              Tagesmenü Donnerstags<br />
              und Freitags von<br />
              11:30 bis 13:00 Uhr.
            </h2>
          </div>

          {/* Karte für frische Tacos */}
          <div className="rounded-3xl bg-zinc-900 p-6 flex flex-col justify-center h-full">
            <Ham className="w-8 h-8 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-medium">
              <span className="text-yellow-500">Quesadillas </span> 
              frisch zubereitet.
              <span className="text-gray-500"> (Mit frisch gebackenen Tortillas)</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}