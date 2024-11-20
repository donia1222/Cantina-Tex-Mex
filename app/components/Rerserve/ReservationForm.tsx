// app/components/ReservationForm.tsx
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";
import ConfirmationModal from "./ConfirmationModal";
import PreviousReservationsModal from "./PreviousReservationsModal";
import { Calendar, Clock, Users, User, Phone, Mail } from 'lucide-react';

interface BlockedDates {
  [date: string]: string[];
}

interface Reservation {
  fecha: string;
  hora: string;
  personas: number;
  nombre: string;
  telefono: string;
  email: string;
  timestamp: number; // Para ordenar las reservas por fecha
}

interface TimeOption {
  time: string;
  blocked: boolean;
}

const ReservationForm: React.FC = () => {
  const [blockedDates, setBlockedDates] = useState<BlockedDates>({});
  const [availableTimes, setAvailableTimes] = useState<TimeOption[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPreviousReservationsModal, setShowPreviousReservationsModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Estado para almacenar todas las reservas
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Función para formatear la fecha a YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Función para parsear una cadena de fecha "YYYY-MM-DD" como fecha local
  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Función para obtener las fechas bloqueadas
  const fetchBlockedDates = async () => {
    try {
      console.log("Fetching blocked dates...");
      const res = await fetch("https://reservierung.cantinatexmex.ch/get_blocked_dates.php");
      console.log("Response status:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const text = await res.text();
      console.log("Raw response text:", text);
      const data = JSON.parse(text);
      console.log("Parsed blocked dates data:", data);
      setBlockedDates(data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching blocked dates:", error.message || error);
      setError(`Error al cargar las fechas bloqueadas: ${error.message || 'Desconocido'}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedDates();

    // Cargar reservas almacenadas desde localStorage
    const storedReservations = localStorage.getItem("reservaciones");
    if (storedReservations) {
      try {
        const parsedReservations: Reservation[] = JSON.parse(storedReservations);
        setReservations(parsedReservations);
        if (parsedReservations.length > 0) {
          // Obtener el nombre de la última reserva para el saludo
          const lastReservation = parsedReservations[parsedReservations.length - 1];
          setNombre(lastReservation.nombre);
          setTelefono(lastReservation.telefono);
          setEmail(lastReservation.email);
        }
      } catch (e) {
        console.error("Error parsing reservations from localStorage:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      console.log("Selected date changed:", selectedDate);
      const dateString = formatDate(selectedDate);
      fetchAvailableTimes(dateString);
    } else {
      console.log("No date selected.");
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  const fetchAvailableTimes = async (date: string) => {
    try {
      console.log("Fetching available times for:", date);
      const day = new Date(date).getDay();

      let allTimes: string[] = [];

      if (day === 2 || day === 3 || day === 6) { // Martes (2), Miércoles (3), Sábado (6)
        allTimes = ["18:00", "18:30", "19:00", "19:30", "20:00"];
      } else if (day === 4 || day === 5) { // Jueves (4), Viernes (5)
        allTimes = [
          "11:30",
          "12:00",
          "12:30",
          "13:00",
          "18:00",
          "18:30",
          "19:00",
          "19:30",
          "20:00",
        ];
      }

      const blockedTimes = blockedDates[date] || [];

      // Crear una lista de objetos TimeOption
      const timesWithStatus: TimeOption[] = allTimes.map((time) => ({
        time,
        blocked: blockedTimes.includes(time),
      }));

      console.log("Times with status:", timesWithStatus);
      setAvailableTimes(timesWithStatus);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Resetear errores anteriores

    console.log("Form submitted.");
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validar si la cantidad de personas es mayor a 14
    const personas = parseInt(formData.get("personas") as string, 10);
    if (personas >= 15) {
      alert("Ab 15 Personen bitte telefonisch reservieren: 081 750 19 11");
      return;
    }

    console.log("Sending reservation data to backend...");

    try {
      const response = await fetch(
        "https://reservierung.cantinatexmex.ch/enviar_confirmacion.php",
        {
          method: "POST",
          body: formData,
          // Asegúrate de que las credenciales estén manejadas correctamente si es necesario
          // credentials: 'include', 
        }
      );

      console.log("Response status:", response.status);

      // Verifica si la respuesta es JSON válida
      const text = await response.text();
      console.log("Raw response text:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Respuesta del servidor no es JSON válido.");
      }

      console.log("Parsed backend response:", result);

      if (response.ok && result.success) {
        // Crear un objeto de reserva con los detalles y un timestamp
        const newReservation: Reservation = {
          fecha: formData.get("fecha") as string,
          hora: formData.get("hora") as string,
          personas: parseInt(formData.get("personas") as string, 10),
          nombre: formData.get("nombre") as string,
          telefono: formData.get("telefono") as string,
          email: formData.get("email") as string,
          timestamp: Date.now(),
        };

        // Actualizar el arreglo de reservas
        const updatedReservations = [...reservations, newReservation];
        setReservations(updatedReservations);

        // Guardar el arreglo actualizado en localStorage
        localStorage.setItem("reservaciones", JSON.stringify(updatedReservations));

        // Mostrar modal de confirmación
        setReservationDetails(newReservation);
        setShowModal(true);

        // Actualizar los campos del formulario con los datos de la reserva
        setNombre(newReservation.nombre);
        setTelefono(newReservation.telefono);
        setEmail(newReservation.email);
      } else {
        throw new Error(result.message || "Error al procesar la reserva.");
      }
    } catch (err) {
      console.error("Error al enviar la reserva:", err);
      setError(
        "Hubo un problema al enviar la reserva. Por favor, intenta nuevamente más tarde."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Fecha */}
            <div>
              <div className="flex items-center mb-1">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <label
                  htmlFor="fecha"
                  className="block text-lg font-medium text-gray-200"
                >
                  Datum
                </label>
              </div>
              <Flatpickr
                id="fecha"
                name="fecha"
                value={selectedDate || undefined} // Manejar null correctamente
                onChange={(dates: Date[]) => {
                  console.log("Selected date:", dates[0]);
                  setSelectedDate(dates[0] || null);
                }}
                options={{
                  dateFormat: "d.m.Y",
                  minDate: "today",
                  disable: [
                    // Deshabilitar Domingo (0) y Lunes (1)
                    (date: Date) => [0, 1].includes(date.getDay()),
                    // Eliminar la deshabilitación de fechas basadas en blockedDates
                    // ...Object.keys(blockedDates).map((dateStr) => parseLocalDate(dateStr))
                  ],
                  locale: {
                    firstDayOfWeek: 1,
                    weekdays: {
                      shorthand: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                      longhand: [
                        "Sonntag",
                        "Montag",
                        "Dienstag",
                        "Mittwoch",
                        "Donnerstag",
                        "Freitag",
                        "Samstag",
                      ],
                    },
                    months: {
                      shorthand: [
                        "Jan",
                        "Feb",
                        "Mär",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Dez",
                      ],
                      longhand: [
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
                      ],
                    },
                  },
                }}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="TT.MM.JJJJ"
              />
            </div>

            {/* Campo de Hora */}
            <div>
              <div className="flex items-center mb-1">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <label
                  htmlFor="hora"
                  className="block text-lg font-medium text-gray-200"
                >
                  Uhrzeit
                </label>
              </div>
              <select
                id="hora"
                name="hora"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-no-repeat bg-right-4 bg-center"
              >
                <option value="">Wählen Sie die Uhrzeit</option>
                {availableTimes.length > 0 ? (
                  availableTimes.map(({ time, blocked }) => (
                    <option key={time} value={time} disabled={blocked}>
                      {time} {blocked ? "(Nicht verfügbar)" : ""}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Keine verfügbaren Zeiten
                  </option>
                )}
              </select>
              {/* Opcional: Mostrar mensaje si no hay horas disponibles */}
              {selectedDate && availableTimes.every((opt) => opt.blocked) && (
                <p className="text-sm text-red-500 mt-2">
                  Keine verfügbaren Zeiten an diesem Tag.
                </p>
              )}
            </div>

            {/* Campo de Número de Personas */}
            <div>
              <div className="flex items-center mb-1">
                <Users className="w-5 h-5 text-gray-400 mr-2" />
                <label
                  htmlFor="personas"
                  className="block text-lg font-medium text-gray-200"
                >
                  Anzahl der Personen
                </label>
              </div>
              <select
                id="personas"
                name="personas"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-no-repeat bg-right-4 bg-center"
              >
                <option value="">Wählen Sie die Anzahl der Personen</option>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {/* Mensaje para reservas de 15 o más personas */}
              <p className="text-sm text-gray-300 text-center mt-5">
                Ab 15 Personen bitte telefonisch reservieren{" "}
                <a
                  href="tel:0817501911"
                  className="text-indigo-400 underline"
                >
                  081 750 19 11
                </a>
              </p>
            </div>

            {/* Campo de Nombre */}
            <div>
              <div className="flex items-center mb-1">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <label
                  htmlFor="nombre"
                  className="block text-lg font-medium text-gray-200"
                >
                  Name
                </label>
              </div>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Ihr Name"
              />
            </div>

            {/* Campo de Teléfono */}
            <div>
              <div className="flex items-center mb-1">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <label
                  htmlFor="telefono"
                  className="block text-lg font-medium text-gray-200"
                >
                  Telefon
                </label>
              </div>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Ihre Telefonnummer"
              />
            </div>

            {/* Campo de E-Mail */}
            <div>
              <div className="flex items-center mb-1">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-200"
                >
                  E-Mail
                </label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white"
                placeholder="Ihre E-Mail-Adresse"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              Reservierung bestätigen
            </button>
          </form>
        </>
      )}

      {reservations.length > 0 && (
        <button
          onClick={() => setShowPreviousReservationsModal(true)}
          className="mt-10 bg-gray-600 text-gray-300 py-1 px-3 rounded hover:bg-gray-900 transition duration-200 text-xs"
        >
          Ver meine vorherigen Reservierungen
        </button>
      )}

      {/* Modal para mostrar reservas anteriores */}
      {showPreviousReservationsModal && (
        <PreviousReservationsModal
          reservations={reservations}
          nombre={nombre} // Pasar el nombre al modal
          onClose={() => setShowPreviousReservationsModal(false)}
        />
      )}

      {/* Modal de confirmación */}
      {showModal && reservationDetails && (
        <ConfirmationModal
          details={reservationDetails}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Mostrar errores si existen */}
      {error && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
