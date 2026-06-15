export function SeverityPriorityHelp() {
  return (
    <section className="space-y-4 rounded-lg border bg-muted/40 p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">
          Guía rápida: severidad vs prioridad
        </h2>
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
    </section>
  );
}
