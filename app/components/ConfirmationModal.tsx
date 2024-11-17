import React from "react";

interface ConfirmationModalProps {
  details: {
    fecha: string;
    hora: string;
    personas: string;
    nombre: string;
    telefono: string;
    email: string;
  };
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ details, onClose }) => {
  const handleAddToCalendar = () => {
    const [day, month, year] = details.fecha.split(".");
    const [hour, minute] = details.hora.split(":");
    const startDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Duración de 2 horas

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:Reservierung bei Cantina TexMex
DESCRIPTION:Reservierung für ${details.personas} Personen
LOCATION:Bahnhofstrasse 46, 9475 Sevelen
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reservation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadVCard = () => {
    fetch("https://reservierung.cantinatexmex.ch/logo3-copia1.png")
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64data = (reader.result as string).split(",")[1];

          const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Cantina TexMex
ORG:Cantina TexMex
ADR:;;Bahnhofstrasse 46;Sevelen;;9475;Switzerland
TEL:081 750 19 11
EMAIL:info@cantinatexmex.ch
URL:https://cantinatexmex.ch
PHOTO;ENCODING=b;TYPE=JPEG:${base64data}
END:VCARD`;

          const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "Cantina_TexMex.vcf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error al cargar la imagen:", error);
        // Crear vCard sin la imagen
        const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Cantina TexMex
ORG:Cantina TexMex
ADR:;;Bahnhofstrasse 46;Sevelen;;9475;Switzerland
TEL:081 750 19 11
EMAIL:info@cantinatexmex.ch
URL:https://cantinatexmex.ch
END:VCARD`;

        const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Cantina_TexMex.vcf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const handleCloseModal = () => {
    onClose();
    window.location.href = "https://www.cantinatexmex.ch"; // Navegar al cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500 text-4xl hover:text-gray-700 font-bold"
        >
          &times;
        </button>
        <div className="flex justify-center mb-4">
          {/* Icono de checkmark */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-center mb-4">Reservierung bestätigt!</h2>
        <div className="space-y-2">
          <p>
            <strong>Datum:</strong> {details.fecha}
          </p>
          <p>
            <strong>Uhrzeit:</strong> {details.hora}
          </p>
          <p>
            <strong>Personen:</strong> {details.personas}
          </p>
          <p>
            <strong>Name:</strong> {details.nombre}
          </p>
          <p>
            <strong>Telefon:</strong> {details.telefono}
          </p>
          <p>
            <strong>E-Mail:</strong> {details.email}
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleAddToCalendar}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Zum Kalender hinzufügen
          </button>
          <button
            onClick={handleDownloadVCard}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Visitenkarte herunterladen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
