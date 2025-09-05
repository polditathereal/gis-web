"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Search, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import NewsCard from "@/components/NewsCard"

const API_URL = process.env.NEXT_PUBLIC_API_URL_PROD || process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://localhost:4000"

type NoticiaType = {
  id: string
  title: string
  description: string
  date: string
  image?: string
  category: string
  categoriaColor?: string
  featured?: boolean
  author?: string
  readTime?: string
  categoryName?: string
}

type CategoriaType = {
  id: string
  name: string
  color: string
}

export default function NoticiasPage() {
  const [news, setNews] = useState<NoticiaType[]>([])
  const [filteredNews, setFilteredNews] = useState<NoticiaType[]>([])
  const [categories, setCategories] = useState<CategoriaType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data: { news: NoticiaType[]; categories: CategoriaType[] }) => {
        setNews(data.news || [])
        setFilteredNews(data.news || [])
        setCategories(data.categories || [])
      })
  }, [])

  useEffect(() => {
    let filtered = news
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
    setFilteredNews(filtered)
  }, [searchTerm, selectedCategory, news])

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "bg-gray-500"
  }

  const regularNews = filteredNews

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

      <div className="pt-16 h-screen flex flex-col">
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-orange-200/50 p-4 relative z-40">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-[#F4731F]" />
              <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 text-sm border-orange-200 focus:ring-[#F4731F] focus:border-[#F4731F] bg-white/80"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="text-sm border-orange-200 focus:ring-[#F4731F] bg-white/80">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <aside className="hidden lg:block w-80 bg-white/95 backdrop-blur-sm border-r border-orange-200/50 shadow-lg">
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-6 h-6 text-[#F4731F]" />
                  <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Buscar noticias</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar por título o contenido..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-orange-200 focus:ring-[#F4731F] focus:border-[#F4731F] bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Categoría</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-orange-200 focus:ring-[#F4731F] bg-white/80 backdrop-blur-sm">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm">
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-6 border-t border-orange-200/50">
                  <div className="bg-gradient-to-r from-[#F4731F]/10 to-orange-200/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 text-center">
                      <span className="text-[#F4731F] font-bold text-lg">{filteredNews.length}</span>
                      <br />
                      {filteredNews.length === 1 ? "noticia encontrada" : "noticias encontradas"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="text-center mb-8 lg:mb-12">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 lg:mb-6 text-balance">
                  Últimas <span className="text-[#F4731F]">Noticias</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Mantente al día con las últimas novedades y desarrollos de GIS Colombia.
                </p>
              </div>

              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">Vista:</span>
                    <div className="flex bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-orange-200/50">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === "grid"
                            ? "bg-[#F4731F] text-white shadow-md"
                            : "text-gray-600 hover:text-[#F4731F]"
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === "list"
                            ? "bg-[#F4731F] text-white shadow-md"
                            : "text-gray-600 hover:text-[#F4731F]"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:hidden">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-200/50">
                      <span className="text-sm font-medium text-gray-700">
                        <span className="text-[#F4731F] font-bold">{filteredNews.length}</span> noticias
                      </span>
                    </div>
                  </div>
                </div>

                {regularNews.length > 0 && (
                  <div
                    className={`grid gap-6 lg:gap-8 ${
                      viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                    }`}
                  >
                    {regularNews.map((item) => (
                      <a key={item.id} href={`/noticias/${item.id}`} className="block group">
                        <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                          <NewsCard
                            news={{
                              ...item,
                              image: item.image && item.image.startsWith("/images/") ? item.image : "/placeholder.jpg",
                              categoriaColor: getCategoryColor(item.category),
                              categoryName: categories.find((cat) => cat.id === item.category)?.name ?? "",
                            }}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {filteredNews.length === 0 && (
                  <div className="text-center py-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-orange-200/50 max-w-md mx-auto">
                      <div className="text-gray-400 mb-6">
                        <Search className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">No se encontraron noticias</h3>
                      <p className="text-gray-500 mb-6">
                        Intenta ajustar los filtros de búsqueda para encontrar lo que buscas
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("")
                          setSelectedCategory("all")
                        }}
                        className="bg-[#F4731F] text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}