/**
 * Logo de la polilla (RFC-0002 §3). Presentacional: el SVG del template
 * (`Generador de Reportes de Bugs.dc.html`, líneas 68-85) portado a JSX.
 *
 * Usa `currentColor`, así que toma el color del contenedor (`text-primary`
 * en el topbar). Es decorativo: `aria-hidden` lo oculta a lectores de
 * pantalla porque el eyebrow "POLILLA. / BUG REPORT GENERATOR" ya da el
 * nombre. Las alas aletean con los keyframes `flutter-l/-r` de RFC-0001,
 * que `prefers-reduced-motion` desactiva globalmente.
 */
type PolillaLogoProps = {
  className?: string;
  /** Si las alas aletean (`flutter-l/-r`). Default `true`. */
  animated?: boolean;
};

export function PolillaLogo({ className, animated = true }: PolillaLogoProps) {
  const leftWing = animated ? "animate-flutter-l" : "";
  const rightWing = animated ? "animate-flutter-r" : "";

  return (
    <svg
      viewBox="0 0 200 220"
      aria-hidden
      focusable="false"
      className={className}
    >
      <g fill="currentColor">
        <path
          d="M98 56 C 84 38 72 38 62 22"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M102 56 C 116 38 128 38 138 22"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="60" cy="20" r="7" />
        <circle cx="140" cy="20" r="7" />
        <g className={`origin-[96px_112px] [transform-box:view-box] ${leftWing}`}>
          <ellipse cx="62" cy="98" rx="42" ry="34" transform="rotate(-22 62 98)" />
          <ellipse cx="76" cy="148" rx="29" ry="25" transform="rotate(-12 76 148)" />
        </g>
        <g className={`origin-[104px_112px] [transform-box:view-box] ${rightWing}`}>
          <ellipse cx="138" cy="98" rx="42" ry="34" transform="rotate(22 138 98)" />
          <ellipse cx="124" cy="148" rx="29" ry="25" transform="rotate(12 124 148)" />
        </g>
        <circle cx="100" cy="66" r="16" />
        <ellipse cx="100" cy="122" rx="14" ry="48" />
      </g>
    </svg>
  );
}
