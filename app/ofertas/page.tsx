"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Search, SlidersHorizontal, Grid, List } from "lucide-react"
import JobCard from "@/components/JobCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Actualiza el tipo OfertaType para incluir las propiedades adicionales:
type OfertaType = {
  id: number
  title: string
  description: string
  category: string | number
  categoriaNombre?: string
  categoriaColor?: string
  [key: string]: any
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  "http://localhost:4000"

const API = `${API_URL}/jobs`

export default function OfertasPage() {
  const [jobs, setJobs] = useState<OfertaType[]>([])
  const [filteredJobs, setFilteredJobs] = useState<OfertaType[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [categories, setCategories] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const allJobs = data.jobs || []
        setJobs(allJobs)
        setFilteredJobs(allJobs)
        setCategories(data.categories || [])
      })
  }, [])

  useEffect(() => {
    let filtered = jobs
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          String(job.title || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(job.description || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((job) => job.category === selectedCategory)
    }
    filtered = filtered.sort((a, b) => {
      return sortOrder === "newest" ? b.id - a.id : a.id - b.id
    })
    setFilteredJobs(filtered)
  }, [searchTerm, selectedCategory, sortOrder, jobs])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <Header
        getHeaderClass={() =>
          "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-200/50"
        }
      />

      <div className="pt-16 h-screen flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 bg-white/95 backdrop-blur-xl border-r border-orange-200/50 overflow-y-auto">
          <div className="sticky top-0 p-6 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <SlidersHorizontal className="w-6 h-6 text-[#F4731F]" />
              <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Buscar ofertas</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar por título o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-orange-200 focus:ring-[#F4731F] focus:border-[#F4731F] bg-white/80"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Categoría</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-orange-200 focus:ring-[#F4731F] bg-white/80">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Ordenar por</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="border-orange-200 focus:ring-[#F4731F] bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="oldest">Más antiguos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="pt-4 border-t border-orange-200/50">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-[#F4731F]">{filteredJobs.length}</span> ofertas encontradas
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Filters */}
          <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-orange-200/50 p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <SlidersHorizontal className="w-5 h-5 text-[#F4731F]" />
                <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar ofertas..."
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
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="text-sm border-orange-200 focus:ring-[#F4731F] bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Content Area with Independent Scroll */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 text-balance">
                    Ofertas de <span className="text-[#F4731F]">Empleo</span>
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Consulta las oportunidades laborales disponibles y forma parte de nuestro equipo.
                  </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-orange-200/50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-[#F4731F] text-white shadow-md"
                        : "text-gray-600 hover:text-[#F4731F] hover:bg-orange-50"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-[#F4731F] text-white shadow-md"
                        : "text-gray-600 hover:text-[#F4731F] hover:bg-orange-50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Jobs Grid/List */}
              <div className="max-w-7xl mx-auto">
                <div
                  className={`gap-6 lg:gap-8 ${
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 auto-rows-max"
                      : "flex flex-col space-y-4"
                  }`}
                >
                  {filteredJobs.map((job) => {
                    const cat = categories.find((c) => c.id === job.category || c.name === job.category)
                    return (
                      <JobCard
                        key={`job-${job.id}`}
                        oferta={{
                          ...job,
                          categoriaNombre: cat ? cat.name : "",
                          categoriaColor: cat ? cat.color : "#BDBDBD",
                        }}
                        viewMode={viewMode}
                      />
                    )
                  })}
                </div>

                {/* Empty State */}
                {filteredJobs.length === 0 && (
                  <div className="text-center py-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-orange-200/50 max-w-md mx-auto">
                      <div className="text-gray-400 mb-6">
                        <Search className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">No se encontraron ofertas</h3>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}