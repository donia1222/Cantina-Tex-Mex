"use client"

import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState, useMemo, useRef, useEffect } from "react"
import { Search, Calendar, Filter, ArrowDownUp, ChevronDown, Printer, X, ChevronLeft, ChevronRight } from "lucide-react"

type Reserva = {
  id: string
  fecha: string
  hora: string
  personas: string
  nombre: string
  telefono: string
  email: string
}

// Define the loader data type for consistency
type LoaderData = {
  reservas: Reserva[]
  error: string | null
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Fetch data from the PHP endpoint
    const response = await fetch("https://reservierung.cantinatexmex.ch/obtener_reservas.php")

    if (!response.ok) {
      throw new Error(`Error beim Abrufen der Reservierungen: ${response.statusText}`)
    }

    // Since the PHP returns HTML, we need to extract the data
    const html = await response.text()
    const reservas = extractReservasFromHTML(html)

    return json<LoaderData>({
      reservas,
      error: null,
    })
  } catch (error) {
    console.error("Fehler beim Laden der Reservierungen:", error)
    return json<LoaderData>({
      reservas: [],
      error: "Fehler beim Laden der Reservierungen",
    })
  }
}

function extractReservasFromHTML(html: string): Reserva[] {
  const reservas: Reserva[] = []

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

  return reservas
}

// Helper function to convert date string to a Date object
function parseDate(dateStr: string, timeStr: string): Date {
  // Check if the date is in YYYY-MM-DD format
  if (dateStr.includes("-")) {
    const [year, month, day] = dateStr.split("-").map(Number)

    // Parse time in format HH:MM
    let hours = 0
    let minutes = 0
    if (timeStr) {
      const timeParts = timeStr.split(":")
      hours = Number.parseInt(timeParts[0] || "0", 10)
      minutes = Number.parseInt(timeParts[1] || "0", 10)
    }

    // Create date object (months are 0-indexed in JavaScript)
    return new Date(year, month - 1, day, hours, minutes)
  }
  // Check if the date is in DD.MM.YYYY format
  else if (dateStr.includes(".")) {
    const [day, month, year] = dateStr.split(".").map(Number)

    // Parse time in format HH:MM
    let hours = 0
    let minutes = 0
    if (timeStr) {
      const timeParts = timeStr.split(":")
      hours = Number.parseInt(timeParts[0] || "0", 10)
      minutes = Number.parseInt(timeParts[1] || "0", 10)
    }

    // Create date object (months are 0-indexed in JavaScript)
    return new Date(year, month - 1, day, hours, minutes)
  }

  // If format is unknown, return current date (fallback)
  console.error("Unbekanntes Datumsformat:", dateStr)
  return new Date()
}

// Format date for display (DD/MM/YYYY)
function formatDate(dateStr: string): string {
  // Check if the date is in YYYY-MM-DD format
  if (dateStr.includes("-")) {
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }
  // Check if the date is in DD.MM.YYYY format
  else if (dateStr.includes(".")) {
    const [day, month, year] = dateStr.split(".")
    return `${day}/${month}/${year}`
  }

  // If format is unknown, return as is
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

  // Calculate the start and end of the current week
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay()) // Start of week (Sunday)
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // End of week (Saturday)
  endOfWeek.setHours(23, 59, 59, 999)

  return date >= startOfWeek && date <= endOfWeek
}

