import { NavLink, Outlet } from "react-router-dom"; // O "react-router" según tu versión
import { PolillaBackground } from "./PolillaBackground";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      {/* Capa decorativa Polilla, detrás del contenido (RFC-0001 §3.5) */}
      <PolillaBackground />
      {/* Barra de navegación fija para toda la app */}
      <header className="bg-white border-b border-zinc-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6 font-medium text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-zinc-900 ${isActive ? "text-zinc-900 font-semibold" : "text-zinc-500"}`
            }
          >
            Inicio
          </NavLink>
          {/* Aca se deben poner las otras paginas */}
        </nav>
      </header>

      {/* Aca se mete el HomePage con el formulario */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
