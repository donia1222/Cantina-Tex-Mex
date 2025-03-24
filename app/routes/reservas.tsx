"use client"

import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState, useMemo } from "react"
import { Search, Calendar, Filter, ArrowDownUp, ChevronDown } from "lucide-react"

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

export default function Reservas() {
  const { reservas, error } = useLoaderData<typeof loader>()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "thisWeek">("all")
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc") // Default to most recent first
  const [visibleCount, setVisibleCount] = useState(10) // Initially show 10 reservations

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
      }

      return searchMatch && dateMatch
    })
  }, [reservas, searchTerm, dateFilter, sortOrder])

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
              <button
                className="flex items-center px-4 py-2 rounded-md border bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                onClick={toggleSortOrder}
                title={sortOrder === "desc" ? "Älteste zuerst" : "Neueste zuerst"}
              >
                <ArrowDownUp className="h-4 w-4 mr-2" />
                {sortOrder === "desc" ? "Neueste zuerst" : "Älteste zuerst"}
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
        </div>
      </div>
    </div>
  )
}


