import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ProjectCard from "./ProjectCard"

interface Project {
  id: string
  tipo?: string
  tema?: string
  entidadContratante?: string
  paisOrigen?: string
  tipo2?: string
  objeto?: string
  fechaInicial?: string
  fechaFinal?: string
  consorcio?: string
  integrantes?: string
  descripcion?: string
  category?: string
  imagenPrincipal?: string
  image1?: string
  title?: string
}

interface ProjectsGridProps {
  allProjects: Project[]
  styles: { sectionTitle: string; cardStyle: string }
  categories?: { id: string; name: string; color: string }[]
}

export default function ProjectsGrid({ allProjects, styles, categories = [] }: ProjectsGridProps) {
  // Las categorías ya vienen como prop
  // Ordenar por fecha y mostrar los 3 más recientes
  const sortedProjects = [...allProjects].sort((a, b) => {
    const dateA = new Date(a.fechaInicial ?? a.fechaFinal ?? 0)
    const dateB = new Date(b.fechaInicial ?? b.fechaFinal ?? 0)
    return dateB.getTime() - dateA.getTime()
  })
  const latestProjects = sortedProjects.slice(0, 3)

  return (
    <section
      id="proyectos"
      className="py-24 bg-gradient-to-br from-white via-gray-50 to-orange-50/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-2 h-2 bg-[#F4731F]/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-1 h-1 bg-orange-400/40 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`${styles.sectionTitle} text-gray-800 mb-4`}>
            Nuestros Últimos <span className="text-[#F4731F]">Proyectos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4731F] to-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Descubre los proyectos más recientes que hemos desarrollado con excelencia y innovación
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {latestProjects.map((project, index) => {
            // Buscar nombre y color de la categoría en el array de categorías
            const catObj = categories.find(
              (cat: { id: string; name: string; color: string }) =>
                cat.name === project.category || cat.id === project.category,
            )
            const catName = catObj ? catObj.name : (project.category ?? "")
            const catColor = catObj ? catObj.color : "#BDBDBD"
            return (
              <Link key={index} href={`/proyectos/${project.id}`} className="block">
                <ProjectCard
                  project={{
                    id: String(project.id), // <-- asegúrate de que sea string
                    title: project.title ?? "",
                    descripcion: project.descripcion ?? "",
                    fechaInicial: project.fechaInicial ?? "",
                    fechaFinal: project.fechaFinal ?? "",
                    image1:
                      project.imagenPrincipal && project.imagenPrincipal.startsWith("/images/")
                        ? `/images/${project.imagenPrincipal.split("/images/")[1]}`
                        : "/placeholder.jpg",
                    categoriaColor: catColor,
                    categoriaNombre: catName,
                  }}
                />
              </Link>
            )
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/proyectos">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F4731F] to-orange-500 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-lg relative overflow-hidden">
              <span className="relative z-10">Ver todos los proyectos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}