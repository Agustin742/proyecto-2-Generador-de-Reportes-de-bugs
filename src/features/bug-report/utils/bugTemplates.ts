import type { BugReportFormValues } from "../schema";
import type { BugTemplate } from "../types";

export function applyTemplate(template: BugTemplate): Partial<BugReportFormValues> {
  const templates: Record<BugTemplate, Partial<BugReportFormValues>> = {
    visual: {
      title: "[Visual] - Desalineación en...",
      description: "Se detectó un error estético en la interfaz gráfica.",
      steps: "1. Abrir la sección principal.\n2. Cambiar tamaño de pantalla.",
      expectedResult: "Los elementos visuales deben alinearse simétricamente de acuerdo al diseño base.",
      actualResult: "El botón se encima con el texto del contenedor principal."
    },
    functional: {
      title: "[Funcional] - Error de respuesta en...",
      description: "El sistema no responde lógicamente a las interacciones del usuario.",
      steps: "1. Hacer clic sobre el botón de acción.\n2. Enviar datos del formulario.",
      expectedResult: "Se procesa la acción exitosamente y se muestra un mensaje de confirmación.",
      actualResult: "La pantalla se queda congelada sin dar ningún tipo de respuesta al usuario."
    },
    performance: {
      title: "[Rendimiento] - Retraso al cargar...",
      description: "La velocidad de carga o respuesta es sumamente lenta bajo condiciones normales.",
      steps: "1. Ingresar al panel de métricas.\n2. Ejecutar la consulta masiva de registros.",
      expectedResult: "Los datos deben renderizar de forma fluida en menos de 1 segundo.",
      actualResult: "La interfaz experimenta un lag prolongado y bloquea temporalmente el navegador."
    }
  };

  return templates[template];
}