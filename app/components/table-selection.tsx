"use client"

import { useState, useEffect } from "react"

type TableSelectionProps = {
  selectedTables: string[]
  onTableSelect: (tableNumber: string) => void
  reservationId?: string
  reservationDate?: string
  allReservations: Record<string, string[]>
  allReservationDates: Record<string, string> // Mapa de ID de reserva a fecha
}

export function TableSelection({
  selectedTables,
  onTableSelect,
  reservationId,
  reservationDate,
  allReservations,
  allReservationDates,
}: TableSelectionProps) {
  const [unavailableTables, setUnavailableTables] = useState<string[]>([])

  // Calcular las mesas no disponibles basadas en las reservas del mismo día
  useEffect(() => {
    const tables: string[] = []

    // Solo si tenemos una fecha de reserva
    if (reservationDate) {
      // Recopilar todas las mesas asignadas excepto las de la reserva actual
      // pero solo para reservas del mismo día
      Object.entries(allReservations).forEach(([resId, tableNumbers]) => {
        if (resId !== reservationId && allReservationDates[resId] === reservationDate) {
          tableNumbers.forEach((table) => {
            if (!tables.includes(table)) {
              tables.push(table)
            }
          })
        }
      })
    }

    setUnavailableTables(tables)
  }, [allReservations, reservationId, reservationDate, allReservationDates])

  // Crear un array con números del 1 al 20
  const tableNumbers = Array.from({ length: 20 }, (_, i) => (i + 1).toString())

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
        {tableNumbers.map((number) => {
          const isSelected = selectedTables.includes(number)
          const isUnavailable = unavailableTables.includes(number) && !isSelected

          return (
            <button
              key={number}
              onClick={() => onTableSelect(number)}
              disabled={isUnavailable}
              className={`
                aspect-square flex items-center justify-center rounded-md border-2 text-lg font-bold transition-all
                ${
                  isSelected
                    ? "bg-amber-500 border-amber-600 text-white"
                    : isUnavailable
                      ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white border-amber-300 text-amber-800 hover:bg-amber-100"
                }
              `}
            >
              {number}
            </button>
          )
        })}
      </div>
    </div>
  )
}
