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
    src: "/e0d952bc-12c4-4425-8826-ee950532d457.mp4",
    poster: "/videos/video1-poster.jpg",
    description: "Primer video al estilo TikTok",
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
    <div className="bg-gray-900 bg-opacity-60 flex items-center justify-center p-4 mb-10 pt-20">
      <div className="relative w-full max-w-[500px] h-full max-h-[calc(80vh-80px)] aspect-[9/16] lg:aspect-video lg:max-w-[900px] lg:max-h-[600px] ring-2 ring-gray-400 ring-opacity-50 rounded-lg">
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
        

        <TikTokVideose />
      </div>
    </div>
  );
};

export default TikTokVideos;

