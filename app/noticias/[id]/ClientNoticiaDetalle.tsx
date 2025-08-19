"use client"
import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useParams } from "next/navigation"
import Image from "next/image"

const API_URL = "http://localhost:4000/news"

export default function ClientNoticiaDetalle() {
  const params = useParams();
  const id = params?.id;
  const [noticia, setNoticia] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const found = (data.news || []).find((n: any) => n.id === id);
        setNoticia(found || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (!noticia) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <Header getHeaderClass={() => "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-200/50"} />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{noticia.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/80 p-4 rounded-lg border border-orange-200">
              <div>
                <span className="font-semibold text-gray-700">Categoría:</span> {noticia.category}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Autor:</span> {noticia.author}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Fecha:</span> {noticia.date ? new Date(noticia.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }) : "Sin fecha"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Tiempo de lectura:</span> {noticia.readTime}
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold text-gray-700">Descripción:</span> {noticia.description}
              </div>
              <div className="md:col-span-2 mt-4">
                <Image
                  src={noticia.image1 && noticia.image1.startsWith('/images/')
                    ? `http://localhost:4000${noticia.image1}`
                    : (noticia.image1 || '/placeholder.svg')}
                  alt={noticia.title || "Noticia"}
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
