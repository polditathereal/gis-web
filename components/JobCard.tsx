"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Mail, DollarSign, FileText, Building, X, Linkedin } from "lucide-react"

interface JobCardProps {
  job: {
    id: string
    title: string
    description: string
    date: string
    category: string
    categoriaNombre?: string
    categoriaColor?: string
    salary?: string
    contractType?: string
    requirements?: string[]
    linkedin?: string // Changed to linkedin
  }
  viewMode?: "grid" | "list"
}

export default function JobCard({ job, viewMode = "grid" }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const color = job.categoriaColor || "#F4731F"

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <div
        className={`group bg-white/95 backdrop-blur-xl border border-[#F4731F]/20 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden rounded-2xl hover:-translate-y-1 hover:scale-[1.01] ${
          viewMode === "list" ? "flex flex-row" : "flex flex-col min-h-[200px]"
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className={`px-6 py-6 flex flex-col gap-4 rounded-2xl relative overflow-hidden ${viewMode === "list" ? "flex-1" : "h-full"}`}
        >
          <div className="flex items-start justify-between relative z-10 mb-2">
            <div className="flex-1 pr-2">
              <div className="text-xl font-bold text-[#F4731F] group-hover:text-orange-600 transition-colors line-clamp-2 mb-3">
                {job.title}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>

            {/* Category Badge */}
            {job.categoriaNombre && (
              <div className="ml-2 flex-shrink-0">
                <span
                  className="text-white font-semibold text-xs px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 shadow-lg whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    boxShadow: `0 4px 12px 0 rgba(0,0,0,0.15)`,
                  }}
                >
                  {job.categoriaNombre}
                </span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-2 relative z-10">
            {job.linkedin && (
              <a
                href={job.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkedInClick}
                className="inline-flex items-center gap-2 bg-[#0077B5] hover:bg-[#005885] text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Linkedin className="w-4 h-4" />
                <span>Ver en LinkedIn</span>
              </a>
            )}
          </div>

          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="p-8 space-y-6">
              {/* Header with GIS Logo Style */}
              <div className="text-center border-b border-orange-200 pb-4">
                <div className="text-sm text-gray-600 font-medium mb-2">GRUPO GIS</div>
                <div className="text-xs text-gray-500 mb-3">OMICRON - CIESA</div>
                <div className="text-lg font-bold text-gray-800 mb-2">Oportunidad Laboral</div>
                <div
                  className="text-2xl font-bold text-white px-6 py-3 rounded-lg mx-auto inline-block"
                  style={{ backgroundColor: color }}
                >
                  {job.title}
                </div>
              </div>

              {/* Profile Section */}
              <div className="space-y-4">
                <div className="bg-orange-50/80 rounded-xl p-4 border border-orange-200/50">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#F4731F]" />
                    PERFIL
                  </h3>
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{job.description}</div>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Salary */}
                  {job.salary && (
                    <div className="bg-white/80 rounded-xl p-4 border border-orange-200/30">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-[#F4731F]" />
                        <span className="font-bold text-gray-800">Salario:</span>
                      </div>
                      <div className="text-gray-700 text-sm">{job.salary}</div>
                    </div>
                  )}

                  {/* Contract Type */}
                  {job.contractType && (
                    <div className="bg-white/80 rounded-xl p-4 border border-orange-200/30">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-[#F4731F]" />
                        <span className="font-bold text-gray-800">Tipo de Contrato:</span>
                      </div>
                      <div className="text-gray-700 text-sm">{job.contractType}</div>
                    </div>
                  )}

                  {/* Location - Always Bogotá */}
                  <div className="bg-white/80 rounded-xl p-4 border border-orange-200/30">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-[#F4731F]" />
                      <span className="font-bold text-gray-800">Lugar de Trabajo:</span>
                    </div>
                    <div className="text-gray-700 text-sm">Bogotá, Zona San Cristóbal</div>
                  </div>

                  {/* Category */}
                  {job.categoriaNombre && (
                    <div className="bg-white/80 rounded-xl p-4 border border-orange-200/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-5 h-5 text-[#F4731F]" />
                        <span className="font-bold text-gray-800">Área:</span>
                      </div>
                      <div className="text-gray-700 text-sm">{job.categoriaNombre}</div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Email Contact */}
                  <div
                    className="flex-1 text-center py-4 rounded-xl text-white font-bold"
                    style={{ backgroundColor: color }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Mail className="w-5 h-5" />
                      <span>Envía tu HV</span>
                    </div>
                    <div className="text-sm opacity-90">coordghumana@grupogiscolombia.com</div>
                  </div>

                  {/* LinkedIn Button */}
                  {job.linkedin && (
                    <a
                      href={job.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#0077B5] hover:bg-[#005885] text-white font-bold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>Ver en LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
