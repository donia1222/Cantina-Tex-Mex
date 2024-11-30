'use client'

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, Volume2, VolumeX } from 'lucide-react';
import TikTokVideose from "~/components/Blocks/TickTock/TikTokButtom";

interface Video {
  id: string;
  src: string;
  poster: string;
  description: string;
}

const initialVideos: Video[] = [
  {
    id: "1",
    src: "/video1.mp4",
    poster: "/videos/video1-poster.jpg",
    description: "Primer video al estilo TikTok",
  },
  {
    id: "2",
    src: "/video2.mp4",
    poster: "/videos/video2-poster.jpg",
    description: "Segundo video increíble",
  },
  {
    id: "3",
    src: "/video3.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Tercer video entretenido",
  },
  {
    id: "4",
    src: "/video4.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Cuarto video entretenido",
  },
  {
    id: "5",
    src: "/video5.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Quinto video entretenido",
  },
  {
    id: "6",
    src: "/video6.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Sexto video entretenido",
  },
  {
    id: "7",
    src: "/video7.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Séptimo video entretenido",
  },
  {
    id: "8",
    src: "/video8.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Octavo video entretenido",
  },
  {
    id: "9",
    src: "/video9.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Noveno video entretenido",
  },
  {
    id: "10",
    src: "/video10.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Décimo video entretenido",
  },
  {
    id: "11",
    src: "/video11.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Undécimo video entretenido",
  },
  {
    id: "12",
    src: "/video12.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Duodécimo video entretenido",
  },
  {
    id: "13",
    src: "/video13.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Decimotercer video entretenido",
  },
];

const TikTokVideos: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [videos, setVideos] = useState(initialVideos);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
        video.muted = isMuted;
      }
    });
  }, [activeIndex, isMuted]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleShuffle = () => {
    setVideos(prevVideos => {
      const shuffled = [...prevVideos];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setActiveIndex(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-gray-900 bg-opacity-60 flex items-center justify-center p-5">
      <div className="relative w-full max-w-[500px] h-full max-h-[calc(100vh-80px)] aspect-[9/16] lg:aspect-video lg:max-w-[900px] lg:max-h-[600px]">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover rounded-lg"
              src={video.src}
              poster={video.poster}
              controls={false}
              muted={isMuted}
              loop
              playsInline
              aria-label={`Video ${index + 1}: ${video.description}`}
            ></video>
          </div>
        ))}
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 md:flex-row md:right-0 md:left-0 md:top-auto md:bottom-4 md:justify-center">
          <button
            className="p-2 bg-gray-500 bg-opacity-90 hover:bg-opacity-90 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            onClick={handlePrev}
            aria-label="Video anterior"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            className="p-2 bg-gray-500 bg-opacity-90 hover:bg-opacity-90 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            onClick={handleShuffle}
            aria-label="Reproducir aleatoriamente"
          >
            <Shuffle className="h-6 w-6 text-white" />
          </button>
          <button
            className="p-2 bg-gray-500 bg-opacity-90 hover:bg-opacity-90 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            onClick={handleNext}
            aria-label="Siguiente video"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          <button
            className={`p-2 bg-gray-500 bg-opacity-90 hover:bg-opacity-90 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
              isMuted ? 'text-red-500' : 'text-green-500'
            }`}
            onClick={toggleMute}
            aria-label={isMuted ? "Activar sonido" : "Desactivar sonido"}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </button>
        </div>
        <TikTokVideose />
      </div>
    </div>
  );
};

export default TikTokVideos;

