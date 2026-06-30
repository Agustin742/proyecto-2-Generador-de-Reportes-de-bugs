import { ArrowUpRight, ClipboardCheck, ListChecks, ShieldCheck } from "lucide-react";

import { PolillaLogo } from "@/shared/components/PolillaLogo";
import { collaborators } from "@/shared/data/collaborators";

/** Un valor de la herramienta: icono + titulo + subtitulo (RFC-0004 §4.3). */
const values = [
  {
    icon: ListChecks,
    title: "Estructurado",
    description: "El mismo formato prolijo en cada reporte.",
  },
  {
    icon: ClipboardCheck,
    title: "Markdown listo",
    description: "Copiás y pegás en GitHub, Jira o donde sea.",
  },
  {
    icon: ShieldCheck,
    title: "Privado",
    description: "Nada sale del navegador: se guarda en tu equipo.",
  },
] as const;

type AboutContentProps = {
  /** Id del `<h2>` de la misión, para asociarlo al `aria-labelledby` del dialog. */
  titleId: string;
};

/**
 * Contenido del modal "Acerca de" (RFC-0004 §4): misión, problema→solución,
 * tres valores, el detalle de la polilla y el pie con créditos. Presentacional:
 * no toca lógica ni store. La polilla del título es decorativa (`aria-hidden`)
 * y entra volando con `animate-moth-land`.
 */
export function AboutContent({ titleId }: AboutContentProps) {
  return (
    <div className="space-y-7">
      {/* Misión + polilla que aterriza junto al título */}
      <div className="relative">
        {/* Decorativa (el SVG ya es aria-hidden). Entra volando y se posa. */}
        <PolillaLogo className="pointer-events-none absolute -top-7 -left-2 h-12 w-auto text-primary animate-moth-land" />
        <h2
          id={titleId}
          className="font-display text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Reportar un bug debería tomar 2 minutos, no 20.
        </h2>
      </div>

      {/* Problema → solución */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        Los reportes de bugs suelen quedar incompletos o desordenados: faltan
        pasos, no se aclara el entorno, y cada quien los escribe distinto.{" "}
        <span className="font-medium text-foreground">BugNet</span> te guía con
        un formulario claro y arma un <span className="font-medium text-foreground">Markdown
        estructurado</span>, listo para pegar en tu issue.
      </p>

      {/* Tres valores en fila (apilados en mobile) */}
      <ul className="grid gap-4 sm:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="rounded-card border border-border bg-card/60 p-4"
          >
            <Icon className="size-5 text-primary" aria-hidden />
            <p className="mt-3 text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </li>
        ))}
      </ul>

      {/* El detalle de la polilla */}
      <p className="rounded-card border border-border bg-secondary/40 p-4 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">¿Por qué polillas?</span>{" "}
        Porque el primer “bug” de la historia fue, literalmente, una polilla
        atrapada en un relé. Acá cada polilla que revolotea en el fondo es un bug
        suelto… hasta que lo reportás. Y ojo: si las apagás, los bugs no
        desaparecen — solo dejás de verlos. 🦋
      </p>

      {/* Pie: créditos + año + colaboradores */}
      <footer className="border-t border-border pt-5">
        <p className="text-sm text-muted-foreground">
          Hecho por el equipo 5 · <span className="text-primary">2026</span>
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {collaborators.map(({ nombre, github, linkedin }) => (
            <li key={github}>
              <a
                href={linkedin ?? github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {nombre}
                <ArrowUpRight className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
