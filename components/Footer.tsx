import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, Linkedin, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contacto" className="bg-gray-800/95 backdrop-blur-sm text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <img
              src="/images/gis-logo.svg"
              alt="GIS Colombia Logo"
              width={150}
              height={50}
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6">
              Soluciones tecnológicas innovadoras para el sector textil y empresarial.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>contacto@giscolombia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>+57 1 234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-orange-400" />
                <a href="#" className="hover:text-orange-400 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Enlaces Rápidos</h3>
            <div className="space-y-3">
              <a href="#inicio" className="block text-gray-300 hover:text-orange-400 transition-colors">
                Inicio
              </a>
              <a href="#nosotros" className="block text-gray-300 hover:text-orange-400 transition-colors">
                Nosotros
              </a>
              <Link href="/proyectos" className="block text-gray-300 hover:text-orange-400 transition-colors">
                Proyectos
              </Link>
              <Link href="/noticias" className="block text-gray-300 hover:text-orange-400 transition-colors">
                Noticias
              </Link>
              <a href="#socios" className="block text-gray-300 hover:text-orange-400 transition-colors">
                Socios
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6">Nuestra Oficina</h3>
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-orange-400 mt-1" />
              <span className="text-gray-300">Bogotá, Colombia</span>
            </div>
            <div className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 h-48 flex items-center justify-center border border-orange-200/20">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                <p className="text-gray-300">Mapa de Bogotá</p>
                <p className="text-sm text-gray-400">Ubicación de nuestra oficina</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 GIS Colombia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
