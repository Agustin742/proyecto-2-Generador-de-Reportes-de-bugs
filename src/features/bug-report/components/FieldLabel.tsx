import type { ReactNode } from "react";

import { RequiredMark } from "@/features/bug-report/components/RequiredMark";
import { FormLabel } from "@/shared/components/ui/form";

type FieldLabelProps = {
  /** Número de campo en mono rosa, ej. "01". Opcional. */
  index?: string;
  /** Si es obligatorio, agrega el `RequiredMark` accesible. */
  required?: boolean;
  children: ReactNode;
};

/**
 * Label de campo numerada en mono (RFC-0002 §4.2). Envuelve a `FormLabel`
 * (mantiene el `htmlFor`/estado de error) y le da el look del template:
 * `01  TÍTULO *` con el número en rosa. El asterisco sigue saliendo de
 * `RequiredMark`, que conserva el texto sr-only "obligatorio".
 */
export function FieldLabel({ index, required, children }: FieldLabelProps) {
  return (
    <FormLabel className="font-mono text-xs uppercase tracking-[0.05em] text-muted-foreground">
      {index ? <span className="mr-2 text-primary">{index}</span> : null}
      {children}
      {required ? <RequiredMark /> : null}
    </FormLabel>
  );
}
