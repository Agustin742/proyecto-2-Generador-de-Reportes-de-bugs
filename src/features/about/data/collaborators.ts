/**
 * Colaboradores del proyecto, para el pie del modal "Acerca de" (RFC-0004 §4.5).
 *
 * Los perfiles de GitHub no exponen LinkedIn, por eso el pie enlaza al perfil de
 * GitHub de cada uno. El campo `linkedin` queda opcional: si alguien lo provee,
 * se agrega a su entrada sin tocar el render (que lo prioriza cuando existe).
 */
export interface Collaborator {
  nombre: string;
  github: string;
  linkedin?: string;
}

export const collaborators: readonly Collaborator[] = [
  { nombre: "Magali Suarez", github: "https://github.com/Nat-magui" },
  { nombre: "Matias Fauda", github: "https://github.com/matiasfauda23" },
  { nombre: "Agustin Tabarcache", github: "https://github.com/Agustin742" },
  { nombre: "Angie Alvarez Lucero", github: "https://github.com/Alvangie" },
  { nombre: "Octavio Britez", github: "https://github.com/BritezOcta" },
];
