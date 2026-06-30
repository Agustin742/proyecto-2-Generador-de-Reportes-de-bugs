import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { DropdownMenu } from "radix-ui";
import { Bug, BugOff, Info, Menu } from "lucide-react";

import { AboutDialog } from "@/features/about/components/AboutDialog";
import { Button } from "@/shared/components/ui/button";
import { usePolillasStore } from "@/features/polillas/store";
import { cn } from "@/shared/lib/utils";
import { navItems } from "./navItems";

/** Clases compartidas por cada fila del menú (enlaces y acciones). */
const itemClassName =
  "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 outline-none transition-colors select-none data-[highlighted]:bg-muted data-[highlighted]:text-foreground";

/**
 * Menú de navegación desplegable para viewports angostos (< 705px). Reemplaza
 * a la fila de enlaces del topbar —que en mobile desbordaba y provocaba scroll
 * horizontal— por un único disparador (hamburguesa) que abre un menú con las
 * mismas opciones: rutas, "Acerca de" y el toggle de polillas.
 *
 * Se apoya en `DropdownMenu` de Radix (mismo paquete `radix-ui` ya usado en el
 * proyecto), que aporta gratis el patrón accesible: rol `menu`, navegación con
 * flechas, cierre con `Esc`/click afuera, `aria-expanded` en el disparador y
 * devolución de foco. El visible está oculto en escritorio desde `RootLayout`.
 */
export function MobileNav() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const polillasEnabled = usePolillasStore((state) => state.enabled);
  const togglePolillas = usePolillasStore((state) => state.toggle);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          ref={triggerRef}
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Abrir menú de navegación"
          className="text-muted-foreground hover:text-primary"
        >
          <Menu aria-hidden />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-44 origin-[var(--radix-dropdown-menu-content-transform-origin)] rounded-card border border-border bg-card p-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-1"
        >
          {navItems.map((item) => (
            <DropdownMenu.Item key={item.to} asChild>
              {/* `className` estático (no función): un className-función no
                  compone con el `Slot` de Radix y se pierde, dejando los enlaces
                  inline/pegados. El estado activo se resuelve por el
                  `aria-current="page"` que NavLink agrega al estar activo. */}
              <NavLink
                to={item.to}
                end={item.end}
                className={cn(itemClassName, "aria-[current=page]:text-foreground")}
              >
                {item.label}
              </NavLink>
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className="my-1.5 h-px bg-border" />

          <DropdownMenu.Item
            className={itemClassName}
            onSelect={() => setAboutOpen(true)}
          >
            <Info aria-hidden className="size-3.5" />
            Acerca de
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={cn(itemClassName, polillasEnabled && "text-primary")}
            onSelect={togglePolillas}
          >
            {polillasEnabled ? (
              <Bug aria-hidden className="size-3.5" />
            ) : (
              <BugOff aria-hidden className="size-3.5" />
            )}
            {polillasEnabled ? "Apagar polillas" : "Encender polillas"}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>

      {/* Modal "Acerca de" controlado: el menú lo abre y, al cerrarse, le
          devolvemos el foco al disparador (la hamburguesa). */}
      <AboutDialog
        open={aboutOpen}
        onOpenChange={(value) => {
          setAboutOpen(value);
          if (!value) triggerRef.current?.focus();
        }}
        showTrigger={false}
      />
    </DropdownMenu.Root>
  );
}
