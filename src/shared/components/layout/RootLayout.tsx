import { NavLink, Outlet } from "react-router-dom"; // O "react-router" según tu versión
import { Bug, BugOff } from "lucide-react";
import { PolillaBackground } from "@/features/polillas/components/PolillaBackground";
import { PolillaLogo } from "@/shared/components/PolillaLogo";
import { AboutDialog } from "@/features/about/components/AboutDialog";
import { Button } from "@/shared/components/ui/button";
import { MobileNav } from "@/shared/components/layout/MobileNav";
import { navItems } from "@/shared/components/layout/navItems";
import { usePolillasStore } from "@/features/polillas/store";

export function RootLayout() {
  const polillasEnabled = usePolillasStore((state) => state.enabled);
  const togglePolillas = usePolillasStore((state) => state.toggle);

  return (
    <div className="flex min-h-screen flex-col text-foreground">
      {/* Capa decorativa Polilla, detrás del contenido (RFC-0001 §3.5) */}
      <PolillaBackground />
      {/* Topbar mono: logo polilla + eyebrow + navegación (RFC-0002 §3) */}
      <header className="pt-4 sm:pt-6">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <PolillaLogo
              className="h-8 w-auto shrink-0 text-primary"
              animated={polillasEnabled}
            />
            <span className="font-mono text-xs uppercase leading-tight tracking-[0.16em] text-muted-foreground">
              BugNet<span className="text-primary">.</span>
              <br />
              Generador de Reportes
            </span>
          </div>

          {/* Fila de enlaces de escritorio: oculta bajo 705px, donde su ancho
              desbordaba el viewport y provocaba scroll horizontal (la reemplaza
              `MobileNav`). */}
          <div className="ml-auto hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.16em] min-[705px]:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `transition-colors hover:text-primary ${isActive ? "text-foreground" : "text-muted-foreground"}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Modal "Acerca de" autocontenido (RFC-0004): trigger + dialog */}
            <AboutDialog />

            {/* Apaga/enciende el enjambre de polillas del fondo (RFC-0002) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-pressed={polillasEnabled}
              aria-label={
                polillasEnabled ? "Apagar polillas" : "Encender polillas"
              }
              title={polillasEnabled ? "Apagar polillas" : "Encender polillas"}
              onClick={togglePolillas}
              className={
                polillasEnabled ? "text-primary" : "text-muted-foreground"
              }
            >
              {polillasEnabled ? <Bug /> : <BugOff />}
            </Button>
          </div>

          {/* Menú desplegable equivalente para mobile (< 705px). */}
          <div className="ml-auto min-[705px]:hidden">
            <MobileNav />
          </div>
        </nav>
      </header>

      {/* Aca se mete el HomePage con el formulario */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
