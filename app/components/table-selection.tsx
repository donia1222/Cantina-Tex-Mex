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

  // Función para renderizar una mesa con el estilo adecuado
  const renderTable = (number: string, width = "w-16", height = "h-16", extraClasses = "") => {
    const isSelected = selectedTables.includes(number)
    const isUnavailable = unavailableTables.includes(number) && !isSelected

    return (
      <button
        key={number}
        onClick={() => onTableSelect(number)}
        disabled={isUnavailable}
        className={`
          ${width} ${height} ${extraClasses}
          flex items-center justify-center border-2 border-red-500 text-lg font-bold transition-all
          ${
            isSelected
              ? "bg-amber-500 border-amber-600 text-white"
              : isUnavailable
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-green-800 hover:bg-amber-100"
          }
        `}
      >
        {number}
      </button>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Contenedor principal del mapa con posicionamiento relativo */}
      <div className="relative w-full aspect-[4/3] bg-white">
        {/* Etiquetas superiores */}
        <div className="absolute top-0 left-0 w-[20%]">
          <div className="border-2 border-red-500 py-2 text-center text-green-800 text-xl font-medium">Küche</div>
        </div>
        <div className="absolute top-0 right-0 w-[60%]">
          <div className="border-2 border-red-500 py-2 text-center text-green-800 text-xl font-medium">Bar</div>
        </div>

        {/* Mesas 1-4 (columna izquierda) */}
        <div className="absolute left-[5%] top-[10%]">{renderTable("1")}</div>
        <div className="absolute left-[5%] top-[30%]">{renderTable("2")}</div>
        <div className="absolute left-[5%] top-[50%]">{renderTable("3")}</div>
        <div className="absolute left-[5%] top-[70%]">{renderTable("4")}</div>

        {/* Mesas 5 (abajo izquierda) */}
        <div className="absolute left-[5%] bottom-[5%] flex space-x-1">
          {renderTable("5")}
          {renderTable("5")}
        </div>

        {/* Mesas 6-9 (columna central izquierda) */}
        <div className="absolute left-[35%] top-[70%]">{renderTable("6")}</div>
        <div className="absolute left-[35%] top-[50%]">{renderTable("7")}</div>
        <div className="absolute left-[35%] top-[30%]">{renderTable("8")}</div>
        <div className="absolute left-[35%] top-[10%]">{renderTable("9")}</div>

        {/* Mesas 10-15 (centro) */}
        <div className="absolute left-[55%] top-[15%] flex space-x-4">
          {renderTable("10", "w-12", "h-12")}
          {renderTable("15", "w-20", "h-12")}
        </div>
        <div className="absolute left-[55%] top-[40%] flex space-x-4">
          {renderTable("11", "w-12", "h-12")}
          {renderTable("14", "w-20", "h-12")}
        </div>
        <div className="absolute left-[55%] top-[65%] flex space-x-4">
          {renderTable("12", "w-12", "h-12")}
          {renderTable("13", "w-20", "h-12")}
        </div>

        {/* Mesas 16-19 (columna derecha) */}
        <div className="absolute right-[5%] top-[10%]">{renderTable("16", "w-16", "h-20")}</div>
        <div className="absolute right-[5%] top-[30%]">{renderTable("17", "w-16", "h-20")}</div>
        <div className="absolute right-[5%] top-[50%]">{renderTable("18", "w-16", "h-20")}</div>
        <div className="absolute right-[5%] top-[70%]">{renderTable("19", "w-16", "h-20")}</div>

        {/* Mesa 20 (abajo derecha) */}
        <div className="absolute right-[20%] bottom-[5%]">{renderTable("20", "w-12", "h-20")}</div>

        {/* Entrada */}
        <div className="absolute bottom-[5%] left-[45%] border-2 border-red-500 px-6 py-2 text-green-800 text-xl font-medium">
          Eingang
        </div>

      </div>

      {/* Leyenda */}
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border-2 border-red-500 mr-2"></div>
          <span>Verfügbar</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-500 border-2 border-amber-600 mr-2"></div>
          <span>Ausgewählt</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 mr-2"></div>
          <span>Belegt</span>
        </div>
      </div>
    </div>
  )
}
