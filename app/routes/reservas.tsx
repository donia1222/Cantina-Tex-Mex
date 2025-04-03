"use client"

import type React from "react"
import { useState, useMemo, useRef, useEffect } from "react"
import {
  Search,
  Calendar,
  Filter,
  ArrowDownUp,
  ChevronDown,
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  Table,
  Plus,
  Edit2,
  Trash2,
  Lock,
} from "lucide-react"

type Reserva = {
  id: string
  fecha: string
  hora: string
  personas: string
  nombre: string
  telefono: string
  email: string
  mesa?: string
}

// Función para extraer reservas del HTML
function extractReservasFromHTML(html: string): Reserva[] {
  console.log("Extrayendo reservas del HTML...")
  const reservas: Reserva[] = []

  try {
    const rowRegex =
      /<tr>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/g

    let match
    while ((match = rowRegex.exec(html)) !== null) {
      if (match[1] && !isNaN(Number(match[1]))) {
        reservas.push({
          id: match[1],
          fecha: match[2],
          hora: match[3],
          personas: match[4],
          nombre: match[5],
          telefono: match[6],
          email: match[7],
        })
      }
    }

    console.log(`Extraídas ${reservas.length} reservas del HTML`)
  } catch (error) {
    console.error("Error al extraer reservas del HTML:", error)
  }

  return reservas
}

// Helper function to convert date string to a Date object
function parseDate(dateStr: string, timeStr: string): Date {
  if (dateStr.includes("-")) {
    const [year, month, day] = dateStr.split("-").map(Number)
    let hours = 0
    let minutes = 0
    if (timeStr) {
      const timeParts = timeStr.split(":")
      hours = Number.parseInt(timeParts[0] || "0", 10)
      minutes = Number.parseInt(timeParts[1] || "0", 10)
    }
    return new Date(year, month - 1, day, hours, minutes)
  } else if (dateStr.includes(".")) {
    const [day, month, year] = dateStr.split(".").map(Number)
    let hours = 0
    let minutes = 0
    if (timeStr) {
      const timeParts = timeStr.split(":")
      hours = Number.parseInt(timeParts[0] || "0", 10)
      minutes = Number.parseInt(timeParts[1] || "0", 10)
    }
    return new Date(year, month - 1, day, hours, minutes)
  }
  console.error("Unbekanntes Datumsformat:", dateStr)
  return new Date()
}

// Format date for display (DD/MM/YYYY)
function formatDate(dateStr: string): string {
  if (dateStr.includes("-")) {
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  } else if (dateStr.includes(".")) {
    const [day, month, year] = dateStr.split(".")
    return `${day}/${month}/${year}`
  }
  return dateStr
}

// Helper function to check if a date is today
function isToday(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = parseDate(dateStr, "")
  date.setHours(0, 0, 0, 0)
  return date.getTime() === today.getTime()
}

// Helper function to check if a date is in the current week
function isThisWeek(dateStr: string): boolean {
  const today = new Date()
  const date = parseDate(dateStr, "")
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)
  return date >= startOfWeek && date <= endOfWeek
}

// Helper function to check if a date matches the selected date
function isSelectedDate(dateStr: string, selectedDate: Date | undefined): boolean {
  if (!selectedDate) return false
  const date = parseDate(dateStr, "")
  date.setHours(0, 0, 0, 0)
  const compareDate = new Date(selectedDate)
  compareDate.setHours(0, 0, 0, 0)
  return date.getTime() === compareDate.getTime()
}

