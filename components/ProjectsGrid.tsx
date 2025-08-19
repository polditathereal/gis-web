

import Link from "next/link"
import Image from "next/image"

import ProjectCard from "./ProjectCard"

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

  // Helper para obtener el color de la categoría
  const getCategoryColorHex = (categoryId?: string) => {
    if (!categoryId) return '#FF9D14';
    // Puedes mapear aquí tus colores personalizados
    const map: Record<string, string> = {
      orange: '#FF9D14',
      red: '#EF4444',
      blue: '#3B82F6',
      green: '#22C55E',
      gray: '#6B7280',
      purple: '#A78BFA',
      yellow: '#FACC15',
      pink: '#EC4899',
      indigo: '#6366F1',
      teal: '#14B8A6',
      emerald: '#10B981',
    };
    return map[categoryId] || '#FF9D14';
  };

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
              <ProjectCard
                project={{
                  id: project.id,
                  title: project.title ?? '',
                  descripcion: project.descripcion ?? '',
                  fechaInicial: project.fechaInicial ?? '',
                  fechaFinal: project.fechaFinal ?? '',
                  image1: project.imagenPrincipal && project.imagenPrincipal.startsWith('/images/')
                    ? `/images/${project.imagenPrincipal.split('/images/')[1]}`
                    : '/placeholder.jpg',
                  categoriaColor: getCategoryColorHex(project.category),
                }}
              />
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
