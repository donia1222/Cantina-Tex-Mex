"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Settings, Save, AlertCircle, Check } from "lucide-react"

interface ConfiguracionProps {
  onClose?: () => void
}

const ConfiguracionReservas: React.FC<ConfiguracionProps> = ({ onClose }) => {
  const [maxReservasPorHora, setMaxReservasPorHora] = useState<number>(6)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    fetchConfiguracion()
  }, [])

  const fetchConfiguracion = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://reservierung.cantinatexmex.ch/gestion_configuracion.php")
      if (!response.ok) {
        throw new Error(`Error al obtener la configuración: ${response.statusText}`)
      }
      const data = await response.json()
      if (data.success && data.config) {
        if (data.config.max_reservas_por_hora) {
          setMaxReservasPorHora(Number.parseInt(data.config.max_reservas_por_hora))
        }
      }
    } catch (error) {
      console.error("Error al cargar la configuración:", error)
      setError("Error al cargar la configuración. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("https://reservierung.cantinatexmex.ch/gestion_configuracion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clave: "max_reservas_por_hora",
          valor: maxReservasPorHora.toString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Error al guardar la configuración: ${response.statusText}`)
      }

      const data = await response.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        throw new Error(data.message || "Error al guardar la configuración")
      }
    } catch (error) {
      console.error("Error al guardar la configuración:", error)
      setError("Error al guardar la configuración. Por favor, inténtelo de nuevo.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-amber-800 flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Configuración de Reservas
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Configuración guardada correctamente</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="maxReservas" className="block text-sm font-medium text-amber-700 mb-1">
            Máximo de reservas por hora
          </label>
          <div className="flex items-center">
            <input
              type="number"
              id="maxReservas"
              min="1"
              max="20"
              value={maxReservasPorHora}
              onChange={(e) => setMaxReservasPorHora(Number.parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              disabled={loading || saving}
            />
          </div>
          <p className="mt-1 text-sm text-amber-600">
            Este valor determina cuántas reservas se permiten para cada horario.
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-amber-300 rounded-md text-amber-700 hover:bg-amber-50"
              disabled={saving}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 flex items-center"
            disabled={loading || saving}
          >
            {saving ? (
              <>
                <span className="animate-pulse mr-2">●</span>
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfiguracionReservas
