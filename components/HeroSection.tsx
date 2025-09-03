// HeroSection.tsx
"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Building2, HardHat, Ruler, ArrowRight, Construction } from "lucide-react"
import { IsoBadge } from "@/components/IsoBadge"

type Props = {
  title?: string
  subtitle?: string
  images?: string[]
}

const DEFAULT_IMAGES = [
  "/images/hero/11.jpg",
  "/images/hero/img_0600.jpg",
  "/images/hero/IMG_20190829_112035831_HDR.jpg",
  "/images/hero/IMG_20190829_142523673_HDR-1.jpg",
]

export default function HeroConstructora({
  title = "Construimos espacios que transforman ciudades",
  subtitle = "Infraestructura y vivienda con calidad, cumplimiento y transparencia. Especialistas en licitaciones públicas y privadas.",
  images = DEFAULT_IMAGES,
}: Props) {
  const [idx, setIdx] = useState(0)
  const [counts, setCounts] = useState({ exp: 0, proyectos: 0, clientes: 0 })

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 4500)
    return () => clearInterval(id)
  }, [images.length])

  useEffect(() => {
    const target = { exp: 12, proyectos: 140, clientes: 80 }
    const duration = 900
    const steps = Math.round(duration / 30)
    let frame = 0
    const inc = {
      exp: target.exp / steps,
      proyectos: target.proyectos / steps,
      clientes: target.clientes / steps,
    }
    const id = setInterval(() => {
      frame++
      setCounts((p) => ({
        exp: Math.min(target.exp, p.exp + inc.exp),
        proyectos: Math.min(target.proyectos, p.proyectos + inc.proyectos),
        clientes: Math.min(target.clientes, p.clientes + inc.clientes),
      }))
      if (frame >= steps) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative isolate w-full h-[calc(100dvh-80px)] overflow-hidden text-white">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src || "/placeholder.svg"}
            alt="Proyecto de construcción"
            fill
            priority={i === idx}
            sizes="100vw"
            className={`object-cover object-center transition-all duration-1000 ease-out ${
              i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-start">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                {/* Partículas arriba a la izquierda de GIS */}
                <div className="relative">
                  
                  {/* Título GIS */}
                  <div className="hidden lg:flex items-center gap-4 mb-4">
                    
                    <span className="text-sm uppercase tracking-[0.2em] text-orange-200/80 font-medium">
                      Ingeniería • Consultoría • Estudios • Diseño
                    </span>
                  </div>
                  <h1 className="space-y-2">
                    <div className="flex items-center gap-3 md:gap-6">
                      
                      <span className="font-OPTIEdgar-Extended text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-[#F4731F] drop-shadow-2xl tracking-tight leading-none">
                        <div className="absolute -top-6 -left-6 z-20">
                    <div className="relative w-16 h-16">
                      <div className="absolute top-8 left-2">
                        <Construction className="w-5 h-5 text-[#F4731F]/60 animate-pulse delay-500" />
                      </div>
                    </div>
                  </div>
                        
                        GIS
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-lg leading-tight">
                          Colombia
                        </span>
                        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#F4731F] to-orange-400 mt-2" />
                      </div>
                    </div>
                  </h1>
                </div>

              
              </div>

              <div className="hidden lg:grid sm:grid-cols-3 gap-4 max-w-4xl">
                <ModernBullet
                  icon={<HardHat className="w-6 h-6" />}
                  text="Seguridad y cumplimiento"
                  gradient="from-blue-500 to-blue-600"
                />
                <ModernBullet
                  icon={<Ruler className="w-6 h-6" />}
                  text="Diseño y control de calidad"
                  gradient="from-green-500 to-green-600"
                />
                <ModernBullet
                  icon={<Building2 className="w-6 h-6" />}
                  text="Infraestructura y vivienda"
                  gradient="from-purple-500 to-purple-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <a
                  href="/proyectos"
                  className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#F4731F] to-orange-500 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 font-bold text-white hover:from-orange-500 hover:to-[#F4731F] transition-all duration-300 text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
                >
                  <span>Ver proyectos</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#contacto"
                  className="hidden sm:inline-flex group items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-8 lg:px-10 py-4 lg:py-5 font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-base sm:text-lg backdrop-blur-md"
                >
                  <span>Contactar</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </a>
              </div>

              <div className="hidden lg:grid grid-cols-3 max-w-2xl gap-8">
                <ModernStat number={`${Math.round(counts.exp)}+`} label="Años de experiencia" />
                <ModernStat number={`${Math.round(counts.proyectos)}+`} label="Proyectos" />
                <ModernStat number={`${Math.round(counts.clientes)}+`} label="Clientes" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-20">
          <div className="bg-black/20 rounded-2xl sm:rounded-3xl border border-white/20 p-3 sm:p-4 lg:p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-2 sm:gap-3">
              <IsoBadge code="9001" size="sm" className="sm:hidden" />
              <IsoBadge code="14001" size="sm" className="sm:hidden" />
              <IsoBadge code="45001" size="sm" className="sm:hidden" />
            </div>
            <div className="hidden sm:flex flex-col gap-3">
              <IsoBadge code="9001" size="md" />
              <IsoBadge code="14001" size="md" />
              <IsoBadge code="45001" size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ModernBullet({ icon, text, gradient }: { icon: React.ReactNode; text: string; gradient: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
        >
          <span className="text-white">{icon}</span>
        </div>
        <span className="text-base font-medium text-white/95 leading-tight">{text}</span>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
      />
    </div>
  )
}

function ModernStat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center group">
      <div className="relative">
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-[#F4731F] to-orange-400 bg-clip-text text-transparent leading-none mb-2 group-hover:scale-110 transition-transform">
          {number}
        </div>
        <div className="absolute inset-0 text-5xl md:text-6xl font-black text-[#F4731F]/20 blur-sm leading-none">
          {number}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</div>
    </div>
  )
}