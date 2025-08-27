"use client"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Calendar, Building2, Users, ArrowLeft, Share2, Tag, Clock } from "lucide-react"

const API_URL = "http://localhost:4000/projects"

export default function ClientProyectoDetalle() {
  const params = useParams()
  const id = params?.id
  const [project, setProject] = useState<any | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const found = (data.projects || []).find((p: any) => p.id === id)
        setProject(found || null)
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

  if (!project) return notFound()

  const cat = categories.find((c) => c.id === project.category || c.name === project.category)
  const catColor = cat?.color || "#6b7280"
  const catName = cat?.name || project.category || "Sin categoría"

  const mainImage =
    project.imagenPrincipal && project.imagenPrincipal.startsWith("/images/")
      ? `http://localhost:4000${project.imagenPrincipal}`
      : project.imagenPrincipal || "/placeholder.jpg"

  const secondaryImages = [project.image1, project.image2].filter((img) => !!img)

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
            <div className="bg-gradient-to-r from-[#F4731F]/10 to-orange-200/20 p-8 border-b border-orange-200/30">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
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
                    {project.title}
                  </h1>

                  {project.objeto && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#F4731F]" />
                        Objeto del proyecto
                      </h2>
                      <p className="text-gray-700">{project.objeto}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.fechaInicial && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                        <div className="flex items-center gap-2 text-[#F4731F] mb-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-semibold text-sm">Fecha de inicio</span>
                        </div>
                        <p className="text-gray-800 font-medium">{project.fechaInicial}</p>
                      </div>
                    )}
                    {project.fechaFinal && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                        <div className="flex items-center gap-2 text-[#F4731F] mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold text-sm">Fecha de finalización</span>
                        </div>
                        <p className="text-gray-800 font-medium">{project.fechaFinal}</p>
                      </div>
                    )}
                  </div>

                  {project.consorcio && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-orange-200/50">
                      <div className="flex items-center gap-2 text-[#F4731F] mb-2">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-sm">Consorcio</span>
                      </div>
                      <p className="text-gray-800 font-medium">{project.consorcio}</p>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/20 to-orange-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                    <Image
                      src={mainImage || "/placeholder.svg"}
                      alt={project.title || "Proyecto"}
                      width={600}
                      height={400}
                      className="rounded-xl object-cover w-full h-auto max-h-[400px] shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-[#F4731F]" />
                    Descripción del proyecto
                  </h2>
                  <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                      {project.descripcion || "Sin descripción"}
                    </div>
                  </div>
                </div>

                {secondaryImages.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-[#F4731F]" />
                      Galería del proyecto
                    </h2>

                    {secondaryImages.length === 1 && (
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/10 to-orange-300/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                          {secondaryImages[0] ? (
                            <Image
                              src={
                                secondaryImages[0] && secondaryImages[0].startsWith("/images/")
                                  ? `http://localhost:4000${secondaryImages[0]}`
                                  : secondaryImages[0]
                              }
                              alt={`Imagen del proyecto`}
                              width={800}
                              height={400}
                              className="rounded-xl object-cover w-full h-auto max-h-[400px] shadow-md"
                            />
                          ) : null}
                        </div>
                      </div>
                    )}

                    {secondaryImages.length === 2 && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {secondaryImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/10 to-orange-300/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                              {img ? (
                                <Image
                                  src={
                                    img && img.startsWith("/images/")
                                      ? `http://localhost:4000${img}`
                                      : img
                                  }
                                  alt={`Imagen del proyecto ${idx + 1}`}
                                  width={400}
                                  height={300}
                                  className="rounded-xl object-cover w-full h-auto max-h-[300px] shadow-md"
                                />
                              ) : null}
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