// page.tsx
"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import GroupSection from "@/components/GroupSection"
import NewsCarousel from "@/components/NewsCarousel"
import FetchProjectsGrid from "@/components/FetchProjectsGrid"
const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  "http://localhost:4000"
import PartnersSection from "@/components/PartnersSection"

type NewsItem = {
  // Ajusta los campos según la estructura real de tus noticias
  id: string
  title: string
  [key: string]: unknown
}

export default function GISColombiaPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [useGradientBg] = useState(true)
  const [headerSticky] = useState(true)
  const [headerFullWidth] = useState(true)
  const [version] = useState("modern")
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Si ves ERR_CONNECTION_REFUSED, el backend en http://localhost:4000 no está corriendo o no es accesible.
    // Solución: 
    // 1. Asegúrate de que el backend esté iniciado: node server.js (en tu carpeta gis-back)
    // 2. Si usas Vercel o un entorno remoto, asegúrate de que API_URL apunte al backend correcto.
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        setFeaturedNews(Array.isArray(data.news) ? data.news : []);
      })
      .catch((err) => {
        // Opcional: muestra un mensaje de error en la UI si el fetch falla
        console.error("No se pudo conectar al backend:", err);
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
  }, [featuredNews, nextSlide])

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
      default:
        return {
          heroTitle: "text-5xl md:text-7xl font-bold",
          sectionTitle: "text-4xl font-bold",
          cardStyle: "shadow-lg",
        }
    }
  }

  const styles = getVersionStyles()

  return (
    <div className={`min-h-screen pt-[80px] ${getBackgroundClass()}`}>
      <Header getHeaderClass={getHeaderClass} />
      <HeroSection />
      <AboutSection styles={styles} />
      <GroupSection styles={styles} />
      <NewsCarousel
        featuredNews={featuredNews}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        setCurrentSlide={setCurrentSlide}
        styles={styles}
      />
      <FetchProjectsGrid styles={styles} />
      <PartnersSection styles={styles} />
      <Footer />
    </div>
  )
}
