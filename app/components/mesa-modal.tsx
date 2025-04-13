"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { TableSelection } from "./table-selection"

type MesaModalProps = {
  isOpen: boolean
  onClose: () => void
  reservaId: string | null
  mesas: Record<string, string[]>
  reservaFecha?: string // Fecha de la reserva actual
  allReservationDates: Record<string, string> // Mapa de ID de reserva a fecha
  onSave: (reservaId: string, selectedTables: string[]) => void
}

export function MesaModal({
  isOpen,
  onClose,
  reservaId,
  mesas,
  reservaFecha,
  allReservationDates,
  onSave,
}: MesaModalProps) {
  const [selectedTables, setSelectedTables] = useState<string[]>([])

  // Cargar mesas seleccionadas cuando se abre el modal
  useEffect(() => {
    if (reservaId && mesas[reservaId]) {
      setSelectedTables(mesas[reservaId])
    } else {
      setSelectedTables([])
    }
  }, [reservaId, mesas])

  const handleTableSelect = (tableNumber: string) => {
    setSelectedTables((prev) => {
      // Si la mesa ya está seleccionada, la quitamos
      if (prev.includes(tableNumber)) {
        return prev.filter((t) => t !== tableNumber)
      }
      // Si no está seleccionada, la añadimos
      return [...prev, tableNumber].sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
    })
  }

  const handleSave = () => {
    if (reservaId) {
      onSave(reservaId, selectedTables)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-amber-800">
            {mesas[reservaId || ""] ? "Tischzuweisung bearbeiten" : "Tische zuweisen"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-amber-700 mb-2">
            Wählen Sie Tische für diese Reservierung aus. Grau markierte Tische sind bereits anderen Reservierungen am
            selben Tag zugewiesen.
          </p>
          <div className="overflow-auto">
            <TableSelection
              selectedTables={selectedTables}
              onTableSelect={handleTableSelect}
              reservationId={reservaId || undefined}
              reservationDate={reservaFecha}
              allReservations={mesas}
              allReservationDates={allReservationDates}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-amber-700 mb-2">
            Ausgewählte Tische: {selectedTables.length > 0 ? selectedTables.join(", ") : "Keine"}
          </p>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50"
          >
            Abbrechen
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}
