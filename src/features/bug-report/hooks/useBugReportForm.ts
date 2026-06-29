import { zodResolver } from "@hookform/resolvers/zod";
import {
  bugReportSchema,
  type BugReportFormValues,
} from "@/features/bug-report/schema";
import { useBugReportStore } from "@/features/bug-report/store";
import { getDetectedEnvironment } from "@/features/bug-report/utils/detectEnvironment";
import { useForm, useWatch } from "react-hook-form";

export function useBugReportForm() {
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

  const watchedValues = useWatch({
    control: form.control,
  });

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

  return {
    form,
    watchedValues,
    onSubmit,
    handleDetectEnvironment,
    handleClearForm,
  };
}
