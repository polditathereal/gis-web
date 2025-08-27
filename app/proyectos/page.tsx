"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Search, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import ProjectCard from "@/components/ProjectCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const API_URL = "http://localhost:4000/projects"

export default function ProyectosPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const loadedProjects = data.projects || []
        setProjects(loadedProjects)
        setFilteredProjects(loadedProjects)
      })
  }, [])

  useEffect(() => {
    let filtered = projects
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          String(project.title || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(project.descripcion || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.fechaInicial)
      const dateB = new Date(b.fechaFinal)
      return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })
    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategory, sortOrder, projects])

  const [categories, setCategories] = useState<any[]>([])
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || [])
      })
  }, [])

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar proyectos..."
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

        <div className="flex-1 flex overflow-hidden">
          <aside className="hidden lg:block w-80 bg-white/95 backdrop-blur-sm border-r border-orange-200/50 shadow-lg">
            <div className="h-full overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-6 h-6 text-[#F4731F]" />
                  <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Buscar proyectos</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar por título o descripción..."
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
                      {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">Ordenar por</label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="border-orange-200 focus:ring-[#F4731F] bg-white/80 backdrop-blur-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm">
                      <SelectItem value="newest">Más recientes</SelectItem>
                      <SelectItem value="oldest">Más antiguos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-6 border-t border-orange-200/50">
                  <div className="bg-gradient-to-r from-[#F4731F]/10 to-orange-200/20 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 text-center">
                      <span className="text-[#F4731F] font-bold text-lg">{filteredProjects.length}</span>
                      <br />
                      {filteredProjects.length === 1 ? "proyecto encontrado" : "proyectos encontrados"}
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
                  Nuestros <span className="text-[#F4731F]">Proyectos</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Descubre las soluciones tecnológicas innovadoras que hemos desarrollado para nuestros clientes.
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
                        <span className="text-[#F4731F] font-bold">{filteredProjects.length}</span> proyectos
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`grid gap-6 lg:gap-8 ${
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1"
                  }`}
                >
                  {filteredProjects.map((project) => {
                    const cat = categories.find((c) => c.name === project.category || c.id === project.category)
                    return (
                      <a key={project.id} href={`/proyectos/${project.id}`} className="block group">
                        <div className="transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                          <ProjectCard
                            project={{
                              ...project,
                              descripcion: project.descripcion ?? "",
                              categoriaNombre: cat ? cat.name : "",
                              categoriaColor: cat ? cat.color : "#BDBDBD",
                            }}
                          />
                        </div>
                      </a>
                    )
                  })}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-orange-200/50 max-w-md mx-auto">
                      <div className="text-gray-400 mb-6">
                        <Search className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-4">No se encontraron proyectos</h3>
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