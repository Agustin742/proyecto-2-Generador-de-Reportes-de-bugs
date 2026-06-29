type CharacterCountProps = {
  value?: string;
};

export function CharacterCount({ value }: CharacterCountProps) {
  const count = value?.length ?? 0;

  if (count === 0) {
    return null;
  }

  return <span className="text-sm text-muted-foreground">{count} caracteres</span>;
}
