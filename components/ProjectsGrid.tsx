

import Link from "next/link"
import Image from "next/image"

interface Project {
  id: number;
  tipo?: string;
  tema?: string;
  entidadContratante?: string;
  paisOrigen?: string;
  tipo2?: string;
  objeto?: string;
  fechaInicial?: string | number;
  fechaFinal?: string | number;
  consorcio?: string;
  integrantes?: string;
  descripcion?: string;
  category?: string;
  imagenPrincipal?: string;
  image1?: string;
  title?: string;
}

interface ProjectsGridProps {
  allProjects: Project[];
  styles: { sectionTitle: string; cardStyle: string };
}

const categoryColors: Record<string, string> = {
  orange: "bg-orange-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  gray: "bg-gray-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  pink: "bg-pink-500",
  indigo: "bg-indigo-500",
  teal: "bg-teal-500",
  emerald: "bg-emerald-500",
};

function getCategoryColor(categoryId?: string) {
  if (!categoryId) return "bg-gray-500";
  return categoryColors[categoryId] || "bg-gray-500";
}

export default function ProjectsGrid({ allProjects, styles }: ProjectsGridProps) {
  // Mostrar solo los 3 últimos proyectos
  const latestProjects = allProjects.slice(0, 3)

  return (
    <section id="proyectos" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <h2
          className={`${styles.sectionTitle} text-center text-gray-800 mb-12`}
        >
          Nuestros Últimos Proyectos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {latestProjects.map((project, index) => (
            <Link key={index} href={`/proyectos/${project.id}`} className="block">
              <div className={`${styles.cardStyle} bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-xl hover:-translate-y-2 hover:bg-white/90 transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col rounded-lg`}>
                {/* Main Image */}
                <div className="w-full h-48 relative">
                  <Image
                    src={project.imagenPrincipal && project.imagenPrincipal.startsWith('/images/')
                      ? `http://localhost:4000${project.imagenPrincipal}`
                      : '/placeholder.jpg'}
                    alt={project.title || "Proyecto"}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                  />
                </div>
                {/* Orange Section */}
                <div className="bg-orange-600 px-4 py-4 flex flex-col gap-2 rounded-b-lg">
                  {/* CardHeader */}
                  <div>
                    <div className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-2">
                      {project.title}
                    </div>
                    <div className="text-sm text-orange-100">
                      {project.fechaInicial
                        ? new Date(project.fechaInicial).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Sin fecha inicial"}
                      {" - "}
                      {project.fechaFinal
                        ? new Date(project.fechaFinal).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Sin fecha final"}
                    </div>
                  </div>
                  {/* CardContent */}
                  <div>
                    <div className="text-gray-50 leading-relaxed line-clamp-3">
                      {project.descripcion}
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(project.category)}`}>{project.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/proyectos">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors font-semibold text-lg">
              Ver todos los proyectos
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
