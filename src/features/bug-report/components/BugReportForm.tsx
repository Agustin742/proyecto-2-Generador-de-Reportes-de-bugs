import { useBugReportStore } from "@/features/bug-report/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bugReportSchema,
  type BugReportFormValues,
} from "@/features/bug-report/schema";
import { BugReportQualityChecklist } from "@/features/bug-report/components/BugReportQualityChecklist";
import { SeverityPriorityHelp } from "@/features/bug-report/components/SeverityPriorityHelp";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-8 rounded-lg border bg-zinc-50/50 p-6"
      >
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
                  <FormLabel>Título del Bug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: El botón de login no funciona..."
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Ej: El botón “Guardar” no responde al hacer clic.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción detallada</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explicá en detalle qué pasó y qué esperabas que pasara..."
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Contá brevemente qué estaba haciendo el usuario cuando apareció
                    el problema.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

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
                  <FormLabel>Pasos para reproducir</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describí los pasos para reproducir el bug."
                      className="h-28 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Escribí los pasos en orden. Ej: 1. Entrar a login. 2. Completar
                    los datos. 3. Hacer clic en “Ingresar”.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedResult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado esperado</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Indicá qué debería haber pasado."
                      className="h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Describí qué debería haber pasado si todo funcionaba
                    correctamente.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actualResult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado actual</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Indicá qué pasó realmente."
                      className="h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    Describí qué pasó realmente y cómo afectó al usuario.
                  </p>
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
                    <FormLabel>Severidad</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná un nivel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="critical">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      La severidad indica qué tan fuerte impacta el problema.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridad</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná una prioridad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      La prioridad indica qué tan urgente es resolverlo.
                    </p>
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
                  <FormLabel>Tono</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná un tono" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="direct">Directo</SelectItem>
                      <SelectItem value="detailed">Detallado</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Elegí cómo querés que se redacte el reporte final.
                  </p>
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
                  <FormLabel>Entorno</FormLabel>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                    <FormControl>
                      <Input
                        placeholder="Ej: Producción, staging, Android 13..."
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
                  <p className="text-sm text-muted-foreground">
                    Ej: Chrome 125, Windows 11, ambiente producción.
                  </p>
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

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid}
            >
              Crear Reporte de Bug
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
