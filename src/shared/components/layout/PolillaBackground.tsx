/**
 * Capa decorativa de fondo del sistema visual "Polilla" (RFC-0001 §3.5).
 *
 * Es puramente presentacional: un glow radial superior + dos blobs rosados
 * difuminados que flotan. No tiene estado de negocio ni captura eventos
 * (`pointer-events-none`) y queda detras del contenido (`-z-10`).
 *
 * `aria-hidden` la oculta a tecnologias de asistencia. Las animaciones se
 * desactivan via `prefers-reduced-motion` (media query global en index.css).
 *
 * El enjambre de polillas SVG con parallax es un enhancement opcional que el
 * RFC difiere a RFC-0002.
 */
export function PolillaBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden
                 bg-[radial-gradient(120%_80%_at_80%_-10%,rgba(255,77,141,0.10),transparent_60%)]"
    >
      <div
        className="absolute -top-44 -left-40 size-[560px] rounded-full blur-2xl
                   bg-[radial-gradient(circle,rgba(255,77,141,0.16),transparent_65%)]
                   animate-blob-b"
      />
      <div
        className="absolute -bottom-52 -right-36 size-[640px] rounded-full blur-2xl
                   bg-[radial-gradient(circle,rgba(255,46,154,0.12),transparent_65%)]
                   animate-blob-a"
      />
    </div>
  );
}