// Helper function to check if a date matches the selected date
function isSelectedDate(dateStr: string, selectedDate: Date | undefined): boolean {
  if (!selectedDate) return false

  const date = parseDate(dateStr, "")

  // Reset hours to compare only dates
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
  const { reservas, error } = useLoaderData<typeof loader>()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "thisWeek" | "specific">("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc") // Default to most recent first
  const [visibleCount, setVisibleCount] = useState(10) // Initially show 10 reservations
  const [showCalendar, setShowCalendar] = useState(false)

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const calendarRef = useRef<HTMLDivElement>(null)

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Handle next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)
    setDateFilter("specific")
    setShowCalendar(false)
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getDayOfWeek(currentYear, currentMonth, 1)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isToday = new Date().toDateString() === date.toDateString()
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString()

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateSelect(day)}
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

  // Clear selected date
  const clearSelectedDate = () => {
    setSelectedDate(undefined)
    setDateFilter("all")
  }

  // Sort and filter reservations
  const filteredReservas = useMemo(() => {
    // First, sort the reservations by date and time
    const sortedReservas = [...reservas].sort((a, b) => {
      const dateA = parseDate(a.fecha, a.hora)
      const dateB = parseDate(b.fecha, b.hora)

      // For descending order (most recent first)
      return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })

    // Then apply filters
    return sortedReservas.filter((reserva) => {
      // Apply search filter
      const searchMatch =
        reserva.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.hora.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.personas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserva.email.toLowerCase().includes(searchTerm.toLowerCase())

      // Apply date filter
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

  // Get only the visible reservations (pagination)
  const visibleReservas = useMemo(() => {
    return filteredReservas.slice(0, visibleCount)
  }, [filteredReservas, visibleCount])

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  // Load more reservations
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10)
  }

  // Function to print the current view
  const printReservations = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Create a styled HTML document for printing
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
            </tr>
          </thead>
          <tbody>
            ${visibleReservas
              .map(
                (reserva) => `
              <tr>
                <td>${reserva.id}</td>
                <td>${formatDate(reserva.fecha)}</td>
                <td>${reserva.hora}</td>
                <td>${reserva.personas}</td>
                <td>${reserva.nombre}</td>
                <td>${reserva.telefono}</td>
                <td>${reserva.email}</td>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8">
      <div className="font-sans p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6">Reservierungsliste</h1>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 shadow-sm">{error}</div>}

        <div className="mb-6 space-y-4">
          {/* Search and filters */}
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

              {/* Calendar button and dropdown */}
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

                {/* Custom Calendar */}
                {showCalendar && (
                  <div
                    ref={calendarRef}
                    className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-3 border border-amber-200"
                    style={{ minWidth: "280px" }}
                  >
                    {/* Calendar header */}
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

                    {/* Calendar weekdays */}
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

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>

                    {/* Today button */}
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

              {/* Clear date button - only show when a specific date is selected */}
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

        {/* Responsive table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-100 text-amber-800">
                  <th className="px-4 py-3 text-left font-semibold text-sm">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">
                    <div className="flex items-center">Datum</div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Zeit</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Personen</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm hidden md:table-cell">Telefon</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm hidden md:table-cell">E-Mail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {visibleReservas.length > 0 ? (
                  visibleReservas.map((reserva, index) => (
                    <tr key={reserva.id} className={index % 2 === 0 ? "bg-white" : "bg-amber-50 hover:bg-amber-100"}>
                      <td className="px-4 py-3 text-sm">{reserva.id}</td>
                      <td className="px-4 py-3 text-sm">{formatDate(reserva.fecha)}</td>
                      <td className="px-4 py-3 text-sm">{reserva.hora}</td>
                      <td className="px-4 py-3 text-sm">{reserva.personas}</td>
                      <td className="px-4 py-3 text-sm font-medium">{reserva.nombre}</td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">{reserva.telefono}</td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">{reserva.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-amber-700">
                      Keine Reservierungen entsprechen den Suchkriterien.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile view for hidden columns */}
          <div className="md:hidden">
            {visibleReservas.length > 0 && (
              <div className="px-4 py-3 bg-amber-50 text-xs text-amber-700">
                * Horizontal scrollen, um weitere Spalten zu sehen, oder Gerät drehen.
              </div>
            )}
          </div>
        </div>

        {/* Load more button */}
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

        {/* Results count */}
        <div className="mt-4 text-sm text-amber-700">
          Zeige {visibleReservas.length} von {filteredReservas.length} Reservierungen
          {dateFilter === "specific" && selectedDate && (
            <span className="ml-2">für {formatDateToString(selectedDate)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

