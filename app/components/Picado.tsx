// Banderitas de papel picado (estilo de la página de reservas). Estilos en app/papel.css.
export default function Picado({ n = 14 }: { n?: number }) {
  return (
    <div className="picado" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => <i key={i} />)}
    </div>
  )
}
