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

  // Rediseño visual 20/11/2026 (Lweb): mismos datos y mismos botones, con el papel crema
  // y el papel picado del formulario. Copia anterior: scratchpad cantina-ConfirmationModal.antes.tsx
  return (
    <div className="ct-overlay" role="dialog" aria-modal="true" aria-labelledby="ct-ok-titel">
      <div className="ct-ok">
        <div className="ct-picado ct-picado--ok" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
        </div>
        <button onClick={handleCloseModal} className="ct-ok__zu" aria-label="Schliessen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div className="ct-ok__haken" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h2 id="ct-ok-titel" className="pincel ct-ok__titel">Reservierung <span>bestätigt!</span></h2>
        <p className="ct-ok__sub">¡Gracias, {details.nombre}! Wir freuen uns auf Ihren Besuch.</p>

        <div className="ct-ticket">
          <div className="ct-ticket__haupt">
            <div><span>Datum</span><b>{details.fecha}</b></div>
            <div><span>Uhrzeit</span><b>{details.hora}</b></div>
            <div><span>Personen</span><b>{details.personas}</b></div>
          </div>
          <dl className="ct-ticket__daten">
            <dt>Name</dt><dd>{details.nombre}</dd>
            <dt>Telefon</dt><dd>{details.telefono}</dd>
            <dt>E-Mail</dt><dd>{details.email}</dd>
          </dl>
        </div>

        <div className="ct-ok__knoepfe">
          <button onClick={handleAddToCalendar} className="ct-btn ct-btn--rot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="3" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4M12 13v5M9.5 15.5h5" /></svg>
            Zum Kalender hinzufügen
          </button>
          <button onClick={handleDownloadVCard} className="ct-btn ct-btn--linie">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="3" /><circle cx="8.5" cy="11" r="2" /><path d="M5.5 16c.6-1.5 1.7-2.2 3-2.2s2.4.7 3 2.2M14.5 10h4M14.5 13.5h3" /></svg>
            Visitenkarte herunterladen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
