// app/routes/index.tsx
import React from "react";
import ReservationForm from "~/components/ReservationForm";
import handleDownloadVCard from '~/utils/downloadVCard';

const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <a href="https://cantinatexmex.ch" className="flex items-center mb-6" aria-label="Zur Startseite">
        {/* Icono de Inicio */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-xl font-semibold text-indigo-600">Cantina TexMex</span>
      </a>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Reservieren Sie Ihren Tisch</h1>
        <ReservationForm />
      </div>

      {/* Footer */}
      <footer className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
        <img src="/logo3-copia1-1.png" alt="Cantina Tex-Mex" className="mx-auto mb-2 h-16" />
        <p className="font-semibold">Cantina Tex-Mex</p>
        <p>Bahnhofstrasse 46, 9475 Sevelen</p>
        <p className="mt-2">
          <a href="tel:0817501911" className="text-blue-500 hover:underline">081 750 19 11</a>
        </p>
        <p className="mt-2">
          <a href="mailto:info@cantinatexmex.ch" className="text-blue-500 hover:underline">info@cantinatexmex.ch</a>
        </p>
        <button
          id="downloadVCard"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          onClick={handleDownloadVCard} // Asignar la función de descarga
        >
          Visitenkarte herunterladen
        </button>
      </footer>
    </div>
  );
};

export default IndexPage;
