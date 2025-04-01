"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_red.css"
import ConfirmationModal from "./ConfirmationModal"
import PreviousReservationsModal from "./PreviousReservationsModal"
import { Calendar, Clock, Users, User, Phone, Mail } from "lucide-react"

interface BlockedDates {
  [date: string]: string[]
}

interface Reservation {
  fecha: string
  hora: string
  personas: number
  nombre: string
  telefono: string
  email: string
  timestamp: number // Para ordenar las reservas por fecha
}

const ReservationForm: React.FC = () => {
  const [blockedDates, setBlockedDates] = useState<BlockedDates>({})
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [blockedTimesForSelectedDate, setBlockedTimesForSelectedDate] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [personas, setPersonas] = useState<number>(0)
  const [showModal, setShowModal] = useState(false)
  const [showPreviousReservationsModal, setShowPreviousReservationsModal] = useState(false)
  const [reservationDetails, setReservationDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")

  // Estado para almacenar todas las reservas
  const [reservations, setReservations] = useState<Reservation[]>([])

  // Función para formatear la fecha a YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Función para parsear una cadena de fecha "YYYY-MM-DD" como fecha local
  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number)
    return new Date(year, month - 1, day)
  }

  // Función para obtener todas las horas posibles para un día
  const getAllPossibleTimes = (date: Date): string[] => {
    const day = date.getDay()
    // Para martes (2) y miércoles (3) se agregan horarios de almuerzo y cena
    if (day === 2 || day === 3) {
      return ["11:30", "12:00", "12:30", "13:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]
    } else if (day === 4 || day === 5) {
      // Jueves (4) y Viernes (5): almuerzo y cena
      return ["11:30", "12:00", "12:30", "13:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]
    } else if (day === 6) {
      // Sábado: solo cena
      return ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]
    } else {
      // Domingos (0) y Lunes (1) deshabilitados
      return []
    }
  }

  // Función para obtener las fechas bloqueadas
  const fetchBlockedDates = async () => {
    try {
      console.log("Fetching blocked dates...")
      const res = await fetch("https://reservierung.cantinatexmex.ch/get_blocked_dates.php")
      console.log("Response status:", res.status)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const text = await res.text()
      console.log("Raw response text:", text)
      const data = JSON.parse(text)
      console.log("Parsed blocked dates data:", data)
      setBlockedDates(data)
      setLoading(false)
    } catch (error: any) {
      console.error("Error fetching blocked dates:", error.message || error)
      setError(`Error al cargar las fechas bloqueadas: ${error.message || "Desconocido"}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlockedDates()

    // Cargar reservas almacenadas desde localStorage
    const storedReservations = localStorage.getItem("reservaciones")
    if (storedReservations) {
      try {
        const parsedReservations: Reservation[] = JSON.parse(storedReservations)
        setReservations(parsedReservations)
        if (parsedReservations.length > 0) {
          // Obtener el nombre de la última reserva para el saludo
          const lastReservation = parsedReservations[parsedReservations.length - 1]
          setNombre(lastReservation.nombre)
          setTelefono(lastReservation.telefono)
          setEmail(lastReservation.email)
        }
      } catch (e) {
        console.error("Error parsing reservations from localStorage:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedDate) {
      console.log("Selected date changed:", selectedDate)
      const dateString = formatDate(selectedDate)
      fetchAvailableTimes(dateString)
    } else {
      console.log("No date selected.")
      setAvailableTimes([])
      setBlockedTimesForSelectedDate([])
      setSelectedTime("") // Reiniciar selectedTime
    }
  }, [selectedDate, blockedDates])

  const fetchAvailableTimes = async (date: string) => {
    try {
      console.log("Fetching available times for:", date)
      const dateObj = parseLocalDate(date)
      const day = dateObj.getDay()
      const today = new Date()
      const isToday =
        dateObj.getFullYear() === today.getFullYear() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getDate() === today.getDate()

      let allTimes: string[] = []

      if (day === 2 || day === 3) {
        // Martes y miércoles: almuerzo y cena
        allTimes = ["11:30", "12:00", "12:30", "12:45", "18:00", "18:30", "19:00", "19:30", "20:00"]
      } else if (day === 4 || day === 5) {
        // Jueves y Viernes: almuerzo y cena
        allTimes = ["11:30", "12:00", "12:30", "12:45", "18:00", "18:30", "19:00", "19:30", "20:00"]
      } else if (day === 6) {
        // Sábado: solo cena
        allTimes = ["18:00", "18:30", "19:00", "19:30", "20:00"]
      }

      // Obtener las horas bloqueadas para la fecha seleccionada
      const blockedTimes = blockedDates[date] || []
      setBlockedTimesForSelectedDate(blockedTimes)

      // Filtrar las horas disponibles excluyendo las bloqueadas
      let available = allTimes.filter((time) => !blockedTimes.includes(time))

      // Si la fecha seleccionada es hoy, filtrar las horas que ya han pasado
      if (isToday) {
        const currentTime = new Date()
        available = available.filter((time) => {
          const [hours, minutes] = time.split(":").map(Number)
          const reservationTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes)
          return reservationTime > currentTime
        })
      }

      console.log("Available times after filtering:", available)
      setAvailableTimes(available)
    } catch (error) {
      console.error("Error fetching available times:", error)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null) // Resetear errores anteriores

    console.log("Form submitted.")
    const form = e.currentTarget
    const formData = new FormData(form)

    // Validar si la cantidad de personas es mayor o igual a 20
    if (personas >= 20) {
      window.location.href = `mailto:info@cantinatex-mex.ch?subject=Reservierung für mehr als 20 Personen&body=Ich möchte gerne eine Reservierung für mehr als 20 Personen machen.`
      return
    }

    console.log("Sending reservation data to backend...")

    try {
      const response = await fetch("https://reservierung.cantinatexmex.ch/enviar_confirmacion.php", {
        method: "POST",
        body: formData,
        // credentials: 'include', // Descomenta si es necesario
      })

      console.log("Response status:", response.status)
      const text = await response.text()
      console.log("Raw response text:", text)

      let result
      try {
        result = JSON.parse(text)
      } catch (parseError) {
        throw new Error("Respuesta del servidor no es JSON válido.")
      }

      console.log("Parsed backend response:", result)

      if (response.ok && result.success) {
        const newReservation: Reservation = {
          fecha: formData.get("fecha") as string,
          hora: formData.get("hora") as string,
          personas: personas,
          nombre: formData.get("nombre") as string,
          telefono: formData.get("telefono") as string,
          email: formData.get("email") as string,
          timestamp: Date.now(),
        }

        const updatedReservations = [...reservations, newReservation]
        setReservations(updatedReservations)
        localStorage.setItem("reservaciones", JSON.stringify(updatedReservations))
        setReservationDetails(newReservation)
        setShowModal(true)
        setNombre(newReservation.nombre)
        setTelefono(newReservation.telefono)
        setEmail(newReservation.email)
      } else {
        throw new Error(result.message || "Error al procesar la reserva.")
      }
    } catch (err) {
      console.error("Error al enviar la reserva:", err)
      setError("Hubo un problema al enviar la reserva. Por favor, intenta nuevamente más tarde.")
    }
  }

  // Función para renderizar las opciones del select agrupadas en "Mittag" y "Abend"
  const renderTimeOptions = () => {
    // Separamos las horas disponibles en horarios de almuerzo y cena
    const lunchAvailable = availableTimes.filter((time) => Number.parseInt(time.split(":")[0], 10) < 14)
    const dinnerAvailable = availableTimes.filter((time) => Number.parseInt(time.split(":")[0], 10) >= 14)
    // Separamos las horas bloqueadas en los mismos grupos
    const lunchBlocked = blockedTimesForSelectedDate.filter((time) => Number.parseInt(time.split(":")[0], 10) < 14)
    const dinnerBlocked = blockedTimesForSelectedDate.filter((time) => Number.parseInt(time.split(":")[0], 10) >= 14)

    return (
      <>
        {(lunchAvailable.length > 0 || lunchBlocked.length > 0) && (
          <optgroup label="Mittag">
            {lunchAvailable.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
            {lunchBlocked.map((time) => (
              <option key={time} value={time} disabled className="text-gray-500">
                {`${time} (Nicht verfügbar)`}
              </option>
            ))}
          </optgroup>
        )}
        {(dinnerAvailable.length > 0 || dinnerBlocked.length > 0) && (
          <optgroup label="Abend">
            {dinnerAvailable.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
            {dinnerBlocked.map((time) => (
              <option key={time} value={time} disabled className="text-gray-500">
                {`${time} (Nicht verfügbar)`}
              </option>
            ))}
          </optgroup>
        )}
      </>
    )
  }

  const renderButtonText = () => {
    if (selectedDate && selectedTime && personas) {
      const formattedDate = selectedDate.toLocaleDateString("de-DE")
      return `Reservierung: ${formattedDate}, ${selectedTime}, ${personas} Personen`
    }
    return "Reservierung bestätigen"
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Fecha */}
            <div>
              <div className="flex items-center mb-1">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <label htmlFor="fecha" className="block text-lg font-medium text-gray-200">
                  Datum
                </label>
              </div>
              <Flatpickr
                id="fecha"
                name="fecha"
                value={selectedDate || undefined}
                onChange={(dates: Date[]) => {
                  console.log("Selected date:", dates[0])
                  setSelectedDate(dates[0] || null)
                }}
                options={{
                  dateFormat: "d.m.Y",
                  minDate: "today",
                  disable: [
                    (date: Date) => [0, 1].includes(date.getDay()),
                    ...Object.keys(blockedDates)
                      .filter((dateStr) => {
                        const dateObj = parseLocalDate(dateStr)
                        const allTimes = getAllPossibleTimes(dateObj)
                        const blocked = blockedDates[dateStr] || []
                        return allTimes.length > 0 && blocked.length >= allTimes.length
                      })
                      .map((dateStr) => parseLocalDate(dateStr)),
                  ],
                  locale: {
                    firstDayOfWeek: 1,
                    weekdays: {
                      shorthand: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                      longhand: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
                    },
                    months: {
                      shorthand: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                      longhand: [
                        "Januar",
                        "Februar",
                        "März",
                        "April",
                        "Mai",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "Dezember",
                      ],
                    },
                  },
                }}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="TT.MM.JJJJ"
              />
            </div>

            {/* Campo de Hora */}
            <div>
              <div className="flex items-center mb-1">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <label htmlFor="hora" className="block text-lg font-medium text-gray-200">
                  Uhrzeit
                </label>
              </div>
              <select
                id="hora"
                name="hora"
                required
                value={selectedTime}
                onChange={handleTimeChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-no-repeat bg-right-4 bg-center"
                disabled={availableTimes.length === 0 && blockedTimesForSelectedDate.length === 0}
              >
                <option value="">Wählen Sie die Uhrzeit</option>
                {renderTimeOptions()}
              </select>
            </div>

            {/* Campo de Número de Personas */}
            <div>
              <div className="flex items-center mb-1">
                <Users className="w-5 h-5 text-gray-400 mr-2" />
                <label htmlFor="personas" className="block text-lg font-medium text-gray-200">
                  Anzahl der Personen
                </label>
              </div>
              <select
                id="personas"
                name="personas"
                required
                value={personas}
                onChange={(e) => setPersonas(Number.parseInt(e.target.value, 10))}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-no-repeat bg-right-4 bg-center"
              >
                <option value="">Wählen Sie die Anzahl der Personen</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {personas >= 20 && (
                <div className="mt-2 p-3 bg-amber-100 text-amber-800 rounded-md">
                  <p>
                    Ab 20 Personen bitte per E-Mail reservieren:{" "}
                    <a
                      href={`mailto:info@cantinatex-mex.ch?subject=Reservierung für mehr als 20 Personen&body=Ich möchte gerne eine Reservierung für mehr als 20 Personen machen.`}
                      className="font-medium underline"
                    >
                      info@cantinatex-mex.ch
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Campos de Nombre, Teléfono y E-Mail */}
            <div>
              <div className="flex items-center mb-1">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <label htmlFor="nombre" className="block text-lg font-medium text-gray-200">
                  Name
                </label>
              </div>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Ihr Name"
              />
            </div>

            <div>
              <div className="flex items-center mb-1">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <label htmlFor="telefono" className="block text-lg font-medium text-gray-200">
                  Telefon
                </label>
              </div>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Ihre Telefonnummer"
              />
            </div>

            <div>
              <div className="flex items-center mb-1">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <label htmlFor="email" className="block text-lg font-medium text-gray-200">
                  E-Mail
                </label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Ihre E-Mail-Adresse"
              />
            </div>

            {selectedDate && selectedTime && personas && (
              <div className="mt-4 p-4 bg-gray-700 text-white rounded">
                <p>
                  <strong>Datum</strong> {selectedDate.toLocaleDateString("de-DE")}
                </p>
                <p>
                  <strong>Uhr:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Personen:</strong> {personas}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200"
              disabled={!(selectedDate && selectedTime && personas)}
            >
              Reservierung bestätigen
            </button>
          </form>
        </>
      )}

      {reservations.length > 0 && (
        <button
          onClick={() => setShowPreviousReservationsModal(true)}
          className="mt-10 bg-gray-600 text-gray-300 py-1 px-3 rounded hover:bg-gray-900 transition duration-200 text-xs"
        >
          Ver meine vorherigen Reservierungen
        </button>
      )}

      {showPreviousReservationsModal && (
        <PreviousReservationsModal
          reservations={reservations}
          nombre={nombre}
          onClose={() => setShowPreviousReservationsModal(false)}
        />
      )}

      {showModal && reservationDetails && (
        <ConfirmationModal details={reservationDetails} onClose={() => setShowModal(false)} />
      )}

      {error && <div className="mt-4 p-4 bg-red-600 text-white rounded">{error}</div>}
    </div>
  )
}

export default ReservationForm

