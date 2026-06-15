export function SeverityPriorityHelp() {
  return (
    <details className="rounded-lg border bg-muted/30 p-4">
      <summary className="cursor-pointer rounded-sm text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        Guía rápida: severidad vs prioridad
      </summary>

      <div className="mt-3 space-y-4">
        <p className="text-sm text-muted-foreground">
          Consultá esta ayuda si tenés dudas al elegir los niveles.
        </p>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Severidad = impacto del problema.
          </p>
          <p className="text-sm text-muted-foreground">
            Prioridad = urgencia para resolverlo.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Guía de severidad</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Baja: detalle menor o visual.</li>
            <li>Media: molesta, pero tiene alternativa.</li>
            <li>Alta: afecta una función importante.</li>
            <li>Crítica: impide usar una función principal.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Guía de prioridad</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Baja: puede esperar.</li>
            <li>Media: importante, pero no bloqueante.</li>
            <li>Alta: debe resolverse pronto.</li>
          </ul>
        </div>
      </div>
    </details>
  );
}
