
import { useEffect, useState } from "react"
import Image from "next/image"

const heroImages = [
  "/images/hero/11.jpg",
  "/images/hero/FondoDeAdaptaciónAtlantico_7.jpg",
  "/images/hero/IMG_0600.JPG",
  "/images/hero/IMG_20190829_112035831_HDR.jpg",
  "/images/hero/IMG_20190829_142523673_HDR-1.jpg"
]

interface HeroSectionProps {
  headerSticky: boolean
  styles: { heroTitle: string }
}

export default function HeroSection({ headerSticky, styles }: HeroSectionProps) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="inicio"
      className={`min-h-screen flex items-stretch justify-stretch relative overflow-hidden ${headerSticky ? "pt-20" : ""}`}
      style={{ minHeight: "100vh" }}
    >
      {/* Imagen ocupa toda la parte blanca */}
      <div className="absolute left-0 top-0 w-full h-full">
        <Image
          src={heroImages[current]}
          alt="Imagen hero"
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
      </div>
      {/* Polígono naranja superpuesto y texto solo sobre el área naranja */}
      <div className="absolute right-0 top-0 h-full w-2/5 md:w-1/2 flex items-center justify-end" style={{pointerEvents: 'none'}}>
        <svg className="absolute right-0 top-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{zIndex:2}}>
          <polygon points="40,0 100,0 100,100 0,100" fill="#e48c2a" />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full" style={{maxWidth: '100%', right: 0}}>
          <div className="flex flex-col items-start justify-center w-full md:w-[70%] ml-auto" style={{position: 'relative'}}>
            <h1 className={`${styles.heroTitle} mb-6 text-black drop-shadow-lg text-left`}>GIS Colombia</h1>
            <p className="text-lg md:text-2xl mb-8 max-w-md mx-auto text-black opacity-90 drop-shadow-lg text-left">
              Construimos el futuro de Bogotá: proyectos de infraestructura y vivienda con calidad, cumplimiento y transparencia.<br />Especialistas en licitaciones públicas y privadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
