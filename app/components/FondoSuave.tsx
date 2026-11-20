"use client"

import { useEffect } from "react"

/* Fondo de toda la web (20/11/2026, sustituye a las fotos oscuras que cambiaban al bajar).
   Un color suave que va pasando de amarillo a verde a rojo (muy claros) según se baja,
   con dos manchas de color difuminadas y un punteado fino como de papel. */
const FARBEN: [number, number, number][] = [
  [253, 242, 210], // amarillo suave
  [228, 241, 216], // verde suave
  [251, 225, 214], // rojo / rosa suave
  [253, 238, 205], // vuelta al amarillo
]

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

export default function FondoSuave() {
  useEffect(() => {
    let raf = 0
    const pintar = () => {
      raf = 0
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / max)) * (FARBEN.length - 1)
      const i = Math.min(FARBEN.length - 2, Math.floor(p))
      const c = mix(FARBEN[i], FARBEN[i + 1], p - i)
      // las manchas van medio paso por delante, para que siempre haya dos tonos
      const q = Math.min(FARBEN.length - 1, p + 0.6)
      const j = Math.min(FARBEN.length - 2, Math.floor(q))
      const d = mix(FARBEN[j], FARBEN[j + 1], q - j)
      const s = document.documentElement.style
      s.setProperty("--fondo", `rgb(${c.join(",")})`)
      s.setProperty("--fondo-mancha", `rgb(${d.map((v) => Math.max(0, v - 18)).join(",")})`)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pintar) }
    pintar()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="fondo-suave" aria-hidden="true"><i /><i /></div>
}
