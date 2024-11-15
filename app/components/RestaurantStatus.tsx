// app/components/RestaurantStatus.tsx

import React, { useEffect, useState } from 'react';

type Status = 'open' | 'closing-soon' | 'opening-soon' | 'closed';

const RestaurantStatus: React.FC = () => {
  const [status, setStatus] = useState<Status>('closed');
  const [nextOpeningTime, setNextOpeningTime] = useState<string>('');

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes; // Tiempo en minutos

      let currentStatus: Status = 'closed';
      let nextTime = '';

      if (day >= 2 && day <= 6) { // Martes a Sábado
        if (day === 6 && currentTime >= 20 * 60) { // Sábado después de las 20:00
          currentStatus = 'closed';
          nextTime = 'Dienstag 18:00';
        } else if (day === 4 || day === 5) { // Jueves y Viernes
          if (currentTime >= 11 * 60 + 30 && currentTime < 13 * 60) {
            currentStatus = 'open';
          } else if (currentTime >= 13 * 60 && currentTime < 13 * 60 + 30) {
            currentStatus = 'closing-soon';
            nextTime = '18:00';
          } else if (currentTime >= 18 * 60 && currentTime < 20 * 60) {
            currentStatus = 'open';
          } else if (currentTime >= 19 * 60 + 30 && currentTime < 20 * 60) {
            currentStatus = 'closing-soon';
          } else if (currentTime >= 11 * 60 && currentTime < 11 * 60 + 30) {
            currentStatus = 'opening-soon';
            nextTime = '11:30';
          } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
            currentStatus = 'opening-soon';
            nextTime = '18:00';
          } else {
            nextTime = (currentTime < 11 * 60 + 30) ? '11:30' : '18:00';
          }
        } else { // Martes, Miércoles, Sábado (antes de las 20:00)
          if (currentTime >= 18 * 60 && currentTime < 20 * 60) {
            currentStatus = 'open';
          } else if (currentTime >= 19 * 60 + 30 && currentTime < 20 * 60) {
            currentStatus = 'closing-soon';
          } else if (currentTime >= 17 * 60 && currentTime < 18 * 60) {
            currentStatus = 'opening-soon';
            nextTime = '18:00';
          } else {
            nextTime = '18:00';
          }
        }
      } else { // Domingo y Lunes
        nextTime = 'Dienstag 18:00';
      }

      setStatus(currentStatus);
      setNextOpeningTime(nextTime);
    };

    // Actualizar el estado al cargar el componente
    updateStatus();

    // Configurar un intervalo para actualizar el estado cada minuto
    const interval = setInterval(updateStatus, 60000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (status) {
      case 'open':
        return 'Geöffnet';
      case 'closing-soon':
        return 'Schließt bald (20:00)';
      case 'opening-soon':
        return `Öffnet bald (${nextOpeningTime})`;
      case 'closed':
      default:
        return `Wir öffnen am: ${nextOpeningTime}`;
    }
  };

  const getStatusIndicatorClass = () => {
    switch (status) {
      case 'open':
        return 'bg-green-500';
      case 'closing-soon':
        return 'bg-yellow-500';
      case 'opening-soon':
        return 'bg-blue-500';
      case 'closed':
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="mt-4 p-4 bg-white rounded shadow">
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full mr-2 ${getStatusIndicatorClass()}`}></span>
        <span className="text-lg font-semibold">{getStatusText()}</span>
      </div>
    </div>
  );
};

export default RestaurantStatus;
