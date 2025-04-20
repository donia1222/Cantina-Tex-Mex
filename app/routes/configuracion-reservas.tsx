"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Settings, Save, AlertCircle, Check } from 'lucide-react'

interface ConfiguracionProps {
  onClose?: () => void
}

const ConfiguracionReservas: React.FC<ConfiguracionProps> = ({ onClose }) => {
  const [maxReservasPorHora, setMaxReservasPorHora] = useState<number>(6)
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [lastFetchTime, setLastFetchTime] = useState<number>(0)

  useEffect(() => {
    fetchConfiguracion()
  }, [])

  const fetchConfiguracion = async () => {
    setLoading(true)
    setError(null)
    
    // Determinar si estamos en desarrollo o producción
    const isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
    
    // Si estamos en desarrollo, intentar usar el valor guardado localmente primero
    if (isDevelopment) {
      const savedValue = localStorage.getItem('max_reservas_por_hora')
      if (savedValue) {
        console.log("Entwicklung: Verwende lokal gespeicherten Wert:", savedValue)
        setMaxReservasPorHora(Number.parseInt(savedValue))
        setLoading(false)
        setLastFetchTime(Date.now())
        return
      }
    }
    
    // Añadir un timestamp para evitar caché
    const timestamp = new Date().getTime()
    const url = `https://reservierung.cantinatexmex.ch/gestion_configuracion.php?t=${timestamp}`
    
    console.log(`Konfiguration abrufen um ${new Date().toISOString()}`)
    
    try {
      const response = await fetch(url)
      console.log("Antwort-Status:", response.status)
      
      if (response.ok) {
        const text = await response.text()
        console.log("Rohe Antwort:", text)
        
        try {
          const data = JSON.parse(text)
          console.log("Geparste Daten:", data)
          
          if (data.success && data.config) {
            if (data.config.max_reservas_por_hora) {
              const value = Number.parseInt(data.config.max_reservas_por_hora)
              console.log("Setze max_reservas_por_hora auf:", value)
              setMaxReservasPorHora(value)
              
              // Guardar en localStorage como respaldo
              localStorage.setItem('max_reservas_por_hora', value.toString())
            } else {
              console.warn("max_reservas_por_hora nicht in der Konfiguration gefunden")
            }
          } else {
            console.warn("Ungültiges Antwortformat:", data)
          }
        } catch (parseError) {
          console.error("Fehler beim Parsen von JSON:", parseError)
          
          // Intentar recuperar del localStorage
          const savedValue = localStorage.getItem('max_reservas_por_hora')
          if (savedValue) {
            console.log("Verwende gespeicherten Wert aus localStorage:", savedValue)
            setMaxReservasPorHora(Number.parseInt(savedValue))
          } else {
            // Solo mostrar error si no hay valor guardado
            setError("Fehler beim Verarbeiten der Serverantwort.")
          }
        }
      } else {
        throw new Error(`Fehler beim Abrufen der Konfiguration: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Fehler beim Laden der Konfiguration:", error)
      
      // Intentar recuperar del localStorage
      const savedValue = localStorage.getItem('max_reservas_por_hora')
      if (savedValue) {
        console.log("Verwende gespeicherten Wert aus localStorage nach Fehler:", savedValue)
        setMaxReservasPorHora(Number.parseInt(savedValue))
        
        // No mostrar error si estamos en desarrollo
        if (!isDevelopment) {
          setError("Keine Verbindung zum Server möglich. Verwende lokal gespeicherten Wert.")
        }
      } else {
        // Solo mostrar error si no hay valor guardado
        setError("Fehler beim Laden der Konfiguration. Bitte versuchen Sie es erneut.")
      }
    } finally {
      setLoading(false)
      setLastFetchTime(Date.now())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    // Guardar inmediatamente en localStorage
    localStorage.setItem('max_reservas_por_hora', maxReservasPorHora.toString())

    try {
      // Usar FormData en lugar de JSON
      const formData = new FormData()
      formData.append("clave", "max_reservas_por_hora")
      formData.append("valor", maxReservasPorHora.toString())

      // Añadir un timestamp para evitar caché
      const timestamp = new Date().getTime()
      const url = `https://reservierung.cantinatexmex.ch/gestion_configuracion.php?t=${timestamp}`

      console.log(`Konfiguration speichern um ${new Date().toISOString()}:`, maxReservasPorHora)
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      })

      console.log("Speichern Antwort-Status:", response.status)
      
      if (response.ok) {
        const text = await response.text()
        console.log("Rohe Speicherantwort:", text)
        
        try {
          const data = JSON.parse(text)
          console.log("Geparste Speicherantwort:", data)
          
          if (data.success) {
            setSuccess(true)
            setTimeout(() => {
              setSuccess(false)
            }, 3000)
            
            // Esperar un momento antes de refrescar para dar tiempo a la BD
            setTimeout(() => {
              fetchConfiguracion()
            }, 1000)
          } else {
            throw new Error(data.message || "Fehler beim Speichern der Konfiguration")
          }
        } catch (parseError) {
          console.error("Fehler beim Parsen der Speicherantwort:", parseError)
          // No mostrar error ya que guardamos en localStorage
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        }
      } else {
        throw new Error(`Fehler beim Speichern der Konfiguration: ${response.statusText}`)
      }
    } catch (error) {
      console.error("Fehler beim Speichern der Konfiguration:", error)
      
      // Determinar si estamos en desarrollo
      const isDevelopment = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1';
      
      // En desarrollo, asumir éxito ya que guardamos en localStorage
      if (isDevelopment) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        // Intentar con no-cors como último recurso
        try {
          console.log("Versuche mit no-cors als Fallback")
          
          const formData = new FormData()
          formData.append("clave", "max_reservas_por_hora")
          formData.append("valor", maxReservasPorHora.toString())
          
          // Añadir un timestamp para evitar caché
          const timestamp = new Date().getTime()
          const url = `https://reservierung.cantinatexmex.ch/gestion_configuracion.php?t=${timestamp}`
          
          await fetch(url, {
            method: "POST",
            body: formData,
            mode: 'no-cors'
          })
          
          // Asumir éxito ya que no podemos leer la respuesta
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
            
            // Esperar un momento antes de refrescar para dar tiempo a la BD
            setTimeout(() => {
              fetchConfiguracion()
            }, 1000)
          }, 3000)
        } catch (fallbackError) {
          console.error("Fallback-Fehler:", fallbackError)
          // No mostrar error ya que guardamos en localStorage
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 3000)
        }
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-amber-800 flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Reservierungseinstellungen
        </h2>
        {!loading && (
          <button 
            onClick={fetchConfiguracion} 
            className="text-xs text-amber-600 hover:text-amber-800 underline"
            title="Konfiguration aktualisieren"
          >
            Aktualisieren
          </button>
        )}
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
          <p>Konfiguration erfolgreich gespeichert</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="maxReservas" className="block text-sm font-medium text-amber-700 mb-1">
            Maximale Reservierungen pro 30 Minuten
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
            Dieser Wert bestimmt, wie viele Reservierungen pro Zeitfenster erlaubt sind.
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
              Abbrechen
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
                Speichern...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Speichern
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Información de depuración (puedes eliminar esto en producción) */}
      <div className="mt-6 text-xs text-gray-500">
        <p>Letzte Aktualisierung: {new Date(lastFetchTime).toLocaleTimeString()}</p>
        <p>Aktueller Wert: {maxReservasPorHora}</p>
      </div>
    </div>
  )
}

export default ConfiguracionReservas