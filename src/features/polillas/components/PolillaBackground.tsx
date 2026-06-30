import { PolillaLogo } from "@/shared/components/PolillaLogo";
import { usePolillasStore } from "@/features/polillas/store";

/**
 * Capa decorativa de fondo del sistema visual "Polilla" (RFC-0001 §3.5).
 *
 * Tiene dos capas: (1) un glow radial superior + dos blobs rosados difuminados
 * que flotan, siempre presentes como ambiente; y (2) el enjambre de polillas
 * SVG con vuelo errante (RFC-0002), que el usuario puede apagar/encender desde
 * el navbar (`usePolillasStore`).
 *
 * Es puramente presentacional: no tiene estado de negocio ni captura eventos
 * (`pointer-events-none`) y queda detras del contenido (`-z-10`).
 *
 * `aria-hidden` la oculta a tecnologias de asistencia. Las animaciones se
 * desactivan via `prefers-reduced-motion` (media query global en index.css);
 * en ese caso las polillas quedan visibles pero quietas.
 */

type SwarmMoth = {
  /** Identificador único para key de React. */
  id: string;
  /** Posicion + tamaño (utilidades Tailwind). */
  className: string;
  /** Utilidad de animacion de deriva (`animate-drift-*`). */
  drift: string;
  /** Desfase negativo para arrancar el ciclo en distinto punto. */
  delay: string;
  /** Duracion del ciclo: varia el ritmo de cada polilla. */
  duration: string;
  /** Opacidad: las mas lejanas (chicas) van mas tenues -> parallax. */
  opacity: number;
};

const SWARM: SwarmMoth[] = [
  { id: "moth-1", className: "top-[14%] left-[6%] size-12", drift: "animate-drift-1", delay: "0s", duration: "54s", opacity: 0.24 },
  { id: "moth-2", className: "top-[20%] right-[12%] size-16", drift: "animate-drift-2", delay: "-8s", duration: "66s", opacity: 0.18 },
  { id: "moth-3", className: "top-[56%] left-[10%] size-10", drift: "animate-drift-3", delay: "-3s", duration: "48s", opacity: 0.2 },
  { id: "moth-4", className: "bottom-[14%] right-[16%] size-14", drift: "animate-drift-4", delay: "-18s", duration: "60s", opacity: 0.22 },
  { id: "moth-5", className: "top-[38%] left-[44%] size-8", drift: "animate-drift-5", delay: "-11s", duration: "50s", opacity: 0.13 },
  { id: "moth-6", className: "bottom-[26%] left-[28%] size-9", drift: "animate-drift-6", delay: "-24s", duration: "58s", opacity: 0.16 },
  { id: "moth-7", className: "top-[66%] right-[30%] size-12", drift: "animate-drift-1", delay: "-30s", duration: "62s", opacity: 0.2 },
  { id: "moth-8", className: "top-[10%] left-[40%] size-6", drift: "animate-drift-4", delay: "-14s", duration: "46s", opacity: 0.12 },
  { id: "moth-9", className: "top-[46%] right-[8%] size-11", drift: "animate-drift-5", delay: "-36s", duration: "68s", opacity: 0.19 },
  { id: "moth-10", className: "bottom-[34%] right-[44%] size-7", drift: "animate-drift-6", delay: "-20s", duration: "52s", opacity: 0.14 },
  { id: "moth-11", className: "bottom-[10%] left-[48%] size-10", drift: "animate-drift-3", delay: "-42s", duration: "72s", opacity: 0.17 },
];

export function PolillaBackground() {
  const enabled = usePolillasStore((state) => state.enabled);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden
                 bg-[radial-gradient(120%_80%_at_80%_-10%,rgba(255,77,141,0.16),transparent_60%)]"
    >
      <div
        className="absolute -top-44 -left-40 size-140 rounded-full blur-2xl
                   bg-[radial-gradient(circle,rgba(255,77,141,0.26),transparent_65%)]
                   animate-blob-b"
      />
      <div
        className="absolute -bottom-52 -right-36 size-160 rounded-full blur-2xl
                   bg-[radial-gradient(circle,rgba(255,46,154,0.22),transparent_65%)]
                   animate-blob-a"
      />

      {enabled &&
        SWARM.map((moth) => (
          <div
            key={moth.id}
            className={`absolute text-primary will-change-transform ${moth.className} ${moth.drift}`}
            style={{
              animationDelay: moth.delay,
              animationDuration: moth.duration,
              opacity: moth.opacity,
            }}
          >
            <PolillaLogo className="size-full" />
          </div>
        ))}
    </div>
  );
}
