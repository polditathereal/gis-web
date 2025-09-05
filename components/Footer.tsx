import { Mail, Phone, Linkedin, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F4731F]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/Logo.png"
                alt="GIS Colombia Logo"
                width={400}
                height={80}
                className="h-16 w-auto hover:scale-105 transition-transform duration-300"
                style={{ objectFit: "contain" }}
              />

            </div>

            <p className="text-gray-300 leading-relaxed">
              Con una herencia que se remonta a 1978, GRUPO GIS COLOMBIA consolida en 2007 el expertise y la trayectoria de firmas pioneras: OMICRÓN, CIESA, AMEPRO y GESTIÓN INTEGRAL DEL SUELO. Esta fusión de capacidades y consultoría nos posiciona como un referente integral en servicios de ingeniería y ambiental.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, text: "contacto@giscolombia.com", href: "mailto:contacto@giscolombia.com" },
                { icon: Phone, text: "+57 1 234 5678", href: "tel:+5712345678" },
                { icon: Linkedin, text: "LinkedIn", href: "#" },
              ].map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#F4731F]/30 transition-all duration-300 group"
                >
                  <contact.icon className="w-5 h-5 text-[#F4731F] group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-[#F4731F] transition-colors duration-300">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#F4731F] flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Nuestra Oficina
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <MapPin className="w-5 h-5 text-[#F4731F] mt-1" />
                <div>
                  <span className="text-white font-medium">Bogotá, Colombia</span>
                  <p className="text-gray-400 text-sm mt-1">Sede principal</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 h-48 flex items-center justify-center border border-[#F4731F]/20 hover:border-[#F4731F]/40 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#F4731F]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#F4731F]" />
                  </div>
                  <p className="text-gray-300 font-medium">Mapa de Bogotá</p>
                  <p className="text-sm text-gray-400 mt-1">Ubicación de nuestra oficina</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">© 2024 GIS Colombia. Todos los derechos reservados.</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Ingeniería</span>
              <span>•</span>
              <span>Consultoría</span>
              <span>•</span>
              <span>Estudios</span>
              <span>•</span>
              <span>Diseño</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
