'use client'

import { Link, useLocation } from "@remix-run/react"
import { useState, useEffect } from "react"
import { Menu, X, Home, InfoIcon, Phone, UtensilsCrossed, Beer, Utensils, MapPin, Clock, ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Component({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)
  const [impressumOpen, setImpressumOpen] = useState(false)
  const [datenschutzOpen, setDatenschutzOpen] = useState(false)
  const [cookieConsent, setCookieConsent] = useState(false) // Nuevo estado para el consentimiento de cookies
  const [showIcon, setShowIcon] = useState(false) // Nuevo estado para el icono
  const [showUpButton, setShowUpButton] = useState(false) // Nuevo estado para el botón de "Subir"
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (scrollPosition < windowHeight / 3) {
        setCurrentBg(0)
      } else if (scrollPosition < (windowHeight * 2) / 3) {
        setCurrentBg(1)
      } else {
        setCurrentBg(2) 
      }

      // Mostrar el botón de "Subir" después de 300 píxeles de desplazamiento
      if (scrollPosition > 300) {
        setShowUpButton(true)
      } else {
        setShowUpButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setCookieConsent(true);
    }
  }, []);

  // Función para manejar el clic y mostrar el icono después de 500 ms
  const handleClick = () => {
    setShowIcon(true);
    // Opcional: Ocultar el icono después de 3 segundos
    setTimeout(() => {
      setShowIcon(false);
    }, 3000);
  };

  // Función para desplazar la página hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const menuItems = [
    { to: "/", icon: Home, label: "Startseite" },
    { to: "/menu", icon: UtensilsCrossed, label: "Speisekarte" },
    { to: "/drinks", icon: Beer, label: "Getränke" },
    { to: "/contact", icon: Phone, label: "Kontakt" },
    { to: "https://cantinatexmex.ch/reservierung/index-4.html", icon: Utensils, label: "Reservierung", external: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-red-100 relative flex flex-col">
      {/* Background Images */}
      <div className="fixed inset-0 z-0">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentBg === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ backgroundImage: `url('${
              location.pathname === "/drinks"
                ? (index === 0
                    ? '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg'
                    : index === 1
                    ? '/fajitas.jpg'
                    : 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85')
                : location.pathname === "/menu"
                ? (index === 0
                    ? 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85'
                    : index === 1
                    ? '/fajitas.jpg'
                    : '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg')
                : (index === 0
                    ? '/fajitas.jpg'
                    : index === 1
                    ? 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODY5NTM1OTB8&ixlib=rb-4.0.3&q=85'
                    : '/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai.jpg')
            }')` }}
          />
        ))}
      </div>

      {/* SVG Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#000000"></circle>
          </pattern>
          <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md shadow-md bg-transparent md:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo on the left */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo3-copia1.png" 
                  alt="Mexikanisches Gericht" 
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            
            {/* Navigation menu centered on large screens */}
            <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.external ? (
                    <a 
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center text-gray-200 hover:text-red-600 transition duration-150 ease-in-out group"
                    >
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <item.icon className="h-5 w-5 mr-1 group-hover:text-red-600" />
                        </motion.div>
                        <span>{item.label}</span>
                      </motion.div>
                    </a>
                  ) : (
                    <Link 
                      to={item.to} 
                      className={`flex items-center text-gray-200 hover:text-red-600 transition duration-150 ease-in-out group ${
                        location.pathname === item.to ? 'text-red-600 font-bold' : ''
                      }`}
                    >
                      <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <item.icon className={`h-5 w-5 mr-1 ${
                            location.pathname === item.to ? 'text-red-600' : 'group-hover:text-red-600'
                          }`} />
                        </motion.div>
                        <span>{item.label}</span>
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            
            {/* Mobile menu button on the right */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="text-red-500 hover:text-gray-500 focus:outline-none rounded-full p-2 bg-gray-900 bg-opacity-70"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.external ? (
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-red-600 hover:bg-red-50 transition duration-150 ease-in-out group"
                      >
                        <motion.div
                          className="flex items-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <item.icon className="h-5 w-5 mr-2 group-hover:text-red-600" />
                          </motion.div>
                          <span>{item.label}</span>
                        </motion.div>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-red-600 hover:bg-red-50 transition duration-150 ease-in-out group ${
                          location.pathname === item.to ? 'text-red-600 bg-red-50 font-bold' : ''
                        }`}
                      >
                        <motion.div
                          className="flex items-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <item.icon className={`h-5 w-5 mr-2 ${
                              location.pathname === item.to ? 'text-red-600' : 'group-hover:text-red-600'
                            }`} />
                          </motion.div>
                          <span>{item.label}</span>
                        </motion.div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* Icono que aparece al hacer clic */}
      <AnimatePresence>
        {showIcon && <ClickIcon />}
      </AnimatePresence>

      {/* Botón de "Subir" */}
      <AnimatePresence>
        {showUpButton && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-32 right-4 z-20"
          >
            <motion.button
              onClick={scrollToTop}
              className="bg-gray5600 text-red-500 p-3 rounded-full shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 py-4 sm:px-6 lg:px-8 flex-grow">
        <div className="px-2 py-0 sm:px-0">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 to-gray-600 text-white mt-8 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Adresse", content: "Cantina Tex-Mex\nBahnhofstrasse 46\n9475 Sevelen" },
              { icon: Clock, title: "Öffnungszeiten", content: "Di-Mi: 18:00-22:00\nDo-Fr: 11:30-13:30, 18:00-22:00\nSamstag: 18:00-22:00" },
              { icon: Phone, title: "Kontakt", content: "Telefon: 0817501911\nE-Mail: info@cantiantextmex.ch" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-6">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.3 }}
                  >
                    <item.icon className="h-12 w-12 text-red-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center mb-4">{item.title}</h3>
                  <p className="text-gray-300 text-center whitespace-pre-line">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-12 border-t border-gray-700 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-center text-gray-400 text-sm mb-4">
              © 2024 Cantina Tex-Mex. Alle Rechte vorbehalten.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setImpressumOpen(true)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Impressum
              </button>
              <button
                onClick={() => setDatenschutzOpen(true)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Datenschutz
              </button>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Aviso de Consentimiento de Cookies */}
      <AnimatePresence>
        {cookieConsent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Cookie-Einwilligung</h2>
              <p className="text-gray-700 mb-4">
                Wir verwenden Cookies, um Ihre Erfahrung auf unserer Webseite zu verbessern. Durch das Akzeptieren stimmen Sie der Verwendung von Cookies zu.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    localStorage.setItem("cookieConsent", "true"); // Guardar consentimiento en localStorage
                    setCookieConsent(false);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Akzeptieren
                </button>
                <button
                  onClick={() => window.location.href = "https://google.ch"}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Ablehnen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impressum Modal */}
      {impressumOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Impressum</h2>
            <div className="mt-2">
              <p>Cantina Bad Rans GmbH</p>
              <p>Badstrasse 44</p>
              <p>9475 / Sevelen</p>
              <p>T: 0817501911</p>
              <p>Handelsregister-Nr. CH-320.4.067.097-1</p>
              <p>UID lautet: CHE-115.639.418</p>
              {/* Enlace Clicable a lweb.ch */}
              <p className="mt-4">
                Webseite Design{' '}
                <a
                  href="https://lweb.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  lweb.ch
                </a>
              </p>
            </div>
            <button
              onClick={() => setImpressumOpen(false)}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Datenschutz Modal */}
      {datenschutzOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Datenschutzerklärung</h2>
            <div className="mt-2 max-h-[80vh] overflow-y-auto px-4">
              {/* Secciones de la Datenschutzerklärung */}
              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">DATENSCHUTZ</h3>
                <p className="text-gray-700 mb-4">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p className="text-gray-700 mb-4">
                  Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                </p>
                <p className="text-gray-700 mb-4">
                  Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
                <p className="text-gray-700 mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p className="text-gray-700">
                  Cantina Bad Rans GmbH<br />
                  Badstrasse 44<br />
                  9475 / Sevelen<br />
                  Schweiz<br />
                  Telefon: 081 750 19 11
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">COOKIES</h3>
                <p className="text-gray-700 mb-4">
                  Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
                </p>
                <p className="text-gray-700 mb-4">
                  Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
                </p>
                <p className="text-gray-700 mb-4">
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">SSL-VERSCHLÜSSELUNG</h3>
                <p className="text-gray-700 mb-4">
                  Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von “http://” auf “https://” wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p className="text-gray-700">
                  Wenn die SSL-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">GOOGLE ANALYTICS</h3>
                <p className="text-gray-700 mb-4">
                  Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics verwendet so genannte „Cookies“. Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                </p>
                <p className="text-gray-700 mb-4">
                  Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools erfolgen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">IP ANONYMISIERUNG</h3>
                <p className="text-gray-700 mb-4">
                  Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">BROWSER PLUGIN</h3>
                <p className="text-gray-700 mb-4">
                  Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch den Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" className="text-blue-600 underline">https://tools.google.com/dlpage/gaoptout?hl=de</a>.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">WIDERSCHRUCH GEGEN DATENERFASSUNG</h3>
                <p className="text-gray-700 mb-4">
                  Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie auf folgenden Link klicken. Es wird ein Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei zukünftigen Besuchen dieser Website verhindert: <a href="#" className="text-blue-600 underline">Google Analytics deaktivieren.</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: <a href="https://support.google.com/analytics/answer/6004245?hl=de" className="text-blue-600 underline">https://support.google.com/analytics/answer/6004245?hl=de</a>.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">GOOGLE WEB FONTS</h3>
                <p className="text-gray-700 mb-4">
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
                </p>
                <p className="text-gray-700 mb-4">
                  Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
                </p>
                <p className="text-gray-700 mb-4">
                  Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt. Weitere Informationen zu Google Web Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" className="text-blue-600 underline">https://developers.google.com/fonts/faq</a> und in der Datenschutzerklärung von Google: <a href="https://www.google.com/policies/privacy/" className="text-blue-600 underline">https://www.google.com/policies/privacy/</a>.
                </p>
              </section>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setDatenschutzOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente del Icono que Aparece al Clicar
const ClickIcon = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed bottom-4 right-4 bg-black rounded-full p-4 flex items-center justify-center shadow-lg z-30"
  >

  </motion.div>
)
