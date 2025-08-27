import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    descripcion: string
    fechaInicial: string | number
    fechaFinal: string | number
    image1?: string
    categoriaColor?: string
    categoriaNombre?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const color = project.categoriaColor || "#F4731F"

  // Normaliza las fechas para evitar 'Invalid Date'
  let fechaInicial = ""
  let fechaFinal = ""
  try {
    const dateIni =
      typeof project.fechaInicial === "string" || typeof project.fechaInicial === "number"
        ? new Date(project.fechaInicial)
        : null
    fechaInicial =
      dateIni && !isNaN(dateIni.getTime())
        ? `${String(dateIni.getDate()).padStart(2, "0")}/${String(dateIni.getMonth() + 1).padStart(2, "0")}/${dateIni.getFullYear()}`
        : ""
    const dateFin =
      typeof project.fechaFinal === "string" || typeof project.fechaFinal === "number"
        ? new Date(project.fechaFinal)
        : null
    fechaFinal =
      dateFin && !isNaN(dateFin.getTime())
        ? `${String(dateFin.getDate()).padStart(2, "0")}/${String(dateFin.getMonth() + 1).padStart(2, "0")}/${dateFin.getFullYear()}`
        : ""
  } catch {
    fechaInicial = ""
    fechaFinal = ""
  }
  return (
    <div className="group bg-white/90 backdrop-blur-xl border border-[#F4731F]/20 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col rounded-2xl">
      <div className="w-full h-48 relative overflow-hidden bg-gray-100">
        <Image
          src={
            project.image1 && project.image1.startsWith("/images/")
              ? `http://localhost:4000${project.image1}`
              : "/construction-project-placeholder.png"
          }
          alt={project.title}
          fill
          className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
      </div>

      <div className="bg-gradient-to-br from-[#F4731F] to-orange-600 px-6 py-6 flex flex-col gap-3 rounded-b-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full translate-y-8 -translate-x-8"></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="text-xl font-bold text-white group-hover:text-orange-100 transition-colors line-clamp-2 mb-2">
              {project.title}
            </div>
            <div className="text-sm text-orange-100 font-medium">
              {fechaInicial} {fechaInicial && fechaFinal ? " - " : ""} {fechaFinal}
            </div>
          </div>

          {project.categoriaNombre && (
            <div className="ml-4">
              <span
                className="text-white font-semibold text-sm px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 transition-transform duration-200"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                  boxShadow: `0 4px 12px 0 rgba(0,0,0,0.15)`,
                }}
              >
                {project.categoriaNombre}
              </span>
            </div>
          )}
        </div>

        <div className="relative z-10">
          <div className="text-gray-50 leading-relaxed line-clamp-3 text-sm">{project.descripcion}</div>
        </div>
      </div>
    </div>
  )
}
