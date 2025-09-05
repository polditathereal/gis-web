"use client"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  "http://localhost:4000"
const NEWS_API = `${API_URL}/news`
const BUNNY_STORAGE_URL = process.env.NEXT_PUBLIC_BUNNY_STORAGE_API || "https://gis-web.b-cdn.net"

function constructImageUrl(imagePath: string | undefined | null): string {
  if (!imagePath || imagePath.trim() === "") return "/placeholder.jpg"
  if (imagePath.startsWith("http")) return imagePath
  if (imagePath.startsWith("/images/")) {
    return `${BUNNY_STORAGE_URL}${imagePath}`
  }
  return "/placeholder.jpg"
}

// Define los tipos correctos para noticia y fetch
type NoticiaDetalle = {
  id: string
  title: string
  description: string
  date: string
  image?: string
  category: string
  // agrega otros campos según tu modelo
}

export default function ClientNoticiaDetalle() {
  const params = useParams()
  const id = params?.id
  const [noticia, setNoticia] = useState<NoticiaDetalle | null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(NEWS_API)
      .then((res) => res.json())
      .then((data) => {
        const found = (data.news || []).find((n: any) => n.id === id)
        setNoticia(found || null)
        setCategories(data.categories || [])
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    fetch(`/api/noticias/${id}`)
      .then((res) => res.json())
      .then((data: { noticia: NoticiaDetalle }) => setNoticia(data.noticia))
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4731F] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando noticia...</p>
        </div>
      </div>
    )

  if (!noticia) return notFound()

  const cat = categories.find((c) => c.id === noticia.category || c.name === noticia.category)
  const catColor = cat?.color || "#6b7280"
  const catName = cat?.name || noticia.category || "Sin categoría"

  const imageUrl = constructImageUrl(noticia.image)

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
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-[#F4731F] hover:text-orange-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Volver a noticias</span>
            </button>
          </div>

          <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-[#F4731F]/10 to-orange-200/20 p-8 border-b border-orange-200/30">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-semibold shadow-lg"
                  style={{ backgroundColor: catColor }}
                >
                  <Tag className="w-4 h-4" />
                  {catName}
                </span>
                {noticia.date && (
                  <div className="flex items-center gap-2 text-gray-600 bg-white/70 rounded-full px-4 py-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{new Date(noticia.date).toLocaleDateString("es-ES")}</span>
                  </div>
                )}
                <button className="ml-auto flex items-center gap-2 text-gray-600 hover:text-[#F4731F] transition-colors duration-200 bg-white/70 rounded-full px-4 py-2">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Compartir</span>
                </button>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight text-balance">
                {noticia.title}
              </h1>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-line font-light">
                      {noticia.description || "Sin descripción"}
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F4731F]/20 to-orange-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={noticia.title || "Noticia"}
                      width={600}
                      height={400}
                      className="rounded-xl object-cover w-full h-auto max-h-[400px] shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  )
}