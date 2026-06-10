import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bugReportSchema,
  type BugReportFormValues,
} from "@/features/bug-report/schema";

// Importamos los ladrillos visuales de shadcn/ui
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
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

//El formulario vive dentro de esta funcion
export function BugReportForm() {
  // Le decimos que controle los datos usando las reglas de bugReportSchema
  const form = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      title: "",
      description: "",
      severity: undefined,
      environment: undefined,
      stepsToReproduce: "",
    },
  });

  // Si el usuario presiona "Enviar" y no hay errores
  function onSubmit(data: BugReportFormValues) {
    // Por ahora solo lo mostramos en consola.
    // Después acá llamamos a Zustand para guardar el borrador.
    console.log("¡Reporte listo para enviar!", data);
  }

  // Estructura visual
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto p-6 border rounded-lg bg-zinc-50/50"
      >
        {/* Campo: Titulo */}
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
              {/* FormMessage es el que muestra el texto en rojo de Zod automáticamente */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo: Descripción */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción detallada</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explicá en detalle qué pasó y qué esperabas que pasara..."
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Agrupamos Severidad y Entorno en dos columnas para que quede más prolijo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo: Severidad */}
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severidad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo: Entorno */}
          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entorno</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Dónde ocurrió?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">
                      Desarrollo (Local)
                    </SelectItem>
                    <SelectItem value="staging">Staging (Pruebas)</SelectItem>
                    <SelectItem value="production">Producción</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Crear Reporte de Bug
        </Button>
      </form>
    </Form>
  );
}
