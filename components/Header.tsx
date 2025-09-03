"use client"

import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  getHeaderClass: () => string
}

export default function Header({ getHeaderClass }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={getHeaderClass() + " h-[72px] min-h-[72px] backdrop-blur-xl border-b border-white/10"}>
      <div className="container mx-auto px-6 h-full">
        <nav className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <img
                src="/images/gis-colombia-logo.png"
                alt="GIS Colombia Logo"
                width={70}
                height={40}
                className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/#inicio", label: "Inicio" },
              { href: "/#nosotros", label: "Nosotros" },
              { href: "/#proyectos", label: "Proyectos" },
              { href: "/#noticias", label: "Noticias" },
              { href: "/#socios", label: "Socios" },
              { href: "/#contacto", label: "Contacto" },
              { href: "/ofertas", label: "Ofertas" }, // <-- Añadido
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-700 hover:text-[#F4731F] transition-all duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F4731F] to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-[#F4731F]/30 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Abrir menú"
            onClick={() => setMobileMenuOpen((open) => !open)}
            style={{ zIndex: 100 }}
          >
            <span
              className={`block w-6 h-0.5 bg-[#F4731F] rounded-full mb-1.5 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F4731F] rounded-full mb-1.5 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#F4731F] rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full mt-2 bg-white/95 backdrop-blur-xl border border-[#F4731F]/20 rounded-2xl shadow-2xl p-6 flex flex-col space-y-4 z-50 animate-in slide-in-from-top-2 duration-200">
            {[
              { href: "/#inicio", label: "Inicio" },
              { href: "/#nosotros", label: "Nosotros" },
              { href: "/#proyectos", label: "Proyectos" },
              { href: "/#noticias", label: "Noticias" },
              { href: "/#socios", label: "Socios" },
              { href: "/#contacto", label: "Contacto" },
              { href: "/ofertas", label: "Ofertas" }, // <-- Añadido
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#F4731F] hover:bg-orange-50 transition-all duration-200 py-2 px-4 rounded-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}