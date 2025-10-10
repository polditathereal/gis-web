import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    descripcion: string
    fechaInicial?: string | number
    fechaFinal?: string | number
    image1?: string
    categoriaColor?: string
    categoriaNombre?: string
  }
}

const BUNNY_STORAGE_URL = process.env.NEXT_PUBLIC_BUNNY_STORAGE_API || "https://br.b-cdn.net"

function constructImageUrl(imagePath: string | undefined | null): string {
  console.log('[ProjectCard] constructImageUrl input:', imagePath)
  
  if (!imagePath || imagePath.trim() === "") {
    console.log('[ProjectCard] Empty path, using default image')
    return "/project-management-team.png"
  }
  
  if (imagePath.startsWith("http")) {
    console.log('[ProjectCard] HTTP URL, returning as-is:', imagePath)
    return imagePath
  }
  
  if (imagePath.startsWith("/images/")) {
    const finalUrl = `${BUNNY_STORAGE_URL}${imagePath}`
    console.log('[ProjectCard] Bunny URL constructed:', finalUrl)
    return finalUrl
  }
  
  console.log('[ProjectCard] No match, using default image for:', imagePath)
  return "/project-management-team.png"
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (!project) {
    return null
  }

  console.log('[ProjectCard] Project data:', {
    id: project.id,
    title: project.title,
    image1: project.image1,
    BUNNY_STORAGE_URL
  })

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
    <div className="group bg-white/90 backdrop-blur-xl border border-[#F4731F]/20 hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col rounded-2xl h-[520px]">
      <div className="w-full h-56 relative overflow-hidden bg-gray-100">
        <Image
          src={constructImageUrl(project.image1) || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          unoptimized={true}
          onLoad={() => console.log('[ProjectCard] Image loaded successfully:', project.title)}
          onError={(e) => console.error('[ProjectCard] Image failed to load:', project.title, e)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
      </div>

      <div className="bg-gradient-to-br from-[#F4731F] to-orange-600 px-6 py-6 flex flex-col gap-3 rounded-b-2xl relative overflow-hidden flex-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full translate-y-8 -translate-x-8"></div>

        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-orange-100 transition-colors leading-tight">
              {project.title}
            </h3>
            
            {project.categoriaNombre && (
              <div className="flex justify-start">
                <span
                  className="text-white font-semibold text-sm px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 transition-transform duration-200 inline-block"
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

          {(fechaInicial || fechaFinal) && (
            <div className="text-sm text-orange-100 font-medium">
              {fechaInicial} {fechaInicial && fechaFinal ? " - " : ""} {fechaFinal}
            </div>
          )}
        </div>

        <div className="relative z-10 flex-1">
          <p className="text-gray-50 leading-relaxed line-clamp-3 text-sm">{project.descripcion}</p>
        </div>
      </div>
    </div>
  )
}
