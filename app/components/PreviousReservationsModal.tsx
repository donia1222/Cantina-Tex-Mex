// app/components/PreviousReservationsModal.tsx
import React from "react";

interface Reservation {
  fecha: string;
  hora: string;
  personas: number;
  nombre: string;
  telefono: string;
  email: string;
  timestamp: number;
}

interface Props {
  reservations: Reservation[];
  onClose: () => void;
}

const PreviousReservationsModal: React.FC<Props> = ({ reservations, onClose }) => {
  // Ordenar las reservas por fecha descendente (más recientes primero)
  const sortedReservations = [...reservations].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Meine vorherigen Reservierungen</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto">
          {sortedReservations.length === 0 ? (
            <p>Keine vorherigen Reservierungen gefunden.</p>
          ) : (
            <ul>
              {sortedReservations.map((res, index) => (
                <li key={index} className="mb-4 border-b pb-2">
                  <p><strong>Datum:</strong> {res.fecha}</p>
                  <p><strong>Uhrzeit:</strong> {res.hora}</p>
                  <p><strong>Anzahl der Personen:</strong> {res.personas}</p>
                  <p><strong>Name:</strong> {res.nombre}</p>
                  <p><strong>Telefon:</strong> {res.telefono}</p>
                  <p><strong>E-Mail:</strong> {res.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousReservationsModal;
