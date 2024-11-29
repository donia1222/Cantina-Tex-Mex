import React, { useEffect, useRef, useState } from "react";

interface Video {
  id: string;
  src: string;
  poster: string;
  description: string;
}

const videos: Video[] = [

  {
    id: "3",
    src: "/video3.mp4",
    poster: "/videos/video3-poster.jpg",
    description: "Tercer video entretenido",
  },
];

const TikTokVideos: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex(
              (video) => video === entry.target
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll bg-gray-900 bg-opacity-60">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="snap-start h-screen w-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-[500px] h-full max-h-[calc(100vh-80px)] aspect-[9/16]">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              src={video.src}
              poster={video.poster}
              controls={false}
              muted
              loop
              playsInline
              aria-label={`Video ${index + 1}: ${video.description}`}
            ></video>
 
          </div>
        </div>
        
      ))}
      
    </div>
  );
};

export default TikTokVideos;

