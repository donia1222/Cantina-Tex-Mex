"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Clock, Calendar, Mail, User } from "lucide-react"


export default function Jobs() {
  const [loading, setLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate loading
    setTimeout(() => {
      // Create email body with form data
      const emailBody = `
        Name: ${formData.name}
        Email: ${formData.email}
        Telefon: ${formData.phone}
        Nachricht: ${formData.message}
      `

      // Create mailto link with form data
      const mailtoLink = `mailto:info@cantina-texmex.ch?subject=Bewerbung als Servicekraft&body=${encodeURIComponent(emailBody)}`

      // Open email client
      window.location.href = mailtoLink

      setLoading(false)
      setFormSubmitted(true)

      // Reset form after submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
        setFileName("")
        setFormSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-cover bg-center flex flex-col items-center justify-start font-poppins bg-gradient-to-b from-gray-900 to-gray-800 text-red-500 p-0 rounded-lg min-h-screen">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-6xl px-4 mb-8 mt-8"
      >
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl overflow-hidden shadow-2xl border border-amber-300/20">
          <div className="relative p-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-amber-500 to-orange-500"></div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-amber-800 mb-4">Wir suchen Verstärkung!</h1>
              <p className="text-xl text-amber-700">Werden Sie Teil unseres Teams in der Cantina Tex-Mex</p>
            </div>

            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">Servicekraft</h2>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <p className="text-gray-700 mb-4">
                  Wir suchen eine freundliche und engagierte Servicekraft, die unser Team in der Cantina Tex-Mex
                  verstärkt. Wenn Sie Freude am Umgang mit Menschen haben und in einem dynamischen Team arbeiten
                  möchten, sind Sie bei uns genau richtig!
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 p-5 rounded-xl shadow-sm border border-amber-100/50">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-amber-600 mr-2" />
                    <h3 className="font-semibold text-amber-800">Arbeitszeiten</h3>
                  </div>
                  <p className="text-gray-700">Dienstag bis Samstag</p>
                  <p className="text-gray-700">Sonntag und Montag frei</p>
                </div>

                <div className="bg-amber-50 p-5 rounded-xl shadow-sm border border-amber-100/50">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-amber-600 mr-2" />
                    <h3 className="font-semibold text-amber-800">Vertrag</h3>
                  </div>
                  <p className="text-gray-700">Stundenbasierter Vertrag</p>
                  <p className="text-gray-700">Flexible Einsatzzeiten möglich</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-amber-50 p-5 rounded-xl shadow-sm border border-amber-100/50 mb-6"
              >
                <h3 className="font-semibold text-amber-800 mb-2">Was wir bieten:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Ein freundliches und dynamisches Arbeitsumfeld</li>
                  <li>Faire Bezahlung</li>
                  <li>Möglichkeit zur beruflichen Weiterentwicklung</li>
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-amber-50 p-5 rounded-xl shadow-sm border border-amber-100/50"
              >
                <h3 className="font-semibold text-amber-800 mb-2">Was wir erwarten:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Erfahrung im Servicebereich wünschenswert</li>
                  <li>Freundliches und kundenorientiertes Auftreten</li>
                  <li>Teamfähigkeit und Zuverlässigkeit</li>
                  <li>Flexibilität bei den Arbeitszeiten</li>
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">Bewerben Sie sich jetzt!</h2>

              <div className="text-center max-w-2xl mx-auto">
                <p className="text-lg text-gray-700 mb-6">
                  Bitte senden Sie uns Ihren Lebenslauf direkt per E-Mail. Wir freuen uns auf Ihre Bewerbung!
                </p>

                <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="mailto:info@cantinatexmex.ch?subject=Bewerbung als Servicekraft"
                    className="inline-flex items-center px-8 py-4 text-xl font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300"
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    info@cantinatexmex.ch
                  </a>
                </motion.div>

                <p className="mt-6 text-gray-600 italic">Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
