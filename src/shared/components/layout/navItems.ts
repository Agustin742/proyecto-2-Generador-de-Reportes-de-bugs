/**
 * Única fuente de verdad de los enlaces de navegación del topbar. La comparten
 * la barra de escritorio (`RootLayout`) y el menú desplegable mobile
 * (`MobileNav`), de modo que agregar una página es editar sólo este arreglo.
 */
export type NavItem = {
  /** Ruta destino del `NavLink`. */
  to: string;
  /** Texto visible del enlace. */
  label: string;
  /** `end` del `NavLink`: marca activo sólo en coincidencia exacta (ruta raíz). */
  end?: boolean;
};

export const navItems: NavItem[] = [
  { to: "/", label: "Inicio", end: true },
  { to: "/reportes", label: "Reportes" },
];
