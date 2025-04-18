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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-center text-gray-500">Lädt aktuelle Nachricht...</p>
      </div>
    );
  }


  return (
    <div
      className="current-message rounded-lg p-4 text-gray-300  max-w-sm mx-auto mt-5"
      dangerouslySetInnerHTML={{ __html: message }}
    ></div>
  );
};

export default CurrentMessage;
