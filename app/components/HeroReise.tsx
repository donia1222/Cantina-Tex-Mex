import { useEffect, useRef } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { Link } from "@remix-run/react"
import { ArrowRight } from "lucide-react"

/*
 * Hero interactivo: un paseo de cámara por la Cantina con el scroll, igual en móvil y escritorio.
 * Cada foto se acerca justo hacia donde está la siguiente y se funde en ella:
 *   1 la sala → 2 la mesa con el menú (la barra al fondo) → 3 el jaguar del mural → 4 el cartel del Mittagsmenü.
 * Fotos en public/hero (originales en hero-original/, fuera de la web).
 *
 * Coordenadas en fracciones de cada foto: `entra` es el punto desde el que llega (empieza ampliada `desde` veces y se
 * abre hasta 1) y `sale` el punto hacia el que se acerca al irse (hasta `hasta`).
 */
type Foto = {
  src: string
  alt: string
  ar: number
  /** `cruce`: en qué punto del tramo (0–1) empieza a fundirse encima de la anterior. */
  entra?: { x: number; y: number; desde: number; cruce?: number }
  sale?: { x: number; y: number; hasta: number }
  /** Encuadre horizontal en pantallas estrechas (object-position x). */
  movil?: number
}

const fotos: Foto[] = [
  { src: "/hero/1.webp", alt: "Der Gastraum der Cantina Tex-Mex mit Pflanzen, Lampions und Bar", ar: 4 / 3, sale: { x: 0.5, y: 0.58, hasta: 3.2 } },
  {
    src: "/hero/2.webp",
    alt: "Ein gedeckter Tisch mit der Speisekarte, dahinter die Bar",
    ar: 4 / 3,
    entra: { x: 0.5, y: 0.45, desde: 1.3, cruce: 0.62 },
    sale: { x: 0.594, y: 0.196, hasta: 3.4 },
    movil: 0.56,
  },
  {
    src: "/hero/3.webp",
    alt: "Das Wandbild mit dem Jaguar im Dschungel",
    ar: 4 / 3,
    entra: { x: 0.3, y: 0.27, desde: 1.4 },
    sale: { x: 0.3, y: 0.27, hasta: 1.6 },
    movil: 0.32,
  },
  {
    src: "/hero/4.webp",
    alt: "Eine Frozen Margarita mit Salzrand und Limette, von oben, auf einer bunten mexikanischen Tischdecke mit Nachos und Salsa",
    ar: 16 / 9,
    entra: { x: 0.5, y: 0.47, desde: 2.6 },
    movil: 0.5,
  },
]

// Tramos de scroll (fracción del hero) en los que se pasa de una foto a la siguiente.
// El primero es el más largo: la sala se acerca despacio antes de llegar a la mesa.
const TRAMOS: [number, number][] = [
  [0.05, 0.38],
  [0.44, 0.66],
  [0.72, 0.92],
]

// La foto 4 es la versión sin texto: el título "Lust auf Tex-Mex?" va encima. (Con el cartel antiguo, en
// hero-original/4-con-texto.PNG, poner true para no repetirlo.)
const FOTO4_CON_TEXTO = false

// Cada frase: etiqueta pequeña, parte blanca y parte dorada (como "Lust auf Tex-Mex?").
const textos: ({ etiqueta: string; blanco: string; oro: string } | null)[] = [
  { etiqueta: "Willkommen", blanco: "Ihr Tisch ist", oro: "schon gedeckt" },
  { etiqueta: "Bahnhofstrasse 40 · Buchs", blanco: "Mitten im", oro: "Dschungel" },
  null,
]

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const rango = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
const suave = (t: number) => t * t * (3 - 2 * t)

// Punto de la foto (fracción) → punto de la caja (%), con object-fit: cover y el encuadre dado.
function enCaja(x: number, y: number, ar: number, W: number, H: number, posX: number) {
  const s = Math.max(W / ar, H)
  const dw = ar * s
  const dh = s
  const ox = (W - dw) * posX + x * dw
  const oy = (H - dh) * 0.5 + y * dh
  return `${(ox / W) * 100}% ${(oy / H) * 100}%`
}

