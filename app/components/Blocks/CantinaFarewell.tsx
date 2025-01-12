// routes/CantinaFarewell.tsx
import React from "react";

export default function CantinaFarewell() {
  return (
    <div className=" bg-gradient-to-br from-yellow-200 via-red-300 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl p-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Liebe Freunde, liebe Gäste
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Nach fast 15 Jahren in Sevelen zieht die Cantina unter neuer Leitung
          nach Buchs.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Wir, Roberto und Andrea Salvador, haben uns mit der Cantina einen Traum
          erfüllt und hart dafür gearbeitet, unseren Gästen ein großartiges
          gastronomisches Erlebnis zu bieten. Wir sind stolz auf das, was wir
          gemeinsam mit viel Schweiß und Tränen, Optimismus und Engagement
          erreicht haben. Und wir sind dankbar für die schöne und intensive Zeit
          in Sevelen.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Aber im Leben bleibt nie alles gleich. Seit unserem unfreiwilligen Umzug
          an die Bahnhofstrasse ist der Cantina Alltag enorm schwierig geworden.
          Es sind zu viele Steine, die uns den Weg versperren.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Wir freuen uns, dass die Cantina in Buchs ein tolles, neues Zuhause
          gefunden hat. Roberto, das Herz der Cantina, ist weiterhin mit
          gewohnter Hingabe für Euch da; Andrea als Supporter in der Küche jeweils
          am Wochenende.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Darüber hinaus möchten wir Euch mitteilen, dass die Cantina Bad Rans
          GmbH ihre Tätigkeit einstellen wird. Bis Ende Januar 2025 bleiben wir
          jedoch weiterhin in Sevelen, um Euch mit der gewohnten Qualität zu
          bedienen.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nun sagen wir also <span className="font-bold">Gracias Sevelen</span> und{" "}
          <span className="font-bold">Adios!</span> <br />
          <span className="font-bold">Hola Buchs ab März 2025!</span>
        </p>
      </div>
    </div>
  );
}
