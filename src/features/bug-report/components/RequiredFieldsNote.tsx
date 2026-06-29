export function RequiredFieldsNote() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Los campos marcados con{" "}
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
        <span className="sr-only"> asterisco</span> son obligatorios.
      </p>
    </div>
  );
}
