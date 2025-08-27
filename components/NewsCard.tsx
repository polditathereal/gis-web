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
  const color = news.categoriaColor || "#F4731F"
  // Normaliza la fecha para evitar 'Invalid Date'
  let fecha = ""
  try {
    const dateObj = typeof news.date === "string" || typeof news.date === "number" ? new Date(news.date) : null
    fecha =
      dateObj && !isNaN(dateObj.getTime())
        ? `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`
        : ""
  } catch {
    fecha = ""
  }
  return (
    <div className="group bg-white/90 backdrop-blur-xl border border-[#F4731F]/20 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col rounded-2xl">
      {/* Main Image */}
      <div className="w-full h-48 relative overflow-hidden bg-gray-100">
        <Image
          src={
            news.image && news.image.startsWith("/images/")
              ? `http://localhost:4000${news.image}`
              : "/news-placeholder.png"
          }
          alt={news.title}
          fill
          className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all duration-300"></div>
      </div>
      {/* Orange Section */}
      <div className="bg-gradient-to-br from-[#F4731F] to-orange-600 px-6 py-6 flex flex-col gap-3 rounded-b-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

        {/* CardHeader */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex-1">
            <div className="text-xl font-bold text-white group-hover:text-orange-100 transition-colors line-clamp-2 mb-2">
              {news.title}
            </div>
            <div className="text-sm text-orange-100 font-medium">{fecha}</div>
          </div>

          {/* Pill categoría */}
          {news.category && (
            <div className="ml-4">
              <span
                className="text-white font-semibold text-sm px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 transition-transform duration-200"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                  boxShadow: `0 4px 12px 0 rgba(0,0,0,0.15)`,
                }}
              >
                {news.category}
              </span>
            </div>
          )}
        </div>

        {/* CardContent */}
        <div className="relative z-10">
          <div className="text-gray-50 leading-relaxed line-clamp-3 text-sm">{news.description}</div>
        </div>
      </div>
    </div>
  )
}
