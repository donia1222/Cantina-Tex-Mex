"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "./reserva.css"
import ConfirmationModal from "./ConfirmationModal"
import PreviousReservationsModal from "./PreviousReservationsModal"
import { CalendarDays, AlertCircle, History, ChevronLeft, ChevronRight } from "lucide-react"

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


/* =====================================================================
   Rediseño visual 20/11/2026 (Lweb): mismo funcionamiento, otra cara.
   Toda la lógica de abajo (backend, fechas bloqueadas, vacaciones, horas
   pasadas, 20+ personas, reservas anteriores) es la de siempre; solo
   cambia cómo se elige: fichas en vez de calendario y desplegables.
   El backend recibe exactamente lo mismo: fecha (dd.mm.aaaa), hora,
   personas, nombre, telefono, email.
   Copia de la versión anterior: scratchpad cantina-ReservationForm.antes.tsx
   ===================================================================== */

// Interfaz para el modal de error
interface ErrorModalProps {
  message: string
  nextTime: string | null
  onClose: () => void
  onSelectTime: (time: string) => void
}

// Componente para el modal de error
const ErrorModal: React.FC<ErrorModalProps> = ({ message, nextTime, onClose, onSelectTime }) => {
  return (
    <div className="ct-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ct-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="ct-dialog__icon"><AlertCircle /></div>
        <h3>Reservierung nicht möglich</h3>
        <p>{message}</p>
        {nextTime && (
          <div className="ct-dialog__next">
            Nächste verfügbare Zeit: <b>{nextTime}</b>
          </div>
        )}
        <div className="ct-dialog__knoepfe">
          {nextTime && (
            <button
              type="button"
              className="ct-btn ct-btn--rot"
              onClick={() => {
                onSelectTime(nextTime)
                onClose()
              }}
            >
              Diese Zeit wählen
            </button>
          )}
          <button type="button" className="ct-btn ct-btn--linie" onClick={onClose}>
            Schliessen
          </button>
        </div>
      </div>
    </div>
  )
}

const TAGE_KURZ = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
const MONATE = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."]
const TAGE_IM_STREIFEN = 35

// Betriebsferien / vacaciones: 21.07 - 11.08.2026 (el 12.08 abre normal) — igual que antes
const enFerien = (date: Date) => {
  const start = new Date(2026, 6, 21, 0, 0, 0)
  const end = new Date(2026, 7, 11, 23, 59, 59)
  return date >= start && date <= end
}

const mismoDia = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const istMittag = (t: string) => Number.parseInt(t.split(":")[0], 10) < 14

const MONATE_LANG = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

