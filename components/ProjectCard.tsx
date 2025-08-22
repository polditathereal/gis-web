import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    descripcion: string
    fechaInicial: string | number
    fechaFinal: string | number
    image1?: string
    categoriaColor?: string // hex o tailwind
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const color = project.categoriaColor || '#FF9D14';
  // Normaliza las fechas para evitar 'Invalid Date'
  let fechaInicial = '';
  let fechaFinal = '';
  try {
    const dateIni = typeof project.fechaInicial === 'string' || typeof project.fechaInicial === 'number'
      ? new Date(project.fechaInicial)
      : null;
    fechaInicial = dateIni && !isNaN(dateIni.getTime())
      ? `${String(dateIni.getDate()).padStart(2,'0')}/${String(dateIni.getMonth()+1).padStart(2,'0')}/${dateIni.getFullYear()}`
      : '';
    const dateFin = typeof project.fechaFinal === 'string' || typeof project.fechaFinal === 'number'
      ? new Date(project.fechaFinal)
      : null;
    fechaFinal = dateFin && !isNaN(dateFin.getTime())
      ? `${String(dateFin.getDate()).padStart(2,'0')}/${String(dateFin.getMonth()+1).padStart(2,'0')}/${dateFin.getFullYear()}`
      : '';
  } catch {
    fechaInicial = '';
    fechaFinal = '';
  }
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
      <div className="bg-orange-600 px-4 py-4 flex flex-col gap-2 rounded-b-lg relative">
        {/* Sombra/fondo de la categoría detrás eliminado, solo queda el rombo */}
        {/* CardHeader */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-2">
              {project.title}
            </div>
            <div className="text-sm text-orange-100">
              {fechaInicial} {fechaInicial && fechaFinal ? ' - ' : ''} {fechaFinal}
            </div>
          </div>
          {/* Rombo color categoría */}
          <div className="ml-3 flex items-center">
            <div style={{
              width: 32,
              height: 32,
              background: color,
              borderRadius: 8,
              boxShadow: `inset 0 2px 8px 0 rgba(0,0,0,0.18)`, // Sombra interior
              transform: 'rotate(45deg)',
              border: `2px solid ${color}`
            }} />
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
