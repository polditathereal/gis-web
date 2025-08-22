import Image from "next/image"

interface NewsCardProps {
  news: {
    id: string
    title: string
    description: string
    date: string | number
    image?: string
    category?: string
    author?: string
    readTime?: string
    categoriaColor?: string // hex o tailwind
    featured?: boolean
  }
}

export default function NewsCard({ news }: NewsCardProps) {
  const color = news.categoriaColor || '#FF9D14';
  // Normaliza la fecha para evitar 'Invalid Date'
  let fecha = '';
  try {
    const dateObj = typeof news.date === 'string' || typeof news.date === 'number'
      ? new Date(news.date)
      : null;
    fecha = dateObj && !isNaN(dateObj.getTime())
      ? `${String(dateObj.getDate()).padStart(2,'0')}/${String(dateObj.getMonth()+1).padStart(2,'0')}/${dateObj.getFullYear()}`
      : '';
  } catch {
    fecha = '';
  }
  return (
    <div className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col rounded-lg">
      {/* Main Image */}
      <div className="w-full h-48 relative">
        <Image
          src={news.image && news.image.startsWith('/images/')
            ? `http://localhost:4000${news.image}`
            : '/placeholder.jpg'}
          alt={news.title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={true}
        />
        {/* Tag de noticia destacada eliminado */}
      </div>
      {/* Orange Section */}
      <div className="bg-orange-600 px-4 py-4 flex flex-col gap-2 rounded-b-lg relative">
        {/* Sombra/fondo de la categoría detrás eliminado, solo queda el rombo */}
        {/* CardHeader */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="text-xl font-bold text-white group-hover:text-orange-200 transition-colors line-clamp-2">
              {news.title}
            </div>
            <div className="text-sm text-orange-100">
              {fecha}
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
            {news.description}
          </div>
        </div>
      </div>
    </div>
  )
}
