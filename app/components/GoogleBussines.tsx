// components/Resenas.tsx

import { FC } from "react";

const Resenas: FC = () => {
  const handleNavigate = () => {
    window.location.href = "https://www.google.com/search?client=safari&rls=en&q=cantina+sevelen&ie=UTF-8&oe=UTF-8#";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md w-80">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold ">
          Bewertungen auf My Google Business
        </h3>
        <button
          onClick={handleNavigate}
          className="text-blue-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-3xl font-bold">4,7</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-yellow-400 ml-1"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="text-gray-300 ml-2">(469)</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
        <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
        <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
        <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
        <div className="flex-2 h-6 bg-yellow-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Resenas;
