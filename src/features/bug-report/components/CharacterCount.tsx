type CharacterCountProps = {
  max?: number;
  value?: string;
};

export function CharacterCount({ value, max }: CharacterCountProps) {
  const count = value?.trim().length ?? 0;

  if (typeof max !== "number" && count === 0) {
    return null;
  }

  const isOverLimit = typeof max === "number" && count > max;
  const className = isOverLimit
    ? "text-sm text-destructive"
    : "text-sm text-muted-foreground";

  return (
    <span className={className}>
      {typeof max === "number" ? `${count}/${max}` : count} caracteres
    </span>
  );
}
