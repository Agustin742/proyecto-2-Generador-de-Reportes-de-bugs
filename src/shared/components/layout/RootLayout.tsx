import { NavLink, Outlet } from "react-router-dom"; // O "react-router" según tu versión
import { PolillaBackground } from "./PolillaBackground";
import { PolillaLogo } from "@/shared/components/PolillaLogo";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Capa decorativa Polilla, detrás del contenido (RFC-0001 §3.5) */}
      <PolillaBackground />
      {/* Topbar mono: logo polilla + eyebrow + navegación (RFC-0002 §3) */}
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          <div className="flex items-center gap-3">
            <PolillaLogo className="h-8 w-auto text-primary" />
            <span className="font-mono text-xs uppercase leading-tight tracking-[0.16em] text-muted-foreground">
              BugNet<span className="text-primary">.</span>
              <br />
              Generador de Reportes
            </span>
          </div>

          <div className="ml-auto flex items-center gap-6 font-mono text-xs uppercase tracking-[0.16em]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${isActive ? "text-foreground" : "text-muted-foreground"}`
              }
            >
              Inicio
            </NavLink>
            {/* Aca se deben poner las otras paginas */}
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
