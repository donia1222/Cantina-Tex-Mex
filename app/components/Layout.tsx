import { Link } from "@remix-run/react";
import { useState } from "react";
import { Menu, X, Home, InfoIcon, Phone, UtensilsCrossed } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 relative">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000000"></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <UtensilsCrossed className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-green-700">El Sabor Mexicano</h1>
            </div>
            {/* Desktop menu */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="flex items-center text-gray-700 hover:text-green-600 transition duration-150 ease-in-out">
                <Home className="h-5 w-5 mr-1" />
                <span>Inicio</span>
              </Link>
              <Link to="/menu" className="flex items-center text-gray-700 hover:text-green-600 transition duration-150 ease-in-out">
                <UtensilsCrossed className="h-5 w-5 mr-1" />
                <span>Menú</span>
              </Link>
              <Link to="/about" className="flex items-center text-gray-700 hover:text-green-600 transition duration-150 ease-in-out">
                <InfoIcon className="h-5 w-5 mr-1" />
                <span>Nosotros</span>
              </Link>
              <Link to="/contact" className="flex items-center text-gray-700 hover:text-green-600 transition duration-150 ease-in-out">
                <Phone className="h-5 w-5 mr-1" />
                <span>Contacto</span>
              </Link>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-green-600 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition duration-150 ease-in-out">
                <Home className="h-5 w-5 mr-2" />
                <span>Inicio</span>
              </Link>
              <Link to="/menu" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition duration-150 ease-in-out">
                <UtensilsCrossed className="h-5 w-5 mr-2" />
                <span>Menú</span>
              </Link>
              <Link to="/about" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition duration-150 ease-in-out">
                <InfoIcon className="h-5 w-5 mr-2" />
                <span>Nosotros</span>
              </Link>
              <Link to="/contact" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition duration-150 ease-in-out">
                <Phone className="h-5 w-5 mr-2" />
                <span>Contacto</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6 border border-green-200">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">El Sabor Mexicano</h2>
              <p className="text-sm">Auténtica cocina mexicana</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300 transition duration-150 ease-in-out">Facebook</a>
              <a href="#" className="hover:text-green-300 transition duration-150 ease-in-out">Instagram</a>
              <a href="#" className="hover:text-green-300 transition duration-150 ease-in-out">Twitter</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2024 El Sabor Mexicano. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}