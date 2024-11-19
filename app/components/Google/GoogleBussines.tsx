'use client'

import { FC, useEffect, useRef, useState } from "react";

const Resenas: FC = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const animateCount = () => {
      const start = 0;
      const end = 470;
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCount();
          if (observerRef.current && countRef.current) {
            observerRef.current.unobserve(countRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observerRef.current.observe(countRef.current);
    }

    return () => {
      if (observerRef.current && countRef.current) {
        observerRef.current.unobserve(countRef.current);
      }
    };
  }, []);

  const handleNavigate = () => {
    window.open("https://www.google.com/search?q=cantina+sevelen#lrd=0x479b3f3e8caa0b2b:0x4d0d3f7def66e0cc,1,,,", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md w-80">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">
          Bewertungen auf Google Business
        </h3>
        <button
          onClick={handleNavigate}
          className="text-blue-500 hover:text-gray-300 transition-colors"
          aria-label="View Google Business reviews"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-3xl font-bold text-white">4,7</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-yellow-400 ml-1"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span ref={countRef} className="text-gray-300 ml-2" aria-live="polite">({count})</span>
      </div>

      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default Resenas;