// app/components/AnimatedGradientText.tsx

import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

type AnimatedGradientTextProps = {
  texts: string[];
  className?: string;
};

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  texts,
  className = '',
}) => {
  const [text] = useTypewriter({
    words: texts,
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className={`text-4xl sm:text-5xl md:text-5xl  font-poppins font-bold ml-4 ${className}`}>
      <span className="bg-gradient-to-r from-gray-200 via-gray-500 to-red-500 text-transparent bg-clip-text  font-poppins ">
        {text}
      </span>
      <Cursor cursorColor="#fff" />
      
    </div>
  );
};

export default AnimatedGradientText;