// Calendario del mes con las mismas reglas que las fichas (y que el Flatpickr de antes):
// nada antes de hoy, domingos y lunes cerrados, vacaciones y días completos bloqueados.
const MonatsKalender: React.FC<{
  ausgewaehlt: Date | null
  status: (d: Date) => "offen" | "ruhetag" | "ferien" | "voll"
  onPick: (d: Date) => void
}> = ({ ausgewaehlt, status, onPick }) => {
  const heute = new Date()
  heute.setHours(0, 0, 0, 0)
  const start = ausgewaehlt || heute
  const [monat, setMonat] = useState(new Date(start.getFullYear(), start.getMonth(), 1))
  const ersterMonat = monat.getFullYear() === heute.getFullYear() && monat.getMonth() === heute.getMonth()
  const versatz = (monat.getDay() + 6) % 7 // lunes primero
  const tageImMonat = new Date(monat.getFullYear(), monat.getMonth() + 1, 0).getDate()
  const zellen: (Date | null)[] = [
    ...Array.from({ length: versatz }, () => null),
    ...Array.from({ length: tageImMonat }, (_, i) => new Date(monat.getFullYear(), monat.getMonth(), i + 1)),
  ]
  const schieben = (n: number) => setMonat(new Date(monat.getFullYear(), monat.getMonth() + n, 1))

  return (
    <div className="ct-kal">
      <div className="ct-kal__kopf">
        <button type="button" onClick={() => schieben(-1)} disabled={ersterMonat} aria-label="Vorheriger Monat"><ChevronLeft /></button>
        <p className="pincel">{MONATE_LANG[monat.getMonth()]} <span>{monat.getFullYear()}</span></p>
        <button type="button" onClick={() => schieben(1)} aria-label="Nächster Monat"><ChevronRight /></button>
      </div>
      <div className="ct-kal__woche">
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((w) => <span key={w}>{w}</span>)}
      </div>
      <div className="ct-kal__gitter" key={monat.getTime()}>
        {zellen.map((d, i) => {
          if (!d) return <span key={"l" + i} />
          const vorbei = d < heute
          const st = status(d)
          const zu = vorbei || st !== "offen"
          const an = !!ausgewaehlt && mismoDia(d, ausgewaehlt)
          const istHeute = mismoDia(d, heute)
          return (
            <button
              type="button"
              key={i}
              disabled={zu}
              aria-pressed={an}
              title={!vorbei && st === "ruhetag" ? "Ruhetag" : st === "ferien" ? "Betriebsferien" : st === "voll" ? "Ausgebucht" : undefined}
              className={"ct-kal__tag" + (an ? " is-an" : "") + (zu ? " is-zu" : "") + (istHeute ? " is-heute" : "") + (!vorbei && st === "voll" ? " is-voll" : "")}
              onClick={() => onPick(d)}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
      <div className="ct-kal__legende">
        <span><i className="l-frei" />Frei</span>
        <span><i className="l-voll" />Ausgebucht</span>
        <span><i className="l-zu" />Geschlossen</span>
      </div>
    </div>
  )
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
  const [nextAvailableTime, setNextAvailableTime] = useState<string | null>(null)

  // Estado para el modal de error
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
    // Martes (2): solo cena (noche)
    if (day === 2) {
      return ["18:00", "18:30", "19:00", "19:30", "20:00", "20:15"]
    } else if (day === 3) {
      // Miércoles (3): almuerzo y cena
      return ["11:30", "12:00", "12:30", "12:45", "18:00", "18:30", "19:00", "19:30", "20:00", "20:15"]
    } else if (day === 4 || day === 5) {
      // Jueves (4) y Viernes (5): almuerzo y cena
      return ["11:30", "12:00", "12:30", "12:45", "18:00", "18:30", "19:00", "19:30", "20:00", "20:15"]
    } else if (day === 6) {
      // Sábado: solo cena
      return ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
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

      if (day === 2) {
        // Martes: solo cena (noche)
        allTimes = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:15"]
      } else if (day === 3) {
        // Miércoles: almuerzo y cena
        allTimes = ["11:30", "12:00", "12:30", "12:45", "18:00", "18:30", "19:00", "19:30", "20:00", "20:15"]
      } else if (day === 4 || day === 5) {
        // Jueves y Viernes: almuerzo y cena
        allTimes = ["11:30", "12:00", "12:30", "12:45", "18:00", "18:30", "19:00", "19:30", "20:00", "20:15"]
      } else if (day === 6) {
        // Sábado: solo cena
        allTimes = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]
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
        // Si hay un mensaje de error relacionado con horario completo
        if (result.message && result.message.includes("completa")) {
          // Traducir el mensaje al alemán
          setErrorMessage("Diese Zeit ist bereits ausgebucht. Bitte wählen Sie eine andere Zeit.")

          // Si hay un horario disponible sugerido, mostrarlo
          if (result.nextTime) {
            setNextAvailableTime(result.nextTime)
          }

          // Mostrar el modal de error
          setShowErrorModal(true)
        } else {
          // Para otros errores, mostrar el mensaje original
          throw new Error(result.message || "Error al procesar la reserva.")
        }
      }
    } catch (err: any) {
      console.error("Error al enviar la reserva:", err)
      setError(err.message || "Hubo un problema al enviar la reserva. Por favor, intenta nuevamente más tarde.")
    }
  }


  // ── Lo que se ve: fichas en vez de calendario y desplegables ──────────────
  const [mehrPersonen, setMehrPersonen] = useState(false)
  const [kalender, setKalender] = useState(false)

  const pickTime = (time: string) => {
    setSelectedTime(time)
    setNextAvailableTime(null)
  }

  // Estado de cada día: mismas reglas que el calendario de antes
  const tagStatus = (date: Date): "offen" | "ruhetag" | "ferien" | "voll" => {
    if ([0, 1].includes(date.getDay())) return "ruhetag"
    if (enFerien(date)) return "ferien"
    const key = formatDate(date)
    const allTimes = getAllPossibleTimes(date)
    const blocked = blockedDates[key] || []
    if (allTimes.length > 0 && blocked.length >= allTimes.length) return "voll"
    return "offen"
  }

  const tage: Date[] = (() => {
    const out: Date[] = []
    const d = new Date()
    d.setHours(12, 0, 0, 0)
    for (let i = 0; i < TAGE_IM_STREIFEN; i++) {
      out.push(new Date(d))
      d.setDate(d.getDate() + 1)
    }
    return out
  })()

  // Al cargar, se marca el primer día abierto (se puede cambiar con un toque)
  useEffect(() => {
    if (loading || selectedDate) return
    const heute = new Date()
    const erster = tage.find((t) => {
      if (tagStatus(t) !== "offen") return false
      if (!mismoDia(t, heute)) return true
      // hoy solo si aún quedan horas
      const blocked = blockedDates[formatDate(t)] || []
      return getAllPossibleTimes(t).some((time) => {
        if (blocked.includes(time)) return false
        const [h, m] = time.split(":").map(Number)
        return new Date(heute.getFullYear(), heute.getMonth(), heute.getDate(), h, m) > heute
      })
    })
    if (erster) setSelectedDate(new Date(erster.getFullYear(), erster.getMonth(), erster.getDate()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  // Si la hora elegida ya no existe en el día nuevo, se quita
  useEffect(() => {
    if (selectedTime && !availableTimes.includes(selectedTime)) setSelectedTime("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableTimes])

  const ausserhalb = selectedDate && !tage.some((t) => mismoDia(t, selectedDate))
  const fechaValue = selectedDate
    ? `${String(selectedDate.getDate()).padStart(2, "0")}.${String(selectedDate.getMonth() + 1).padStart(2, "0")}.${selectedDate.getFullYear()}`
    : ""
  const datumLang = selectedDate
    ? `${TAGE_KURZ[selectedDate.getDay()]}, ${selectedDate.getDate()}. ${MONATE[selectedDate.getMonth()]}`
    : ""

  const zeitGruppen = (() => {
    const alle = Array.from(new Set([...availableTimes, ...blockedTimesForSelectedDate])).sort()
    return [
      { titel: "Mittag", zeiten: alle.filter(istMittag) },
      { titel: "Abend", zeiten: alle.filter((t) => !istMittag(t)) },
    ].filter((g) => g.zeiten.length > 0)
  })()

  const fertig = !!(selectedDate && selectedTime && personas)

  const renderTag = (t: Date, i: number, extra = false) => {
    const st = tagStatus(t)
    const zu = st !== "offen"
    const an = !!selectedDate && mismoDia(t, selectedDate)
    const heute = new Date()
    const morgen = new Date(); morgen.setDate(morgen.getDate() + 1)
    const oben = extra ? TAGE_KURZ[t.getDay()] : mismoDia(t, heute) ? "Heute" : mismoDia(t, morgen) ? "Morgen" : TAGE_KURZ[t.getDay()]
    const unten = st === "ruhetag" ? "Ruhetag" : st === "ferien" ? "Ferien" : st === "voll" ? "Ausgebucht" : MONATE[t.getMonth()]
    return (
      <button
        type="button"
        key={(extra ? "x" : "") + i}
        disabled={zu}
        aria-pressed={an}
        className={"ct-tag" + (an ? " is-an" : "") + (zu ? " is-zu" : "") + (st === "voll" ? " is-voll" : "")}
        onClick={() => {
          setSelectedDate(new Date(t.getFullYear(), t.getMonth(), t.getDate()))
          setKalender(false)
        }}
      >
        <span>{oben}</span>
        <b>{t.getDate()}</b>
        <small>{unten}</small>
      </button>
    )
  }

  return (
    <div className="ct-res">
      {loading ? (
        <div className="ct-karte ct-karte--laden">
          <div className="ct-laden"><span /><span /><span /></div>
          <p>Freie Tische werden geladen …</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="ct-karte">
          {/* El backend recibe exactamente lo mismo que antes */}
          <input type="hidden" name="fecha" value={fechaValue} />
          <input type="hidden" name="hora" value={selectedTime} />
          <input type="hidden" name="personas" value={personas || ""} />

          <aside className="ct-bild" aria-hidden="true">
            <img src="/hero/1.webp" alt="" />
            <div className="ct-bild__txt">
              <p className="pincel">Reservierung</p>
              <span>Cantina Tex-Mex · Buchs SG</span>
            </div>
          </aside>

          <div className="ct-inhalt">
            <div className="ct-picado" aria-hidden="true">
              {Array.from({ length: 14 }).map((_, i) => <i key={i} />)}
            </div>

            {/* Personen */}
            <fieldset className="ct-feld">
              <legend>Personen</legend>
              <div className="ct-chips">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button type="button" key={n} aria-pressed={personas === n} className={"ct-chip" + (personas === n ? " is-an" : "")} onClick={() => { setPersonas(n); setMehrPersonen(false) }}>{n}</button>
                ))}
                <button type="button" aria-expanded={mehrPersonen || personas > 10} className={"ct-chip ct-chip--breit" + (personas > 10 ? " is-an" : "")} onClick={() => setMehrPersonen(!mehrPersonen)}>
                  11+
                </button>
              </div>
              {(mehrPersonen || personas > 10) && (
                <div className="ct-chips ct-chips--mehr">
                  {Array.from({ length: 10 }, (_, i) => i + 11).map((n) => (
                    <button type="button" key={n} aria-pressed={personas === n} className={"ct-chip" + (personas === n ? " is-an" : "")} onClick={() => setPersonas(n)}>{n === 20 ? "20+" : n}</button>
                  ))}
                </div>
              )}
              {personas >= 20 && (
                <p className="ct-hinweis">
                  Ab 20 Personen bitte per E-Mail reservieren:{" "}
                  <a href={`mailto:info@cantinatex-mex.ch?subject=Reservierung für mehr als 20 Personen&body=Ich möchte gerne eine Reservierung für mehr als 20 Personen machen.`}>info@cantinatex-mex.ch</a>
                </p>
              )}
            </fieldset>

            {/* Datum */}
            <fieldset className="ct-feld">
              <legend>Datum</legend>
              <div className="ct-tage">
                {ausserhalb && selectedDate && renderTag(selectedDate, 0, true)}
                {tage.map((t, i) => renderTag(t, i))}
                <button type="button" className={"ct-tag ct-tag--kal" + (kalender ? " is-offen" : "")} onClick={() => setKalender(!kalender)} aria-expanded={kalender}>
                  <CalendarDays />
                  <small>Weitere<br />Daten</small>
                </button>
              </div>
              {kalender && (
                <MonatsKalender
                  ausgewaehlt={selectedDate}
                  status={tagStatus}
                  onPick={(d) => {
                    setSelectedDate(d)
                    setKalender(false)
                  }}
                />
              )}
            </fieldset>

            {/* Uhrzeit */}
            <fieldset className="ct-feld">
              <legend>Uhrzeit</legend>
              {!selectedDate ? (
                <p className="ct-leer">Bitte zuerst ein Datum wählen.</p>
              ) : zeitGruppen.length === 0 || availableTimes.length === 0 ? (
                <p className="ct-leer">Für diesen Tag sind keine Zeiten mehr frei. Bitte wählen Sie einen anderen Tag.</p>
              ) : (
                zeitGruppen.map((g) => (
                  <div className="ct-gruppe" key={g.titel}>
                    <span>{g.titel}</span>
                    <div className="ct-chips">
                      {g.zeiten.map((t) => {
                        const frei = availableTimes.includes(t)
                        return (
                          <button
                            type="button"
                            key={t}
                            disabled={!frei}
                            aria-pressed={selectedTime === t}
                            title={frei ? undefined : "Nicht verfügbar"}
                            className={"ct-chip ct-chip--zeit" + (selectedTime === t ? " is-an" : "") + (!frei ? " is-voll" : "")}
                            onClick={() => pickTime(t)}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </fieldset>

            {/* Kontakt */}
            <div className="ct-zwei">
              <label className="ct-feld">
                <span className="ct-lbl">Name</span>
                <input type="text" id="nombre" name="nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" placeholder="Vor- und Nachname" />
              </label>
              <label className="ct-feld">
                <span className="ct-lbl">Telefon</span>
                <input type="tel" id="telefono" name="telefono" required value={telefono} onChange={(e) => setTelefono(e.target.value)} autoComplete="tel" placeholder="+41 …" />
              </label>
            </div>
            <label className="ct-feld">
              <span className="ct-lbl">E-Mail</span>
              <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="Für die Bestätigung" />
            </label>

            {error && <div className="ct-fehler"><AlertCircle />{error}</div>}

            {reservations.length > 0 && (
              <button type="button" onClick={() => setShowPreviousReservationsModal(true)} className="ct-frueher">
                <History /> Meine vorherigen Reservierungen
              </button>
            )}

            {/* Resumen + botón */}
            <div className="ct-fuss">
              <div className="ct-summe">
                {selectedDate ? (
                  <>
                    <b>{datumLang}{selectedTime ? ` · ${selectedTime}` : ""}</b>
                    <span>
                      {personas ? `${personas} ${personas === 1 ? "Person" : "Personen"}` : "Personen wählen"}
                      {!selectedTime ? " · Uhrzeit wählen" : ""}
                    </span>
                  </>
                ) : (
                  <span>Datum, Uhrzeit und Personen wählen</span>
                )}
              </div>
              <button type="submit" className="btn-brocha ct-los" disabled={!fertig}>
                Reservieren
              </button>
            </div>
          </div>
        </form>
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

      {/* Modal de error para horarios completos */}
      {showErrorModal && (
        <ErrorModal
          message={errorMessage}
          nextTime={nextAvailableTime}
          onClose={() => setShowErrorModal(false)}
          onSelectTime={(time) => {
            setSelectedTime(time)
            setNextAvailableTime(null)
            setShowErrorModal(false)
          }}
        />
      )}
    </div>
  )
}

export default ReservationForm
