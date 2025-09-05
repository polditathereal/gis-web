"use client"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const BUNNY_STORAGE_URL = process.env.NEXT_PUBLIC_BUNNY_STORAGE_API || "https://gis-web.b-cdn.net"

function constructImageUrl(imagePath: string | undefined | null): string {
  if (!imagePath || imagePath.trim() === "") return "/placeholder.jpg"
  if (imagePath.startsWith("http")) return imagePath
  if (imagePath.startsWith("/images/")) {
    return `${BUNNY_STORAGE_URL}${imagePath}`
  }
  return "/placeholder.jpg"
}

type NewsItem = {
  id: string
  title: string
  image?: string
  description?: string
}

type NewsCarouselProps = {
  featuredNews: NewsItem[]
  currentSlide: number
  nextSlide: () => void
  prevSlide: () => void
  setCurrentSlide: (n: number) => void
  styles?: {
    cardStyle?: string
    sectionTitle?: string
  }
}

export default function NewsCarousel({
  featuredNews,
  currentSlide,
  nextSlide,
  prevSlide,
  setCurrentSlide,
  styles,
}: NewsCarouselProps) {
  return (
    <section
      id="noticias"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F4731F]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`${styles?.sectionTitle ?? ""} text-gray-800 mb-4`}>
            Últimas <span className="text-[#F4731F]">Noticias</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4731F] to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl border border-[#F4731F]/10">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredNews.map((news, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Link href={`/noticias/${news.id}`} passHref legacyBehavior>
                    <a className="block w-full h-96 relative cursor-pointer group overflow-hidden">
                      <img
                        src={constructImageUrl(news.image)}
                        alt={news.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="bg-orange-500/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-orange-100 transition-colors">
                            {news.title}
                          </h3>
                          {news.description && (
                            <p className="text-white/90 text-base leading-relaxed line-clamp-2">{news.description}</p>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-[#F4731F] p-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-[#F4731F]/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white text-[#F4731F] p-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border border-[#F4731F]/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center mt-8 space-x-3">
            {featuredNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#F4731F] shadow-lg scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/noticias">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F4731F] to-orange-500 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-lg relative overflow-hidden">
                <span className="relative z-10">Ver todas las noticias</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}