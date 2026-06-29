export function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-destructive">
        {" *"}
      </span>
      <span className="sr-only"> obligatorio</span>
    </>
  );
}
