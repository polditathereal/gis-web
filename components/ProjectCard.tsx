import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    descripcion: string
    fechaInicial: string | number
    fechaFinal: string | number
    image1?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col rounded-lg">
      {/* Main Image */}
      <div className="w-full h-48 relative">
        <Image
          src={project.image1 && project.image1.startsWith('/images/')
            ? `http://localhost:4000${project.image1}`
            : '/placeholder.jpg'}
          alt={project.title}
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
            {new Date(project.fechaInicial).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} {" - "}
            {new Date(project.fechaFinal).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        {/* CardContent */}
        <div>
          <div className="text-gray-50 leading-relaxed line-clamp-3">
            {project.descripcion}
          </div>
        </div>
      </div>
    </div>
  )
}
