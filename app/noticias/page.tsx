"use client"

// ...eliminado: categoryColors no usado...

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// ...eliminado: Link no usado...
import { Search, Clock, User, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
const API_URL = "http://localhost:4000/news"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import NewsCard from "@/components/NewsCard"

export default function NoticiasPage() {
  const [news, setNews] = useState<any[]>([])
  const [filteredNews, setFilteredNews] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
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
    const category = categories.find((cat: any) => cat.id === categoryId)
    return category ? category.color : "bg-gray-500"
  }

  const regularNews = filteredNews

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <Header getHeaderClass={() => "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-200/50"} />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Últimas Noticias</h1>
            <p className="text-gray-600 text-lg mb-6">
              Mantente al día con las últimas novedades y desarrollos de GIS Colombia.
            </p>

            <div className="flex flex-col md:flex-row md:items-center bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-orange-200 gap-4">
              <div className="flex flex-col md:flex-row md:items-center w-full gap-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar noticias..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div className="md:w-64 flex flex-col justify-end">
                  <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-0 md:mr-2 md:sr-only">Categoría</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-orange-200 focus:ring-orange-500 bg-white">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-600 md:ml-4 md:mt-0 mt-2">
                  {filteredNews.length} {filteredNews.length === 1 ? "noticia encontrada" : "noticias encontradas"}
                </div>
              </div>
            </div>
          </div>

          {/* Noticias destacadas eliminadas, solo se muestra el grid de todas las noticias */}

          {regularNews.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Todas las Noticias</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {regularNews.map((item) => (
                  <a
                    key={item.id}
                    href={`/noticias/${item.id}`}
                    className="block"
                  >
                    <NewsCard
                      news={{
                        ...item,
                        image: item.image && item.image.startsWith('/images/')
                          ? item.image
                          : '/placeholder.jpg',
                        categoriaColor: getCategoryColor(item.category),
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron noticias</h3>
              <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}

          {searchTerm && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {filteredNews.length === 0
                  ? `No se encontraron noticias para "${searchTerm}"`
                  : `${filteredNews.length} ${filteredNews.length === 1 ? "noticia encontrada" : "noticias encontradas"} para "${searchTerm}"`}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
