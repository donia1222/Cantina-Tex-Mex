// app/routes/Menu.tsx


import HeaderDrin from '~/components/Header/HeaderDrin'; 
import Drinksblock from '~/components/Blocks/Drinksblock'; 
import BannerDrinks from '~/components/Banner/BannerDrinks'; 


export default function Menu() {

  // Variants para las animaciones de entrada de las tarjetas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
  };

  return (
    <div className=" bg-gray-900 bg-opacity-80 text-red-500 p-2 rounded-lg">
      <HeaderDrin />
      <Drinksblock />

      <BannerDrinks />

    </div>
  );
}
