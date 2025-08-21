"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import NewsCarousel from "@/components/NewsCarousel"
import FetchProjectsGrid from "@/components/FetchProjectsGrid"
const API_URL = "http://localhost:4000/projects"
import PartnersSection from "@/components/PartnersSection"
import { Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function GISColombiaPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  // scrollY eliminado: no se usa
  const [showControlPanel, setShowControlPanel] = useState(false)

  // Control panel states
  const [useGradientBg, setUseGradientBg] = useState(true)
  const [headerSticky, setHeaderSticky] = useState(true)
  const [headerFullWidth, setHeaderFullWidth] = useState(true)
  const [version, setVersion] = useState("modern") // modern, classic, minimal

  // useEffect de scroll eliminado: no se usa scrollY
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/news")
      .then(res => res.json())
      .then(data => {
        // Puedes filtrar por destacadas si tienes un campo 'featured' en la noticia
        setFeaturedNews(Array.isArray(data.news) ? data.news : []);
      });
  }, []);


  const nextSlide = () => {
    setCurrentSlide((prev) =>
      featuredNews.length > 0
        ? (prev + 1) % featuredNews.length
        : 0
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      featuredNews.length > 0
        ? (prev - 1 + featuredNews.length) % featuredNews.length
        : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const getBackgroundClass = () => {
    if (useGradientBg) {
      return "bg-gradient-to-br from-orange-50 via-red-50 to-orange-100"
    }
    return "bg-orange-50"
  }

  const getHeaderClass = () => {
    let baseClass = "z-50 bg-white/90 backdrop-blur-md shadow-lg border border-orange-200/50"

    if (headerSticky) {
      baseClass += " fixed"
      if (headerFullWidth) {
        baseClass += " top-0 left-0 right-0"
      } else {
        baseClass += " top-4 left-4 right-4 rounded-lg"
      }
    } else {
      baseClass += " relative"
      if (!headerFullWidth) {
        baseClass += " mx-4 rounded-lg"
      }
    }

    return baseClass
  }

  const getVersionStyles = () => {
    switch (version) {
      case "classic":
        return {
          heroTitle: "text-4xl md:text-6xl font-serif",
          sectionTitle: "text-3xl font-serif",
          cardStyle: "border-2 border-orange-200",
        }
      case "minimal":
        return {
          heroTitle: "text-4xl md:text-6xl font-light",
          sectionTitle: "text-3xl font-light",
          cardStyle: "shadow-sm border-0",
        }
      default: // modern
        return {
          heroTitle: "text-5xl md:text-7xl font-bold",
          sectionTitle: "text-4xl font-bold",
          cardStyle: "shadow-lg",
        }
    }
  }

  const styles = getVersionStyles()

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-[60]">
        <Button
          onClick={() => setShowControlPanel(!showControlPanel)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg"
        >
          <Settings className="w-5 h-5" />
        </Button>

        {showControlPanel && (
          <div className="absolute top-14 right-0 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-orange-200 p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Panel de Control</h3>
              <Button onClick={() => setShowControlPanel(false)} variant="ghost" size="sm" className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Versión del sitio</label>
                <select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full p-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="modern">Moderna</option>
                  <option value="classic">Clásica</option>
                  <option value="minimal">Minimalista</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Fondo degradado</label>
                <Switch checked={useGradientBg} onCheckedChange={setUseGradientBg} />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Header fijo</label>
                <Switch checked={headerSticky} onCheckedChange={setHeaderSticky} />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Header ancho completo</label>
                <Switch checked={headerFullWidth} onCheckedChange={setHeaderFullWidth} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Header getHeaderClass={getHeaderClass} />
      <HeroSection
        title="GIS Colombia"
        description={
          "Construimos el futuro de Bogotá: proyectos de infraestructura y vivienda con calidad, cumplimiento y transparencia.\nEspecialistas en licitaciones públicas y privadas."
        }
        height={480}
      />
      <NewsCarousel
        featuredNews={featuredNews}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        setCurrentSlide={setCurrentSlide}
        styles={styles}
      />
      {/* Obtener proyectos desde el backend y pasarlos a ProjectsGrid */}
      <FetchProjectsGrid styles={styles} />
      <PartnersSection styles={styles} />
      <Footer />
    </div>
  )
}