// Helper function to format date to string in DD.MM.YYYY format
function formatDateToString(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Get days in month
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

// Get day of week (0 = Sunday, 1 = Monday, etc.)
function getDayOfWeek(year: number, month: number, day: number): number {
  return new Date(year, month, day).getDay()
}

// Get month name
function getMonthName(month: number): string {
  const monthNames = [
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
  ]
  return monthNames[month]
}

export default function Reservas() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)

  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "thisWeek" | "specific">("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [visibleCount, setVisibleCount] = useState(1000)
  const [showCalendar, setShowCalendar] = useState(false)
  const [mesas, setMesas] = useState<Record<string, string>>({})
  const [showMesaModal, setShowMesaModal] = useState(false)
  const [currentReservaId, setCurrentReservaId] = useState<string | null>(null)
  const [mesaInput, setMesaInput] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const calendarRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [reservasTachadas, setReservasTachadas] = useState<string[]>([])
  const [showNuevaReservaModal, setShowNuevaReservaModal] = useState(false)
  const [nuevaReservaDate, setNuevaReservaDate] = useState<Date>(new Date())
  const [nuevaReservaHora, setNuevaReservaHora] = useState<string>("18:00")
  const [nuevaReservaPersonas, setNuevaReservaPersonas] = useState<string>("2")
  const [nuevaReservaNombre, setNuevaReservaNombre] = useState<string>("")
  const [nuevaReservaTelefono, setNuevaReservaTelefono] = useState<string>("")
  const [nuevaReservaEmail, setNuevaReservaEmail] = useState<string>("info@lweb.ch")
  const [nuevaReservaError, setNuevaReservaError] = useState<string | null>(null)
  const [nuevaReservaSubmitting, setNuevaReservaSubmitting] = useState<boolean>(false)
  const [showNuevaReservaCalendar, setShowNuevaReservaCalendar] = useState<boolean>(false)
  const nuevaReservaCalendarRef = useRef<HTMLDivElement>(null)

  // Edit reservation modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [editReserva, setEditReserva] = useState<Reserva | null>(null)
  const [editReservaDate, setEditReservaDate] = useState<Date>(new Date())
  const [editReservaHora, setEditReservaHora] = useState<string>("")
  const [editReservaPersonas, setEditReservaPersonas] = useState<string>("")
  const [editReservaNombre, setEditReservaNombre] = useState<string>("")
  const [editReservaTelefono, setEditReservaTelefono] = useState<string>("")
  const [editReservaEmail, setEditReservaEmail] = useState<string>("")
  const [editReservaError, setEditReservaError] = useState<string | null>(null)
  const [editReservaSubmitting, setEditReservaSubmitting] = useState<boolean>(false)
  const [showEditCalendar, setShowEditCalendar] = useState<boolean>(false)
  const editCalendarRef = useRef<HTMLDivElement>(null)

  // Check if user is already authenticated
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
      fetchReservas()
    } else {
      setLoading(false)
    }
  }, [])

  // Modificar la función handleLogin para usar la nueva función de autenticación
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    try {
      // Verificar directamente las credenciales sin llamar a una API
      const correctUsername = import.meta.env?.AUTH_USERNAME || "cantina"
      const correctPassword = import.meta.env?.AUTH_PASSWORD || "cantina 1234"

      if (username === correctUsername && password === correctPassword) {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true")
        fetchReservas()
      } else {
        setAuthError("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      console.error("Error de autenticación:", error)
      setAuthError("Error al intentar iniciar sesión")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
  }

  const fetchReservas = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Cargando reservas...")
      const response = await fetch("https://reservierung.cantinatexmex.ch/obtener_reservas.php")
      if (!response.ok) {
        throw new Error(`Error beim Abrufen der Reservierungen: ${response.statusText}`)
      }
      const html = await response.text()
      console.log("HTML recibido, longitud:", html.length)
      const extractedReservas = extractReservasFromHTML(html)
      console.log("Reservas extraídas:", extractedReservas.length)
      setReservas(extractedReservas)
      try {
        const savedMesas = localStorage.getItem("mesasAsignadas")
        if (savedMesas) {
          setMesas(JSON.parse(savedMesas))
        }
      } catch (e) {
        console.error("Error al cargar asignaciones de mesas:", e)
      }
      try {
        const savedTachadas = localStorage.getItem("reservasTachadas")
        if (savedTachadas) {
          setReservasTachadas(JSON.parse(savedTachadas))
        }
      } catch (e) {
        console.error("Error al cargar reservas tachadas:", e)
      }
    } catch (err) {
      console.error("Error al cargar reservas:", err)
      setError("Fehler beim Laden der Reservierungen")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
      if (nuevaReservaCalendarRef.current && !nuevaReservaCalendarRef.current.contains(event.target as Node)) {
        setShowNuevaReservaCalendar(false)
      }
      if (editCalendarRef.current && !editCalendarRef.current.contains(event.target as Node)) {
        setShowEditCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowMesaModal(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)
    setDateFilter("specific")
    setShowCalendar(false)
  }

  const handleNuevaReservaDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    setNuevaReservaDate(newDate)
    setShowNuevaReservaCalendar(false)
  }

  const handleEditDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    setEditReservaDate(newDate)
    setShowEditCalendar(false)
  }

  const generateCalendarDays = (onSelectDay: (day: number) => void, selectedDay?: Date) => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getDayOfWeek(currentYear, currentMonth, 1)
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday = new Date().toDateString() === date.toDateString()
      const isSelected = selectedDay && selectedDay.toDateString() === date.toDateString()
      days.push(
        <div
          key={`day-${day}`}
          onClick={() => onSelectDay(day)}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${isToday ? "bg-amber-200 text-amber-800" : ""}
            ${isSelected ? "bg-amber-500 text-white" : ""}
            ${!isToday && !isSelected ? "hover:bg-amber-100" : ""}
          `}
        >
          {day}
        </div>,
      )
    }
    return days
  }

  const clearSelectedDate = () => {
    setSelectedDate(undefined)
    setDateFilter("all")
  }

  const filteredReservas = useMemo(() => {
    console.log("Filtrando reservas, total:", reservas.length)
    const sortedReservas = [...reservas].sort((a, b) => {
      const dateA = parseDate(a.fecha, a.hora)
      const dateB = parseDate(b.fecha, b.hora)
      return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })
    return sortedReservas.filter((reserva) => {
      const searchMatch =
        reserva.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.hora.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.personas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.email.toLowerCase().includes(searchTerm.toLowerCase())
      let dateMatch = true
      if (dateFilter === "today") {
        dateMatch = isToday(reserva.fecha)
      } else if (dateFilter === "thisWeek") {
        dateMatch = isThisWeek(reserva.fecha)
      } else if (dateFilter === "specific" && selectedDate) {
        dateMatch = isSelectedDate(reserva.fecha, selectedDate)
      }
      return searchMatch && dateMatch
    })
  }, [reservas, searchTerm, dateFilter, sortOrder, selectedDate])

  const visibleReservas = useMemo(() => {
    return filteredReservas.slice(0, visibleCount)
  }, [filteredReservas, visibleCount])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10)
  }

  const toggleReservaTachada = (reservaId: string) => {
    setReservasTachadas((prev) => {
      const newTachadas = prev.includes(reservaId) ? prev.filter((id) => id !== reservaId) : [...prev, reservaId]
      localStorage.setItem("reservasTachadas", JSON.stringify(newTachadas))
      return newTachadas
    })
  }

  const printReservations = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    printWindow.document.write(`
  <html>
    <head>
      <title>Reservierungsliste</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #fef3c7; padding: 8px; text-align: left; font-weight: bold; }
        td { padding: 8px; border-bottom: 1px solid #f3f4f6; }
        tr:nth-child(even) { background-color: #fef3c7; }
        h1 { color: #92400e; }
        .print-info { margin-bottom: 20px; color: #92400e; font-size: 14px; }
        .tachada { text-decoration: line-through; color: #ef4444; }
      </style>
    </head>
    <body>
      <h1>Reservierungsliste</h1>
      <div class="print-info">
        <p>Datum: ${new Date().toLocaleDateString()}</p>
        <p>Anzahl Reservierungen: ${visibleReservas.length}</p>
        ${
          dateFilter !== "all"
            ? `<p>Filter: ${
                dateFilter === "today"
                  ? "Heute"
                  : dateFilter === "thisWeek"
                    ? "Diese Woche"
                    : selectedDate
                      ? `Datum: ${formatDateToString(selectedDate)}`
                      : ""
              }</p>`
            : ""
        }
        ${searchTerm ? `<p>Suchbegriff: ${searchTerm}</p>` : ""}
      </div>
      <table> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Zeit</th>
            <th>Personen</th>
            <th>Name</th>
            <th>Telefon</th>
            <th>E-Mail</th>
            <th>Mesa</th>
          </tr>
        </thead>
        <tbody>
          ${visibleReservas
            .map(
              (reserva) => `
            <tr class="${reservasTachadas.includes(reserva.id) ? "tachada" : ""}">
              <td>${reserva.id}</td>
              <td>${formatDate(reserva.fecha)}</td>
              <td>${reserva.hora}</td>
              <td>${reserva.personas}</td>
              <td>${reserva.nombre}</td>
              <td>${reserva.telefono}</td>
              <td>${reserva.email}</td>
              <td>${mesas[reserva.id] || "-"}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </body>
  </html>
`)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  const handleMesaClick = (e: React.MouseEvent, reservaId: string) => {
    e.stopPropagation()
    setCurrentReservaId(reservaId)
    setMesaInput(mesas[reservaId] || "")
    setShowMesaModal(true)
  }

  const saveMesaNumber = () => {
    if (!currentReservaId) return
    const updatedMesas = { ...mesas, [currentReservaId]: mesaInput }
    setMesas(updatedMesas)
    setShowMesaModal(false)
    localStorage.setItem("mesasAsignadas", JSON.stringify(updatedMesas))
  }

  const horasOptions = useMemo(() => {
    const options = []
    // Añadir horas del mediodía
    options.push("11:30")
    options.push("12:00")
    options.push("12:30")
    options.push("12:45")
    // Añadir horas de la tarde/noche (hasta las 9 PM en lugar de 10 PM)
    for (let hour = 17; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 21 && minute > 0) continue
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        options.push(`${formattedHour}:${formattedMinute}`)
      }
    }
    return options
  }, [])

  const personasOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  }, [])

  const handleNuevaReservaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevaReservaDate || !nuevaReservaHora || !nuevaReservaPersonas || !nuevaReservaNombre) {
      setNuevaReservaError("Bitte füllen Sie alle Pflichtfelder aus")
      return
    }
    setNuevaReservaSubmitting(true)
    setNuevaReservaError(null)
    try {
      const formData = new FormData()
      formData.append("fecha", formatDateToString(nuevaReservaDate))
      formData.append("hora", nuevaReservaHora)
      formData.append("personas", nuevaReservaPersonas)
      formData.append("nombre", nuevaReservaNombre)
      formData.append("telefono", nuevaReservaTelefono)
      formData.append("email", nuevaReservaEmail)
      const response = await fetch("https://reservierung.cantinatexmex.ch/enviar_confirmacion.php", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        setShowNuevaReservaModal(false)
        resetNuevaReservaForm()
        fetchReservas()
      } else {
        setNuevaReservaError(result.message || "Fehler beim Speichern der Reservierung")
      }
    } catch (err) {
      setNuevaReservaError("Fehler beim Speichern der Reservierung")
      console.error("Error al enviar la reserva:", err)
    } finally {
      setNuevaReservaSubmitting(false)
    }
  }

  const resetNuevaReservaForm = () => {
    setNuevaReservaDate(new Date())
    setNuevaReservaHora("18:00")
    setNuevaReservaPersonas("2")
    setNuevaReservaNombre("")
    setNuevaReservaTelefono("")
    setNuevaReservaEmail("info@lweb.ch")
    setNuevaReservaError(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Sind Sie sicher, dass Sie diese Reservierung löschen möchten?")) return
    try {
      const formData = new FormData()
      formData.append("action", "delete")
      formData.append("id", id)
      const response = await fetch("https://reservierung.cantinatexmex.ch/gestion_reservas.php", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        fetchReservas()
      } else {
        alert(result.message || "Error al eliminar la reserva")
      }
    } catch (err) {
      console.error("Error al eliminar la reserva:", err)
      alert("Error al eliminar la reserva")
    }
  }

  const handleEditClick = (reserva: Reserva) => {
    setEditReserva(reserva)
    setEditReservaDate(parseDate(reserva.fecha, reserva.hora))
    setEditReservaHora(reserva.hora)
    setEditReservaPersonas(reserva.personas)
    setEditReservaNombre(reserva.nombre)
    setEditReservaTelefono(reserva.telefono || "")
    setEditReservaEmail(reserva.email || "")
    setShowEditModal(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editReserva || !editReservaDate || !editReservaHora || !editReservaPersonas || !editReservaNombre) {
      setEditReservaError("Bitte füllen Sie alle Pflichtfelder aus")
      return
    }
    setEditReservaSubmitting(true)
    setEditReservaError(null)
    try {
      const formData = new FormData()
      formData.append("action", "edit")
      formData.append("id", editReserva.id)
      formData.append("fecha", formatDateToString(editReservaDate))
      formData.append("hora", editReservaHora)
      formData.append("personas", editReservaPersonas)
      formData.append("nombre", editReservaNombre)
      formData.append("telefono", editReservaTelefono)
      formData.append("email", editReservaEmail)
      const response = await fetch("https://reservierung.cantinatexmex.ch/gestion_reservas.php", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        setShowEditModal(false)
        fetchReservas()
      } else {
        setEditReservaError(result.message || "Fehler beim Aktualisieren der Reservierung")
      }
    } catch (err) {
      setEditReservaError("Fehler beim Aktualisieren der Reservierung")
      console.error("Error al actualizar la reserva:", err)
    } finally {
      setEditReservaSubmitting(false)
    }
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center py-8">
        <div className="font-sans p-8 max-w-md w-full mx-auto bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <Lock className="h-12 w-12 text-amber-600 mb-4" />
            <h1 className="text-2xl font-bold text-amber-800">Acceso Restringido</h1>
            <p className="text-amber-600 mt-2 text-center">
              Por favor, introduce tus credenciales para acceder al sistema de reservas
            </p>
          </div>

          {authError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 shadow-sm text-center">{authError}</div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-amber-700">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-amber-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8">
      <div className="font-sans p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-800">Reservierungsliste</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={() => setShowNuevaReservaModal(true)}
              className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition-transform hover:scale-105"
            >
              <Plus className="h-7 w-7" />
            </button>
          </div>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 shadow-sm">{error}</div>}

        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-amber-400" />
              </div>
              <input
                type="text"
                placeholder="Reservierungen suchen..."
                className="pl-10 pr-4 py-2 w-full border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className={`flex items-center px-4 py-2 rounded-md border ${
                  dateFilter === "all"
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                }`}
                onClick={() => setDateFilter("all")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Alle
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-md border ${
                  dateFilter === "today"
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                }`}
                onClick={() => setDateFilter("today")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Heute
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-md border ${
                  dateFilter === "thisWeek"
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                }`}
                onClick={() => setDateFilter("thisWeek")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Diese Woche
              </button>
              <div className="relative">
                <button
                  className={`flex items-center px-4 py-2 rounded-md border ${
                    dateFilter === "specific"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                  }`}
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {selectedDate ? formatDateToString(selectedDate) : "Datum wählen"}
                </button>
                {showCalendar && (
                  <div
                    ref={calendarRef}
                    className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-3 border border-amber-200"
                    style={{ minWidth: "280px" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <button onClick={prevMonth} className="p-1 rounded-full hover:bg-amber-100">
                        <ChevronLeft className="h-4 w-4 text-amber-700" />
                      </button>
                      <div className="font-medium">
                        {getMonthName(currentMonth)} {currentYear}
                      </div>
                      <button onClick={nextMonth} className="p-1 rounded-full hover:bg-amber-100">
                        <ChevronRight className="h-4 w-4 text-amber-700" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((day) => (
                        <div
                          key={day}
                          className="h-8 w-8 flex items-center justify-center text-xs font-medium text-amber-700"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">{generateCalendarDays(handleDateSelect, selectedDate)}</div>
                    <div className="mt-2 flex justify-center">
                      <button
                        onClick={() => {
                          const today = new Date()
                          setCurrentMonth(today.getMonth())
                          setCurrentYear(today.getFullYear())
                          setSelectedDate(today)
                          setDateFilter("specific")
                          setShowCalendar(false)
                        }}
                        className="text-xs text-amber-700 hover:text-amber-900 underline"
                      >
                        Heute
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {dateFilter === "specific" && selectedDate && (
                <button
                  onClick={clearSelectedDate}
                  className="flex items-center px-2 py-2 rounded-md border bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                  title="Datum zurücksetzen"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                className="flex items-center px-4 py-2 rounded-md border bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                onClick={toggleSortOrder}
                title={sortOrder === "desc" ? "Älteste zuerst" : "Neueste zuerst"}
              >
                <ArrowDownUp className="h-4 w-4 mr-2" />
                {sortOrder === "desc" ? "Neueste zuerst" : "Älteste zuerst"}
              </button>
              <button
                className="flex items-center px-4 py-2 rounded-md border bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                onClick={printReservations}
                title="Aktuelle Ansicht drucken"
              >
                <Printer className="h-4 w-4 mr-2" />
                Drucken
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-100 text-amber-800">
                  <th className="px-4 py-3 text-left font-semibold text-sm">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Datum</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Zeit</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Personen</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm hidden md:table-cell">Telefon</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm hidden md:table-cell">E-Mail</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Tischnummer</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-amber-700">
                      Laden...
                    </td>
                  </tr>
                ) : visibleReservas.length > 0 ? (
                  visibleReservas.map((reserva, index) => (
                    <tr
                      key={reserva.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-amber-50 hover:bg-amber-100"} ${
                        reservasTachadas.includes(reserva.id) ? "line-through text-red-500" : ""
                      }`}
                      onClick={() => toggleReservaTachada(reserva.id)}
                    >
                      <td className="px-4 py-3 text-sm">{reserva.id}</td>
                      <td className="px-4 py-3 text-sm">{formatDate(reserva.fecha)}</td>
                      <td className="px-4 py-3 text-sm">{reserva.hora}</td>
                      <td className="px-4 py-3 text-sm">{reserva.personas}</td>
                      <td className="px-4 py-3 text-sm font-medium">{reserva.nombre}</td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">{reserva.telefono}</td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">{reserva.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          {mesas[reserva.id] && (
                            <span className="mr-2 bg-amber-100 px-2 py-1 rounded-md text-amber-800 font-medium">
                              {mesas[reserva.id]}
                            </span>
                          )}
                          <button
                            onClick={(e) => handleMesaClick(e, reserva.id)}
                            className="p-1 rounded-full hover:bg-amber-100 text-amber-700"
                            title={mesas[reserva.id] ? "Editar mesa" : "Asignar mesa"}
                          >
                            <Table className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditClick(reserva)
                            }}
                            className="p-1 rounded-full hover:bg-amber-100 text-amber-700"
                            title="Editar reserva"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(reserva.id)
                            }}
                            className="p-1 rounded-full hover:bg-red-100 text-red-700"
                            title="Eliminar reserva"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-6 text-center text-amber-700">
                      Keine Reservierungen entsprechen den Suchkriterien.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            {visibleReservas.length > 0 && (
              <div className="px-4 py-3 bg-amber-50 text-xs text-amber-700">
                * Horizontal scrollen, um weitere Spalten zu sehen, oder Gerät drehen.
              </div>
            )}
          </div>
        </div>

        {visibleReservas.length < filteredReservas.length && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Mehr Reservierungen anzeigen
              <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        <div className="mt-4 text-sm text-amber-700">
          Zeige {visibleReservas.length} von {filteredReservas.length} Reservierungen
          {dateFilter === "specific" && selectedDate && (
            <span className="ml-2">für {formatDateToString(selectedDate)}</span>
          )}
        </div>
      </div>

      {showMesaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-amber-800 mb-4">
              {mesas[currentReservaId || ""] ? "Tischnummer bearbeiten" : "Tischnummer vergeben"}
            </h3>
            <div className="mb-4">
              <label htmlFor="mesa-number" className="block text-sm font-medium text-amber-700 mb-1">
                Tischnummer
              </label>
              <input
                id="mesa-number"
                type="text"
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={mesaInput}
                onChange={(e) => setMesaInput(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowMesaModal(false)}
                className="px-4 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50"
              >
                Zurück
              </button>
              <button
                onClick={saveMesaNumber}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {showNuevaReservaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-amber-800">Neue Reservierung</h3>
              <button onClick={() => setShowNuevaReservaModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleNuevaReservaSubmit} className="space-y-4">
              {nuevaReservaError && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{nuevaReservaError}</div>
              )}
              <div className="space-y-2">
                <label htmlFor="fecha" className="block text-sm font-medium text-amber-700">
                  Datum *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-2 border border-amber-300 rounded-md bg-white text-left"
                    onClick={() => setShowNuevaReservaCalendar(!showNuevaReservaCalendar)}
                  >
                    <span>{formatDateToString(nuevaReservaDate)}</span>
                    <Calendar className="h-4 w-4 text-amber-500" />
                  </button>
                  {showNuevaReservaCalendar && (
                    <div
                      ref={nuevaReservaCalendarRef}
                      className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-3 border border-amber-200"
                      style={{ minWidth: "280px" }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-amber-100">
                          <ChevronLeft className="h-4 w-4 text-amber-700" />
                        </button>
                        <div className="font-medium">
                          {getMonthName(currentMonth)} {currentYear}
                        </div>
                        <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-amber-100">
                          <ChevronRight className="h-4 w-4 text-amber-700" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((day) => (
                          <div
                            key={day}
                            className="h-8 w-8 flex items-center justify-center text-xs font-medium text-amber-700"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays(handleNuevaReservaDateSelect, nuevaReservaDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="hora" className="block text-sm font-medium text-amber-700">
                  Uhrzeit *
                </label>
                <select
                  id="hora"
                  value={nuevaReservaHora}
                  onChange={(e) => setNuevaReservaHora(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-md bg-white"
                >
                  {horasOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} Uhr
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="personas" className="block text-sm font-medium text-amber-700">
                  Anzahl Personen *
                </label>
                <select
                  id="personas"
                  value={nuevaReservaPersonas}
                  onChange={(e) => setNuevaReservaPersonas(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-md bg-white"
                >
                  {personasOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} {Number.parseInt(option) === 1 ? "Person" : "Personen"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-amber-700">
                  Name *
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={nuevaReservaNombre}
                  onChange={(e) => setNuevaReservaNombre(e.target.value)}
                  placeholder="Name eingeben"
                  className="w-full px-4 py-2 border border-amber-300 rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="telefono" className="block text-sm font-medium text-amber-700">
                  Telefon
                </label>
                <input
                  id="telefono"
                  type="text"
                  value={nuevaReservaTelefono}
                  onChange={(e) => setNuevaReservaTelefono(e.target.value)}
                  placeholder="Telefonnummer eingeben"
                  className="w-full px-4 py-2 border border-amber-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-amber-700">
                  E-Mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={nuevaReservaEmail}
                  onChange={(e) => setNuevaReservaEmail(e.target.value)}
                  placeholder="E-Mail-Adresse eingeben"
                  className="w-full px-4 py-2 border border-amber-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNuevaReservaModal(false)}
                  className="px-4 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={nuevaReservaSubmitting}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
                >
                  {nuevaReservaSubmitting ? "Speichern..." : "Speichern"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editReserva && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-amber-800">Reserva bearbeiten</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {editReservaError && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{editReservaError}</div>
              )}
              <div className="space-y-2">
                <label htmlFor="edit-fecha" className="block text-sm font-medium text-amber-700">
                  Datum *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-2 border border-amber-300 rounded-md bg-white text-left"
                    onClick={() => setShowEditCalendar(!showEditCalendar)}
                  >
                    <span>{formatDateToString(editReservaDate)}</span>
                    <Calendar className="h-4 w-4 text-amber-500" />
                  </button>
                  {showEditCalendar && (
                    <div
                      ref={editCalendarRef}
                      className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-3 border border-amber-200"
                      style={{ minWidth: "280px" }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-amber-100">
                          <ChevronLeft className="h-4 w-4 text-amber-700" />
                        </button>
                        <div className="font-medium">
                          {getMonthName(currentMonth)} {currentYear}
                        </div>
                        <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-amber-100">
                          <ChevronRight className="h-4 w-4 text-amber-700" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((day) => (
                          <div
                            key={day}
                            className="h-8 w-8 flex items-center justify-center text-xs font-medium text-amber-700"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays(handleEditDateSelect, editReservaDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-hora" className="block text-sm font-medium text-amber-700">
                  Uhrzeit *
                </label>
                <select
                  id="edit-hora"
                  value={editReservaHora}
                  onChange={(e) => setEditReservaHora(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-md bg-white"
                >
                  {horasOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} Uhr
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-personas" className="block text-sm font-medium text-amber-700">
                  Anzahl Personen *
                </label>
                <select
                  id="edit-personas"
                  value={editReservaPersonas}
                  onChange={(e) => setEditReservaPersonas(e.target.value)}
                  className="w-full px-4 py-2 border border-amber-300 rounded-md bg-white"
                >
                  {personasOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} {Number.parseInt(option) === 1 ? "Person" : "Personen"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-nombre" className="block text-sm font-medium text-amber-700">
                  Name *
                </label>
                <input
                  id="edit-nombre"
                  type="text"
                  value={editReservaNombre}
                  onChange={(e) => setEditReservaNombre(e.target.value)}
                  placeholder="Name eingeben"
                  className="w-full px-4 py-2 border border-amber-300 rounded-md"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-telefono" className="block text-sm font-medium text-amber-700">
                  Telefon
                </label>
                <input
                  id="edit-telefono"
                  type="text"
                  value={editReservaTelefono}
                  onChange={(e) => setEditReservaTelefono(e.target.value)}
                  placeholder="Telefonnummer eingeben"
                  className="w-full px-4 py-2 border border-amber-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-email" className="block text-sm font-medium text-amber-700">
                  E-Mail
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={editReservaEmail}
                  onChange={(e) => setEditReservaEmail(e.target.value)}
                  placeholder="E-Mail-Adresse eingeben"
                  className="w-full px-4 py-2 border border-amber-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={editReservaSubmitting}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
                >
                  {editReservaSubmitting ? "Speichern..." : "Speichern"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

