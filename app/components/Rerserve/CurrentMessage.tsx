import React, { useEffect, useState } from 'react';

const CurrentMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch('https://reservierung.cantinatexmex.ch/current_message.txt');
        if (!response.ok) {
          throw new Error('Nachricht nicht gefunden');
        }
        const text = await response.text();
        setMessage(text);
      } catch (err) {
        console.error('Fehler beim Laden der Nachricht:', err);
        setError('Aktuelle Nachricht konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  // Mientras carga o si no hay aviso, no ocupa sitio (antes dejaba un hueco encima del formulario)
  if (loading || !message.trim()) return null;


  return (
    <div
      className="current-message rounded-2xl p-4 text-gray-200 max-w-xl mx-auto bg-amber-500/10 border border-amber-500/25 text-center"
      dangerouslySetInnerHTML={{ __html: message }}
    ></div>
  );
};

export default CurrentMessage;