export default function HeroReise() {
  const ref = useRef<HTMLElement>(null)
  const capas = useRef<(HTMLImageElement | null)[]>([])
  const intro = useRef<HTMLDivElement>(null)
  const pies = useRef<(HTMLDivElement | null)[]>([])
  const final = useRef<HTMLDivElement>(null)
  const puntos = useRef<(HTMLSpanElement | null)[]>([])
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const pintar = (p: number) => {
    const caja = ref.current?.querySelector<HTMLElement>("[data-escenario]")
    if (!caja) return
    const W = caja.clientWidth
    const H = caja.clientHeight
    const estrecho = W / H < 1
    fotos.forEach((f, i) => {
      const img = capas.current[i]
      if (!img) return
      const posX = estrecho ? f.movil ?? 0.5 : 0.5
      img.style.objectPosition = `${posX * 100}% 50%`
      let escala = 1
      let opacidad = i === 0 ? 1 : 0
      let blur = 0
      let origen = "50% 50%"
      // Llegada: aparece en la segunda mitad del tramo anterior, ampliada, y se abre hasta su tamaño.
      if (i > 0 && f.entra) {
        const [a, b] = TRAMOS[i - 1]
        const t = rango(p, a, b)
        const aparece = suave(rango(t, f.entra.cruce ?? 0.4, 1))
        opacidad = aparece
        blur = (1 - aparece) * 10
        escala = f.entra.desde + (1 - f.entra.desde) * suave(t)
        origen = enCaja(f.entra.x, f.entra.y, f.ar, W, H, posX)
      }
      // Salida: se acerca hacia el punto donde está la siguiente.
      if (f.sale && i < TRAMOS.length) {
        const [a, b] = TRAMOS[i]
        const t = rango(p, a, b)
        if (t > 0) {
          escala = 1 + (f.sale.hasta - 1) * suave(t) * suave(t)
          origen = enCaja(f.sale.x, f.sale.y, f.ar, W, H, posX)
          blur = suave(rango(t, 0.55, 1)) * 6
        }
      }
      img.style.opacity = String(opacidad)
      img.style.transformOrigin = origen
      img.style.transform = `scale(${escala})`
      img.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : "none"
    })
    // Textos: la presentación se va al empezar; cada foto tiene su frase; al final, los botones.
    if (intro.current) {
      const t = rango(p, 0.005, 0.06)
      intro.current.style.opacity = String(1 - t)
    }
    pies.current.forEach((el, i) => {
      if (!el) return
      const llega = TRAMOS[i][1] - 0.04
      const sigue = TRAMOS[i + 1]?.[0] ?? 1
      const v = rango(p, llega, llega + 0.04) * (1 - rango(p, sigue, sigue + 0.04))
      el.style.opacity = String(v)
      el.style.transform = `translateY(${(1 - v) * 16}px)`
    })
    if (final.current) {
      const v = rango(p, 0.88, 0.96)
      final.current.style.opacity = String(v)
      final.current.style.transform = `translateY(${(1 - v) * 24}px)`
      final.current.style.pointerEvents = v > 0.5 ? "auto" : "none"
    }
    const actual = p < TRAMOS[0][1] - 0.1 ? 0 : p < TRAMOS[1][1] - 0.1 ? 1 : p < TRAMOS[2][1] - 0.1 ? 2 : 3
    puntos.current.forEach((d, i) => d?.classList.toggle("is-on", i <= actual))
  }

  useMotionValueEvent(scrollYProgress, "change", pintar)
  useEffect(() => {
    pintar(scrollYProgress.get())
    const r = () => pintar(scrollYProgress.get())
    window.addEventListener("resize", r)
    return () => window.removeEventListener("resize", r)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={ref} className="relative h-[460vh]" aria-label="Ein Rundgang durch die Cantina">
      <div data-escenario className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden rounded-2xl bg-black">
        {fotos.map((f, i) => (
          <img
            key={f.src}
            ref={(el) => (capas.current[i] = el)}
            src={f.src}
            alt={f.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />

        {/* Primera foto sola, sin textos encima. El título queda solo para buscadores y lectores de pantalla. */}
        <h1 className="sr-only">Cantina Tex-Mex in Buchs: authentische mexikanische Küche und exotische Cocktails</h1>
        <div ref={intro} className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
          {/* El rótulo del flyer (PNG transparente). */}
          <img src="/hero/lust-auf-texmex.webp" alt="Lust auf Tex-Mex?" className="w-[min(92vw,820px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]" />
          <div className="absolute bottom-8 left-1/2 flex h-10 w-6 -translate-x-1/2 animate-bounce items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <div className="h-3 w-1.5 rounded-full bg-white/60" />
          </div>
        </div>

        {/* La frase de cada foto. */}
        {textos.map((t, i) =>
          t ? (
            <div
              key={t.oro}
              ref={(el) => (pies.current[i] = el)}
              className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex flex-col items-center px-6 text-center text-white opacity-0 md:bottom-20"
            >
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{t.etiqueta}</p>
              <p className="pincel mt-3 -rotate-3 text-[2.7rem] leading-[1.05] md:text-7xl">
                <span className="text-white">{t.blanco}</span>
                <br />
                <span className="text-amber-400">{t.oro}</span>
              </p>
              <span className="pincel-raya mt-2 w-48 -rotate-3 md:w-80" aria-hidden="true" />
            </div>
          ) : null,
        )}

        {/* Final, sobre el cartel del Mittagsmenü. */}
        <div ref={final} className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center px-6 text-center text-white opacity-0 md:bottom-14">
          {!FOTO4_CON_TEXTO && (
            <>
              <h2 className="sr-only">Lust auf Tex-Mex und Cocktails?</h2>
              <img src="/hero/lust-auf-texmex.webp" alt="" className="mt-2 w-[min(78vw,560px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]" />
            </>
          )}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/reservierung"
            className="btn-brocha btn-brocha--gross"
          >
            Tisch reservieren
          </Link>
          </div>
        </div>

        {/* Avance: un punto por foto. */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {fotos.map((f, i) => (
            <span key={f.src} ref={(el) => (puntos.current[i] = el)} className="hero-punkt" />
          ))}
        </div>
      </div>
    </section>
  )
}
