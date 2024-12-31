import { useEffect, useRef } from 'react';
import { Link } from '@remix-run/react';

interface TikTokEmbedProps {
  url: string;
}

export function TikTokEmbed({ url }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, [url]);

  return (
    <div ref={containerRef}>
      <blockquote 
        className="tiktok-embed" 
        cite={url} 
        data-video-id={url.split('/video/')[1].split('?')[0]}
      >
        <section>
          <Link to={url}>
            {url}
          </Link>
        </section>
      </blockquote>
    </div>
  );
}