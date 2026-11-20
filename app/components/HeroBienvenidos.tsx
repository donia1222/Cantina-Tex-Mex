import { Link } from "@remix-run/react"
import { Clock, MapPin, Star } from "lucide-react"
import Picado from "~/components/Picado"

/*
 * Hero fijo (20/11/2026): sustituye al paseo interactivo con el scroll (HeroReise.tsx, que sigue
 * en el repo por si se quiere volver). Una sola foto de la sala, enmarcada en papel crema como el
 * resto de la web, con el «¡Bienvenidos!» de pincel y los dos botones.
 */
export default function HeroBienvenidos() {
  return (
    <section className="relative px-3 md:px-4 pt-[84px] md:pt-24" aria-label="Willkommen in der Cantina">
      {/* Sin tarjeta blanca alrededor (20/11/2026): la foto va directamente sobre el fondo suave, con las banderitas encima. */}
      <div className="relative max-w-6xl mx-auto pt-[44px]">
        <Picado n={22} />

        <div className="relative overflow-hidden rounded-[24px] md:rounded-[28px] h-[68svh] min-h-[460px] max-h-[720px] md:h-[min(72vh,640px)] shadow-[0_26px_60px_-30px_rgba(110,60,20,0.55)]">
          <img
            src="/hero/1.webp"
            alt="Der Gastraum der Cantina Tex-Mex mit Pflanzen, Lampions und Bar"
            className="absolute inset-0 w-full h-full object-cover object-[50%_45%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

          <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-5 pb-9 md:pb-14">
            <p className="text-[12px] md:text-sm font-extrabold uppercase tracking-[0.3em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ color: "#fde68a" }}>
              Cantina Tex-Mex · Buchs SG
            </p>
            <h1 className="pincel mt-3 -rotate-3 text-[2.55rem] leading-none sm:text-[3.4rem] md:text-[5.2rem]">
              <span className="text-white">¡Bien</span><span className="text-amber-400">venidos!</span>
              <span className="sr-only"> Cantina Tex-Mex in Buchs: authentische mexikanische Küche und exotische Cocktails</span>
            </h1>
            <span className="pincel-raya mt-3 w-36 -rotate-3 md:w-60" aria-hidden="true" />
            <p className="mt-5 max-w-xl text-[15px] md:text-lg font-semibold text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Authentische mexikanische Küche, handgemixte Cocktails und viel Ambiente im Herzen von Buchs.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3">
              <Link to="/reservierung" className="btn-brocha btn-brocha--gross">Tisch reservieren</Link>
              <Link to="/menu" className="btn-brocha btn-brocha--gelb">Speisekarte</Link>
            </div>
          </div>
        </div>

        {/* Tira de datos rápidos bajo la foto */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-3 md:mt-4">
          {[
            { icon: Clock, farbe: "papel-icon--gruen", titel: "Di – Sa ab 18:00", text: "Mi – Fr auch mittags 11:30 – 13:30" },
            { icon: MapPin, farbe: "papel-icon--rot", titel: "Bahnhofstrasse 40", text: "9470 Buchs SG" },
            { icon: Star, farbe: "papel-icon--gelb", titel: "4.7 auf Google", text: "Danke an unsere Gäste!" },
          ].map((x) => (
            <div key={x.titel} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-[0_0_0_1.5px_rgba(110,60,20,0.08)]">
              <div className={`papel-icon ${x.farbe} w-11 h-11 flex-shrink-0`}><x.icon className="w-5 h-5" /></div>
              <div className="min-w-0">
                <p className="font-extrabold text-[15px] text-[#1d1410] leading-tight">{x.titel}</p>
                <p className="text-[13px] text-[#6b5a4c]">{x.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
