import { zodResolver } from "@hookform/resolvers/zod";
import {
  bugReportSchema,
  type BugReportFormValues,
} from "@/features/bug-report/schema";
import { useBugReportStore, type SavedReport } from "@/features/bug-report/store";
import { getDetectedEnvironment } from "@/features/bug-report/utils/detectEnvironment";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, type DefaultValues } from "react-hook-form";

const EMPTY_DEFAULTS: DefaultValues<BugReportFormValues> = {
  title: "",
  description: "",
  steps: "",
  expectedResult: "",
  actualResult: "",
  severity: undefined,
  priority: undefined,
  environment: "",
  tone: undefined,
  headerVariant: 0,
};

export type UseBugReportFormOptions = {
  mode?: "create" | "edit";
  // Requerido en modo "edit": precarga los valores y referencia el id a actualizar.
  report?: SavedReport;
  // Callback tras guardar (p. ej. cerrar el modal de edición).
  onSaved?: () => void;
};

export function useBugReportForm({
  mode = "create",
  report,
  onSaved,
}: UseBugReportFormOptions = {}) {
  const addReport = useBugReportStore((state) => state.addReport);
  const updateReport = useBugReportStore((state) => state.updateReport);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const form = useForm<BugReportFormValues>({
    mode: "onChange",
    resolver: zodResolver(bugReportSchema),
    defaultValues:
      mode === "edit" && report ? report.values : EMPTY_DEFAULTS,
  });

  const watchedValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current !== null) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  function showSaveFeedback(message: string) {
    setSaveFeedback(message);

    if (feedbackTimeoutRef.current !== null) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setSaveFeedback(null);
      feedbackTimeoutRef.current = null;
    }, 8000);
  }

  function dismissSaveFeedback() {
    if (feedbackTimeoutRef.current !== null) {
      window.clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    setSaveFeedback(null);
  }

  function onSubmit(data: BugReportFormValues) {
    if (mode === "edit" && report) {
      updateReport(report.id, data);
      onSaved?.();
      return;
    }

    addReport(data);
    form.reset();
    showSaveFeedback("Reporte guardado correctamente.");
  }

  function handleDetectEnvironment() {
    const detectedEnvironment = getDetectedEnvironment();

    form.setValue("environment", detectedEnvironment, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function handleClearForm() {
    dismissSaveFeedback();
    form.reset();
  }

  return {
    form,
    watchedValues,
    saveFeedback,
    dismissSaveFeedback,
    onSubmit,
    handleDetectEnvironment,
    handleClearForm,
  };
}
