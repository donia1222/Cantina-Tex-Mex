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

  // Función para renderizar una mesa individual
  const renderTable = (number: string, className = "") => {
    const isSelected = selectedTables.includes(number)
    const isUnavailable = unavailableTables.includes(number) && !isSelected

    return (
      <button
        key={number}
        onClick={() => onTableSelect(number)}
        disabled={isUnavailable}
        className={`
          flex items-center justify-center border-2 border-red-500 text-lg font-bold transition-all
          ${
            isSelected
              ? "bg-amber-500 border-amber-600 text-white"
              : isUnavailable
                ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-red-500 text-amber-800 hover:bg-amber-100"
          }
          ${className}
        `}
      >
        {number}
      </button>
    )
  }

  return (
    <div className="w-full relative">
      {/* Etiquetas de secciones */}
      <div className="absolute top-0 left-0 w-[180px] h-10 border-2 border-red-500 flex items-center justify-center text-green-800 font-bold">
        Küche
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-10 border-2 border-red-500 flex items-center justify-center text-green-800 font-bold">
        Bar
      </div>
      <div className="absolute bottom-0 right-0 h-[400px] w-10 border-2 border-red-500 flex items-center justify-center text-green-800 font-bold transform rotate-90 origin-bottom-right translate-y-[-100%]">
        Shisha
      </div>
      <div className="absolute bottom-0 left-[400px] w-[200px] h-10 border-2 border-red-500 flex items-center justify-center text-green-800 font-bold">
        Eingang
      </div>

      {/* Contenedor principal con altura fija para el mapa */}
      <div className="w-full h-[700px] pt-16 relative">
        {/* Columna izquierda - Mesas 1-5 */}
        <div className="absolute left-0 top-16 space-y-4">
          {renderTable("1", "w-[120px] h-[120px]")}
          {renderTable("2", "w-[120px] h-[120px] mt-8")}
          {renderTable("3", "w-[120px] h-[120px] mt-8")}
          {renderTable("4", "w-[120px] h-[120px] mt-8")}
        </div>

        {/* Mesas 5 (dobles) en la parte inferior izquierda */}
        <div className="absolute left-0 bottom-16 flex">
          {renderTable("5", "w-[120px] h-[120px]")}
          {renderTable("5", "w-[120px] h-[120px] ml-2")}
        </div>

        {/* Columna central - Mesas 6-9 */}
        <div className="absolute left-[250px] top-16 space-y-4">
          {renderTable("9", "w-[120px] h-[120px]")}
          {renderTable("8", "w-[120px] h-[120px] mt-8")}
          {renderTable("7", "w-[120px] h-[120px] mt-8")}
          {renderTable("6", "w-[120px] h-[120px] mt-8")}
        </div>

        {/* Mesas centrales pequeñas - 10-15 */}
        <div className="absolute left-[400px] top-16 grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-16">
            {renderTable("10", "w-[80px] h-[80px]")}
            {renderTable("11", "w-[80px] h-[80px]")}
            {renderTable("12", "w-[80px] h-[80px]")}
          </div>
          <div className="flex flex-col space-y-16">
            {renderTable("15", "w-[120px] h-[80px]")}
            {renderTable("14", "w-[120px] h-[80px]")}
            {renderTable("13", "w-[120px] h-[80px]")}
          </div>
        </div>

        {/* Columna derecha - Mesas 16-19 */}
        <div className="absolute right-0 top-16 space-y-4">
          {renderTable("16", "w-[120px] h-[120px]")}
          {renderTable("17", "w-[120px] h-[120px] mt-8")}
          {renderTable("18", "w-[120px] h-[120px] mt-8")}
          {renderTable("19", "w-[120px] h-[120px] mt-8")}
        </div>

        {/* Mesa 20 en la parte inferior derecha */}
        <div className="absolute right-[120px] bottom-16">{renderTable("20", "w-[80px] h-[120px]")}</div>
      </div>
    </div>
  )
}
