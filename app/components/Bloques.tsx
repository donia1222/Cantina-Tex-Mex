import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

export default function ReservationForm() {
  useEffect(() => {
    // Simula el equivalente de `DOMContentLoaded` en React
    const form = document.getElementById("reservationForm") as HTMLFormElement;
    const fechaInput = document.getElementById("fecha") as HTMLInputElement;
    const horaSelect = document.getElementById("hora") as HTMLSelectElement;
    const modal = document.getElementById("confirmationModal") as HTMLElement;
    const closeButton = document.getElementById("closeModal") as HTMLElement;
    const reservationDetails = document.getElementById("reservationDetails") as HTMLElement;
    const addToCalendarButton = document.getElementById("addToCalendar") as HTMLElement;
    const downloadVCardButton = document.getElementById("downloadVCard") as HTMLElement;

    function updateRestaurantStatus() {
      // Tu lógica original para el estado del restaurante
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;

      const statusIndicator = document.querySelector('.status-indicator') as HTMLElement;
      const statusText = document.querySelector('.status-text') as HTMLElement;

      let status = 'closed';
      let nextOpeningTime = '';

      if (day >= 2 && day <= 6) { // Martes a Sábado
        if (day === 6 && currentTime >= 20 * 60) { // Sábado después de las 20:00
          status = 'closed';
          nextOpeningTime = 'Dienstag 18:00';
        } else if (day === 4 || day === 5) { // Jueves y Viernes
          if (currentTime >= 11 * 60 + 30 && currentTime < 13 * 60) {
            status = 'open';
          } else if (currentTime >= 13 * 60 && currentTime < 13 * 60 + 30) {
            status = 'closing-soon';
            nextOpeningTime = '18:00';
          } else if (currentTime >= 18 * 60 && currentTime < 20 * 60) {
            status = 'open';
          } else if (currentTime >= 19 * 60 + 30 && currentTime < 20 * 60) {
            status = 'closing-soon';
          } else if (currentTime >= 11 * 60 && currentTime < 11 * 60 + 30) {
            status = 'opening-soon';
            nextOpeningTime = '11:30';
          } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
            status = 'opening-soon';
            nextOpeningTime = '18:00';
          } else {
            nextOpeningTime = (currentTime < 11 * 60 + 30) ? '11:30' : '18:00';
          }
        } else { // Martes, Miércoles, Sábado (antes de las 20:00)
          if (currentTime >= 18 * 60 && currentTime < 20 * 60) {
            status = 'open';
          } else if (currentTime >= 19 * 60 + 30 && currentTime < 20 * 60) {
            status = 'closing-soon';
          } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
            status = 'opening-soon';
            nextOpeningTime = '18:00';
          } else {
            nextOpeningTime = '18:00';
          }
        }
      } else { // Domingo y Lunes
        nextOpeningTime = 'Dienstag 18:00';
      }

      if (statusIndicator) statusIndicator.className = 'status-indicator status-' + status;
      if (statusText) {
        switch (status) {
          case 'open':
            statusText.textContent = 'Geöffnet';
            break;
          case 'closing-soon':
            statusText.textContent = 'Schließt bald (20:00)';
            break;
          case 'opening-soon':
            statusText.textContent = `Öffnet bald (${nextOpeningTime})`;
            break;
          default:
            statusText.textContent = `Wir öffnen am: ${nextOpeningTime}`;
        }
      }
    }

    // Actualiza el estado cada minuto
    updateRestaurantStatus();
    const interval = setInterval(updateRestaurantStatus, 60000);

    // Maneja el envío del formulario
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simula el envío del formulario
      alert("Reserva realizada con éxito!");
    });

    // Inicializa flatpickr
    flatpickr(fechaInput, {
      dateFormat: "d.m.Y",
      minDate: "today",
    });

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      {/* Estado del restaurante */}
      <div className="p-4 bg-gray-800 text-white rounded mb-4">
        <h2 className="text-2xl font-bold">Estado del Restaurante:</h2>
        <p className="text-lg mt-2 status-text"></p>
        <div className="status-indicator"></div>
      </div>

      {/* Formulario de reserva */}
      <form id="reservationForm" className="space-y-4 bg-white p-6 rounded shadow">
        <label htmlFor="fecha" className="block text-gray-700 font-medium">
          Fecha:
        </label>
        <input
          type="text"
          id="fecha"
          className="w-full border rounded px-3 py-2"
          required
        />

        <label htmlFor="hora" className="block text-gray-700 font-medium">
          Hora:
        </label>
        <select id="hora" className="w-full border rounded px-3 py-2" required>
          <option value="">Seleccione una hora</option>
          {/* Agrega las opciones de hora aquí */}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Reservar
        </button>
      </form>

      {/* Modal de confirmación (oculto por defecto) */}
      <div id="confirmationModal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow">
          <button id="closeModal" className="text-gray-700">&times;</button>
          <div id="reservationDetails"></div>
        </div>
      </div>
    </div>
  );
}
