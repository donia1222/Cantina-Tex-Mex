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
    return <p>Lädt aktuelle Nachricht...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="current-message"
      dangerouslySetInnerHTML={{ __html: message }}
    ></div>
  );
};

export default CurrentMessage;
