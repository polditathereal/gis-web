"use client"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
const API_URL = "http://localhost:4000/projects"
import { useParams } from "next/navigation"
import Image from "next/image"

export default function ClientProyectoDetalle() {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const found = (data.projects || []).find((p: any) => p.id === id);
        setProject(found || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <Header getHeaderClass={() => "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-200/50"} />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{project.objeto}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/80 p-4 rounded-lg border border-orange-200">
              <div>
                <span className="font-semibold text-gray-700">Categoría:</span> {project.category}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Tipo:</span> {project.tipo}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Tema:</span> {project.tema}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Entidad Contratante:</span> {project.entidadContratante}
              </div>
              <div>
                <span className="font-semibold text-gray-700">País Origen:</span> {project.paisOrigen}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Tipo2:</span> {project.tipo2}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Fecha inicial:</span> {project.fechaInicial}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Fecha final:</span> {project.fechaFinal}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Consorcio:</span> {project.consorcio}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Integrantes:</span> {project.integrantes}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Descripción:</span> {project.descripcion}
              </div>
              <div className="md:col-span-2 mt-4 flex gap-4 flex-wrap">
                {["imagenPrincipal", "image1", "image2"].map((imgKey) => (
                  <Image
                    key={imgKey}
                    src={project[imgKey] && project[imgKey].startsWith('/images/')
                      ? `http://localhost:4000${project[imgKey]}`
                      : (project[imgKey] || '/placeholder.jpg')}
                    alt={imgKey}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
