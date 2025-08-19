import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsCarouselProps {
featuredNews: { title: string; image?: string; description?: string; [key: string]: any }[]
  currentSlide: number
  nextSlide: () => void
  prevSlide: () => void
  setCurrentSlide: (index: number) => void
  styles: { sectionTitle: string }
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
    <section id="noticias" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className={`${styles.sectionTitle} text-center text-gray-800 mb-12`}>
          Últimas Noticias
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredNews.map((news, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="w-full h-96 relative cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-end">
                    <img
                      src={news.image1 && news.image1.startsWith('/images/')
                        ? `http://localhost:4000${news.image1}`
                        : (news.image1 || '/placeholder.svg')}
                      alt={news.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-lg" />
                    <div className="relative z-10 w-full">
                      <div className="w-full bg-orange-600 bg-opacity-95 py-4 px-4 rounded-b-lg">
                        <h3 className="text-2xl md:text-3xl font-bold text-white text-center m-0">{news.title}</h3>
                        {news.description && (
                          <p className="text-white text-center mt-2 text-base">{news.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-orange-600 p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-orange-600 p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="flex justify-center mt-6 space-x-2">
            {featuredNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-orange-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/noticias">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition-colors font-semibold text-lg">
                Ver todas las noticias
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
