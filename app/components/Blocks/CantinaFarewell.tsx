"use client"
import { motion } from "framer-motion"

export default function CantinaFarewell() {
  return (
    <div className=" flex items-center justify-center  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className=" rounded-xl border-none shadow-xl overflow-hidden">
          <div className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left side - Original content */}
              <div className="p-8 space-y-6 bg-gradient-to-br from-amber-50 to-orange-50 ">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Liebe Freunde, liebe Gäste</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nach fast 15 Jahren in Sevelen zieht die Cantina unter neuer Leitung nach Buchs.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Wir freuen uns, dass die Cantina in Buchs ein tolles, neues Zuhause gefunden hat. Roberto, das Herz
                  der Cantina, ist weiterhin mit gewohnter Hingabe für Euch da; Andrea als Supporter in der Küche
                  jeweils am Wochenende.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nun sagen wir also <span className="font-bold">Gracias Sevelen</span> und{" "}
                  <span className="font-bold">Adios!</span> <br />
                  <span className="font-bold">Hola Buchs ab 28. März 2025!</span>
                </p>
              </div>

              {/* Right side - New content */}
              <div className="bg-slate-900 text-white p-8 flex flex-col justify-center items-center space-y-6">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="mb-3">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNNdXZWCSHo5uHmofv1Wp47b-c7UvcGCq0fg&s"
                      alt="Ushuaia"
                      className="w-68 h-auto mx-auto"
                    />
                  </div>
                  <p className="text-amber-400 text-lg font-light italic">Kitchen by Cantina Tex-Mex</p>

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <p className="text-gray-100 text-3xl mb-4">Neue Adresse</p>
                    <p className="text-xl  text-gray-400 font-medium mt-1">Bahnhofstrasse 40</p>
                    <p className="text-xl  text-gray-400 font-medium">9470 Buchs</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                  >
                    <p className="inline-block px-4 py-2 rounded-full bg-amber-500 text-black font-bold">
                      Ab 28. März 2025
                    </p>

                    <a
              href="/reservierung"
              className="relative px-6 py-3 font-bold text-gray-100 group max-w-[80%] mx-auto block mt-10"
            >
              <span className="absolute inset-0 transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="absolute inset-0 border-2 border-gray-300"></span>
              <span className="relative">Jetzt Reservieren</span>
            </a>

                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

