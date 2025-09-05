"use client"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Calendar, Building2, Users, ArrowLeft, Share2, Tag, Clock } from "lucide-react"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  "http://localhost:4000"
const PROJECTS_API = `${API_URL}/projects`
const BUNNY_STORAGE_URL = process.env.NEXT_PUBLIC_BUNNY_STORAGE_API || "https://gis-web.b-cdn.net"

function constructImageUrl(imagePath: string | undefined | null): string {
  if (!imagePath || imagePath.trim() === "") return "/placeholder.jpg"
  if (imagePath.startsWith("http")) return imagePath
  if (imagePath.startsWith("/images/")) {
    return `${BUNNY_STORAGE_URL}${imagePath}`
  }
  return "/placeholder.jpg"
}

// Define el tipo para ProyectoDetalle según tu modelo de datos
type ProyectoDetalle = {
  id: string
  title: string
  description: string
  date: string
  image?: string
  category: string
  objeto?: string
  imagenPrincipal?: string
  image1?: string
  image2?: string
  fechaInicial?: string
  fechaFinal?: string
  consorcio?: string
  descripcion?: string
  // agrega aquí cualquier otro campo que uses en el componente
}

export default function ClientProyectoDetalle() {
  const params = useParams()
  const id = params?.id
  // Cambia los useState y fetch para usar el tipo correcto en vez de any
  const [proyecto, setProyecto] = useState<ProyectoDetalle | null>(null)
  const [categories, setCategories] = useState<{ id: string, name: string, color: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(PROJECTS_API)
      .then((res) => res.json())
      .then((data) => {
        const found = (data.projects || []).find((p: any) => p.id === id)
        setProyecto(found || null)
        setCategories(data.categories || [])
        setLoading(false)
      })
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4731F] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando proyecto...</p>
        </div>
      </div>
    )

  if (!proyecto) return notFound()

  const cat = categories.find((c) => c.id === proyecto.category || c.name === proyecto.category)
  const catColor = cat?.color || "#6b7280"
  const catName = cat?.name || proyecto.category || "Sin categoría"

  const mainImage = constructImageUrl(proyecto.imagenPrincipal)
  const secondaryImages = [proyecto.image1, proyecto.image2]
    .filter((img) => !!img && img.trim() !== "")
    .map(img => constructImageUrl(img))

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-300/20 to-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <Header
        getHeaderClass={() =>
          "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-200/50"
        }
      />

      <div className="pt-20 relative z-10">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-[#F4731F] hover:text-orange-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Volver a proyectos</span>
            </button>
          </div>

          <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-[#F4731F]/10 to-orange-200/20 p-6 border-b border-orange-200/30">
              <div className="space-y-4">
                {/* Title section - full width */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-semibold shadow-lg"
                      style={{ backgroundColor: catColor }}
                    >
                      <Tag className="w-4 h-4" />
                      {catName}
                    </span>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-[#F4731F] transition-colors duration-200 bg-white/70 rounded-full px-4 py-2">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Compartir</span>
                    </button>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight text-balance">
                    {proyecto.title}
                  </h1>
                </div>

                {/* Image and Object section - sharing width */}
                <div className="grid lg:grid-cols-2 gap-6 items-start">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/20 to-orange-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                      <Image
                        src={mainImage || "/placeholder.svg"}
                        alt={proyecto.title || "Proyecto"}
                        width={600}
                        height={400}
                        className="rounded-xl object-cover w-full h-auto max-h-[400px] shadow-md"
                      />
                    </div>
                  </div>

                  {proyecto.objeto && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-orange-200/50 flex flex-col h-full">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#F4731F]" />
                        Objeto del proyecto
                      </h2>
                      <p className="text-gray-800 leading-relaxed flex-1 text-xl">{proyecto.objeto}</p>
                    </div>
                  )}
                </div>

                {/* Dates and Consortium section - sharing width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {proyecto.fechaInicial && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                      <div className="flex items-center gap-2 text-[#F4731F] mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold text-sm">Fecha de inicio</span>
                      </div>
                      <p className="text-gray-800 font-medium text-xl">{proyecto.fechaInicial}</p>
                    </div>
                  )}

                  {proyecto.fechaFinal && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                      <div className="flex items-center gap-2 text-[#F4731F] mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold text-sm">Fecha de finalización</span>
                      </div>
                      <p className="text-gray-800 font-medium text-xl">{proyecto.fechaFinal}</p>
                    </div>
                  )}

                  {proyecto.consorcio && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                      <div className="flex items-center gap-2 text-[#F4731F] mb-2">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-sm">Consorcio</span>
                      </div>
                      <p className="text-gray-800 font-medium text-xl">{proyecto.consorcio}</p>
                    </div>
                  )}
                </div>

                {/* Description section */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-[#F4731F]" />
                    Descripción del proyecto
                  </h2>
                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                      {proyecto.descripcion || "Sin descripción"}
                    </div>
                  </div>
                </div>

                {/* Gallery section */}
                {secondaryImages.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      {/* Usa un icono de Lucide en vez de una imagen que no existe */}
                      <span className="w-6 h-6 text-[#F4731F] flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#F4731F]" />
                      </span>
                      Galería del proyecto
                    </h2>

                    {secondaryImages.length === 1 && (
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/10 to-orange-300/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                          <Image
                            src={secondaryImages[0]}
                            alt={`Imagen del proyecto`}
                            width={800}
                            height={400}
                            className="rounded-xl object-cover w-full h-auto max-h-[400px] shadow-md"
                          />
                        </div>
                      </div>
                    )}

                    {secondaryImages.length === 2 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {secondaryImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/10 to-orange-300/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                              <Image
                                src={img}
                                alt={`Imagen del proyecto ${idx + 1}`}
                                width={400}
                                height={300}
                                className="rounded-xl object-cover w-full h-auto max-h-[300px] shadow-md"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
}

