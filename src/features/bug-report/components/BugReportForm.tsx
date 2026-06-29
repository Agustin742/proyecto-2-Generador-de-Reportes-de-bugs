import { useBugReportStore } from "@/features/bug-report/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bugReportSchema,
  type BugReportFormValues,
} from "@/features/bug-report/schema";
import { BugReportQualityChecklist } from "@/features/bug-report/components/BugReportQualityChecklist";
import { BugReportQualitySuggestions } from "@/features/bug-report/components/BugReportQualitySuggestions";
import { BugReportPreview } from "@/features/bug-report/components/BugReportPreview";
import { SeverityPriorityHelp } from "@/features/bug-report/components/SeverityPriorityHelp";
import { TemplateSelector } from "@/features/bug-report/components/TemplateSelector";
import { ToneSelector } from "./ToneSelector";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

function getDetectedEnvironment() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return "Entorno no disponible automáticamente";
  }

  const userAgent = navigator.userAgent;

  let browser = "Otro navegador";
  if (userAgent.includes("Edg")) {
    browser = "Edge";
  } else if (userAgent.includes("Chrome")) {
    browser = "Chrome";
  } else if (userAgent.includes("Firefox")) {
    browser = "Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Safari";
  }

  let operatingSystem = "Sistema no identificado";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    operatingSystem = "iOS";
  } else if (userAgent.includes("Android")) {
    operatingSystem = "Android";
  } else if (userAgent.includes("Windows")) {
    operatingSystem = "Windows";
  } else if (userAgent.includes("Mac")) {
    operatingSystem = "macOS";
  } else if (userAgent.includes("Linux")) {
    operatingSystem = "Linux";
  }

  const currentLocation = window.location.host || window.location.href;

  return `Navegador: ${browser} | Sistema: ${operatingSystem} | URL: ${currentLocation}`;
}

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-destructive">
      {" *"}
    </span>
  );
}

function CharacterCount({ value }: { value?: string }) {
  const count = value?.length ?? 0;

  if (count === 0) {
    return null;
  }

  return <span className="text-sm text-muted-foreground">{count} caracteres</span>;
}

export function BugReportForm() {
  const addReport = useBugReportStore((state) => state.addReport);
  const form = useForm<BugReportFormValues>({
    mode: "onChange",
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      title: "",
      description: "",
      steps: "",
      expectedResult: "",
      actualResult: "",
      severity: undefined,
      priority: undefined,
      environment: "",
      tone: undefined,
    },
  });
  const watchedValues = form.watch();

  function onSubmit(data: BugReportFormValues) {
    addReport(data);
    form.reset();
    alert("¡Reporte de bug guardado exitosamente en el estado global!");
  }

  function handleDetectEnvironment() {
    const detectedEnvironment = getDetectedEnvironment();

    form.setValue("environment", detectedEnvironment, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function handleClearForm() {
    const shouldClear = window.confirm(
      "¿Seguro que querés borrar los datos cargados?",
    );

    if (!shouldClear) {
      return;
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <div className="mx-auto lg:flex lg:items-start lg:gap-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 rounded-lg border bg-zinc-50/50 p-6 lg:max-w-2xl"
        >
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Los campos marcados con{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
            <span className="sr-only"> asterisco</span> son obligatorios.
          </p>
        </div>

        <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Información general</h2>
            <p className="text-sm text-muted-foreground">
              Datos principales para identificar el bug.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Título del bug
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Error al guardar cambios"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Usá un resumen breve del problema y dónde ocurre.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Descripción detallada
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Al guardar el perfil, la pantalla queda cargando y no confirma los cambios."
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <FormDescription>
                      Contá qué estaba haciendo la persona usuaria cuando apareció
                      el problema.
                    </FormDescription>
                    <CharacterCount value={watchedValues.description} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

         
          <TemplateSelector setValue={form.setValue} />
          <ToneSelector register={form.register} />

        <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Reproducción del bug</h2>
            <p className="text-sm text-muted-foreground">
              Indicá cómo ocurre el problema y qué resultado se esperaba.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pasos para reproducir
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`1. Entrar a login.
2. Completar los datos.
3. Hacer clic en Ingresar.`}
                      className="h-28 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <FormDescription>
                      Listá los pasos en orden para que otra persona pueda reproducir el bug.
                    </FormDescription>
                    <CharacterCount value={watchedValues.steps} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedResult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Resultado esperado
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: El sistema debería iniciar sesión y mostrar el panel."
                      className="h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <FormDescription>
                      Describí el comportamiento correcto esperado.
                    </FormDescription>
                    <CharacterCount value={watchedValues.expectedResult} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actualResult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Resultado actual
                    <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: El botón no responde y la sesión no se inicia."
                      className="h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <FormDescription>
                      Indicá qué ocurrió realmente y qué vio la persona usuaria.
                    </FormDescription>
                    <CharacterCount value={watchedValues.actualResult} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Clasificación del reporte</h2>
            <p className="text-sm text-muted-foreground">
              Definí impacto, urgencia y tono del reporte.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Severidad
                      <RequiredMark />
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná la severidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="critical">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Marcá cuánto afecta el problema al uso del producto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Prioridad
                      <RequiredMark />
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná la prioridad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Indicá qué tan pronto conviene resolverlo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tono
                    <RequiredMark />
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná el estilo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="direct">Directo</SelectItem>
                      <SelectItem value="detailed">Detallado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Elegí cómo querés que se redacte el reporte final.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SeverityPriorityHelp />
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Contexto técnico</h2>
            <p className="text-sm text-muted-foreground">
              Agregá información del entorno donde ocurre el bug.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="environment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Entorno
                    <RequiredMark />
                  </FormLabel>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <FormControl>
                      <Input
                        placeholder="Ej: Chrome 125 en Windows 11, localhost:5173"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDetectEnvironment}
                      className="sm:self-start"
                    >
                      Detectar entorno
                    </Button>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <FormDescription>
                      Agregá navegador, sistema operativo, dispositivo o URL si aplica.
                    </FormDescription>
                    <CharacterCount value={watchedValues.environment} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Revisión final</h2>
            <p className="text-sm text-muted-foreground">
              Revisá si el reporte tiene la información mínima necesaria antes de
              crearlo.
            </p>
          </div>

          <div className="space-y-4">
            <BugReportQualityChecklist values={watchedValues} />

            <BugReportQualitySuggestions values={watchedValues} />

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                className="w-full sm:w-auto sm:order-2"
                disabled={!form.formState.isValid}
              >
                Crear Reporte de Bug
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleClearForm}
                className="w-full sm:w-auto sm:order-1"
              >
                Limpiar formulario
              </Button>
            </div>
          </div>
        </section>

      </form>

      <aside className="mt-6 lg:mt-0 lg:w-1/3 lg:sticky lg:top-6">
        <div className="space-y-4 rounded-3xl border border-border/60 bg-background/60 p-5 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Vista previa Markdown</h2>
            <p className="text-sm text-muted-foreground">
              El reporte se actualiza en vivo con lo que completes arriba.
            </p>
          </div>

          <BugReportPreview
            values={watchedValues}
            className="rounded-xl border border-border/70 bg-white p-4"
          />
        </div>
      </aside>
    </div>
  </Form>
  );
}
