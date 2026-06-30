import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

const toastVariants = cva(
  "flex items-start justify-between gap-3 rounded-lg border p-3 text-sm shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border/60 bg-background text-foreground",
        destructive: "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ToastProps = React.ComponentProps<"output"> &
  VariantProps<typeof toastVariants> & {
    onClose?: () => void;
    closeLabel?: string;
  };

function Toast({
  className,
  variant,
  children,
  onClose,
  closeLabel = "Cerrar",
  ...props
}: ToastProps) {
  return (
    <output
      data-slot="toast"
      aria-live="polite"
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <span>{children}</span>
      {onClose ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-auto px-2 py-1"
        >
          {closeLabel}
        </Button>
      ) : null}
    </output>
  );
}

export { Toast };
