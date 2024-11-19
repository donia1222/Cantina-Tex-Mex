import React from "react";
import ReservationForm from "~/components/Rerserve/ReservationForm";
import AnimatedGradientText from '~/components/AnimatedGradient/AnimatedGradientTextdos';
import CurrentMessage from '~/components/Rerserve/CurrentMessage';
import ContinuousScroll from '~/components/Rerserve/Continuous-Scroll'; 



const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-4">
        
        {/* Header Section */}
        <div className="flex justify-center items-center mt-5 ">
          <div className="text-3xl sm:text-4xl md:text-4xl font-poppins font-bold ml-4">
            <span className="bg-gradient-to-r from-gray-200 via-gray-500 to-red-500 text-transparent bg-clip-text font-poppins">
              Reservierung
            </span>
          </div>
        </div>


        <CurrentMessage />

        <ReservationForm />
        <ContinuousScroll />

      </div>

      {/* Footer (if any) */}
    </div>
  );
};

export default IndexPage;
