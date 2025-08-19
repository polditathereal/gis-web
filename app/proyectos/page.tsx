
"use client"


import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Search, Filter } from "lucide-react"
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

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const loadedProjects = data.projects || [];
        setProjects(loadedProjects);
        setFilteredProjects(loadedProjects);
      });
  }, []);

  useEffect(() => {
    let filtered = projects;
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          (String(project.title || "").toLowerCase().includes(searchTerm.toLowerCase())) ||
          (String(project.descripcion || "").toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.fechaInicial);
      const dateB = new Date(b.fechaFinal);
      return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, sortOrder, projects]);

  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
      });
  }, []);

  const getCategoryColor = (categoryId: string) => { 
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <Header getHeaderClass={() => "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-200/50"} />

      <div className="pt-20 flex flex-col md:flex-row">
        <aside className="w-full md:w-80 bg-white/80 backdrop-blur-sm border-orange-200 md:border-r p-6 md:h-screen md:sticky md:top-20 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-orange-600" />
                Filtros
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="border-orange-200 focus:ring-orange-500 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="oldest">Más antiguos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-orange-200">
              <p className="text-sm text-gray-600">
                Mostrando {filteredProjects.length} de {projects.length} proyectos
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Proyectos</h1>
              <p className="text-gray-600 text-lg">
                Descubre las soluciones tecnológicas innovadoras que hemos desarrollado para nuestros clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={`/proyectos/${project.id}`}
                  className="block"
                >
                  <ProjectCard
                    project={{
                      ...project,
                      descripcion: project.descripcion ?? ""
                    }}
                  />
                </a>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron proyectos</h3>
                <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
