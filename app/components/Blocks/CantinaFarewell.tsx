// routes/CantinaFarewell.tsx
import React from "react";

export default function CantinaFarewell() {
  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Liebe Freunde, liebe Gäste
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Nach fast 15 Jahren in Sevelen zieht die Cantina unter neuer Leitung
          nach Buchs.
        </p>
     
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Wir freuen uns, dass die Cantina in Buchs ein tolles, neues Zuhause
          gefunden hat. Roberto, das Herz der Cantina, ist weiterhin mit
          gewohnter Hingabe für Euch da; Andrea als Supporter in der Küche jeweils
          am Wochenende.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nun sagen wir also <span className="font-bold">Gracias Sevelen</span> und{" "}
          <span className="font-bold">Adios!</span> <br />
          <span className="font-bold">Hola Buchs ab 20  März 2025!</span>
        </p>
      </div>
    </div>
  );
}
