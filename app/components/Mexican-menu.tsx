"use client"

import type React from "react"

interface MenuOption {
  name: string
}

interface MenuProps {
  restaurantName: string
  menuTitle: string
  hours?: string
  appetizers: MenuOption[]
  menus: {
    title: string
    description: string
    price: string
  }[]
  footerText?: string[]
}

export const MexicanMenu: React.FC<MenuProps> = ({
  restaurantName = "La Cantina Mexicana",
  menuTitle = "Tagesmenü",
  hours = "Mittwoch bis Freitag | 11:30 - 13:30 Uhr",
  appetizers = [
    { name: "Blumenkohlsuppe" },
    { name: "Nachos Cheese" },
    { name: "Tagessalat" },
    { name: "Chips mit Sauce zum Dippen" },
  ],
  menus = [
    {
      title: "Menü ",
      description:
        "Unser klassisches Menü bietet traditionelle mexikanische Gerichte mit authentischen Gewürzen und Zutaten. Perfekt für Liebhaber der mexikanischen Küche, die den vollen Geschmack und die Würze genießen möchten.",
      price: "Fr. 19.50",
    },
    {
      title: "Vegetarisches Menü",
      description:
        "Unser vegetarisches Menü vereint frische, saisonale Zutaten zu köstlichen fleischlosen Gerichten. Kreative Kombinationen und traditionelle mexikanische Aromen sorgen für ein vollwertiges Geschmackserlebnis ohne tierische Produkte.",
      price: "Fr. 18.50",
    },
    {
      title: "Spezialmenü",
      description:
        "Unser Spezialmenü präsentiert exklusive Kreationen unseres Küchenchefs mit erlesenen Zutaten und innovativen Zubereitungsmethoden. Eine Fusion aus traditioneller mexikanischer Küche und modernen kulinarischen Trends.",
      price: "Fr. 28.50",
    },
  ],
  footerText = ["Preise inklusive MwSt."],
}) => {
  return (
    <div className="max-w-7xl mx-auto p-8 text-[#264653] leading-relaxed font-['Montserrat',sans-serif]">
      <header className="text-center mb-6 relative mt-20">
        <h1 className="font-['Playfair_Display',serif] text-5xl text-[#e63946] mb-2 shadow-sm">{restaurantName}</h1>
        <h2 className="text-2xl font-semibold uppercase tracking-wider text-[#ffffff] mb-4">{menuTitle}</h2>
        {hours && <p className="text-lg font-medium text-[#ebebeb] mt-2">{hours}</p>}
        <div className="w-36 h-[3px] bg-[#e9c46a] mx-auto my-4"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
          >
            <div
              className={`p-6 text-center relative ${
                index === 0 ? "bg-[#e63946]" : index === 1 ? "bg-[#2a9d8f]" : "bg-[#e9c46a]"
              }`}
            >
              <h3 className="text-2xl text-white mb-2">{menu.title}</h3>
              <div className="absolute w-full h-5 bottom-0 left-0 bg-[repeating-linear-gradient(45deg,#e9c46a,#e9c46a_10px,#2a9d8f_10px,#2a9d8f_20px,#e63946_20px,#e63946_30px)]"></div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <h4 className="font-bold text-lg mb-4 text-[#264653] border-b-2 border-[#e9c46a] pb-2 inline-block">
                  Vorspeise nach Wahl
                </h4>
                <div className="flex flex-col gap-3">
                  {appetizers.map((appetizer, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#e9c46a]"></div>
                      <p>{appetizer.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-lg mb-4 text-[#264653] border-b-2 border-[#e9c46a] pb-2 inline-block">
                  Hauptgericht
                </h4>
                <p className="text-sm text-[#264653] mb-6 leading-relaxed">{menu.description}</p>
              </div>

              <div className="mt-4 text-right text-lg font-bold text-[#e63946]">{menu.price}</div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center mt-16 py-8 text-[#264653] opacity-70 text-sm">
        {footerText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </footer>
    </div>
  )
  
}
