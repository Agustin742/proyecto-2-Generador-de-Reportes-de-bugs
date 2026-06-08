import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <main className="min-h-screen bg-zinc-50 p-8 text-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Generador de Reportes de Bugs
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
            <p className="text-zinc-500">texto de prueba</p>
          </div>
        </div>
      </main>
    ),
  },
]);
