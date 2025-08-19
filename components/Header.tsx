"use client"

import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  getHeaderClass: () => string
}

export default function Header({ getHeaderClass }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <header className={getHeaderClass()}>
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <img
                src="/images/gis-logo.svg"
                alt="GIS Colombia Logo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#inicio" className="text-gray-700 hover:text-orange-600 transition-colors">
              Inicio
            </Link>
            <Link href="/#nosotros" className="text-gray-700 hover:text-orange-600 transition-colors">
              Nosotros
            </Link>
            <Link href="/#proyectos" className="text-gray-700 hover:text-orange-600 transition-colors">
              Proyectos
            </Link>
            <Link href="/#noticias" className="text-gray-700 hover:text-orange-600 transition-colors">
              Noticias
            </Link>
            <Link href="/#socios" className="text-gray-700 hover:text-orange-600 transition-colors">
              Socios
            </Link>
            <Link href="/#contacto" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contacto
            </Link>
          </div>
          {/* Hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-12 h-12 bg-white border-2 border-orange-500 rounded-lg shadow-lg active:shadow-inner transition-all duration-150"
            aria-label="Abrir menú"
            onClick={() => setMobileMenuOpen((open) => !open)}
            style={{ zIndex: 100 }}
          >
            <span className="block w-7 h-1 bg-orange-500 rounded mb-1.5 shadow-sm transition-all duration-200" />
            <span className="block w-7 h-1 bg-orange-500 rounded mb-1.5 shadow-sm transition-all duration-200" />
            <span className="block w-7 h-1 bg-orange-500 rounded shadow-sm transition-all duration-200" />
          </button>
        </nav>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white border border-orange-200 rounded-lg shadow-2xl p-6 flex flex-col space-y-4 z-50 transition-all duration-150 origin-top scale-y-100 animate-slide-down"
            style={{ animation: 'slideDownFast 0.15s cubic-bezier(0.4,0,0.2,1)' }}
          >
            <Link href="/#inicio" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </Link>
            <Link href="/#nosotros" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Nosotros
            </Link>
            <Link href="/#proyectos" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Proyectos
            </Link>
            <Link href="/#noticias" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Noticias
            </Link>
            <Link href="/#socios" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Socios
            </Link>
            <Link href="/#contacto" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Contacto
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
