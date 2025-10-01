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
              <a
                href="mailto:goc@grupogiscolombia.com"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#F4731F]/30 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-[#F4731F] group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-[#F4731F] transition-colors duration-300">goc@grupogiscolombia.com</span>
              </a>
              <a
                href="tel:+573122991694"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#F4731F]/30 transition-all duration-300 group"
              >
                <Phone className="w-5 h-5 text-[#F4731F] group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-[#F4731F] transition-colors duration-300">+57 312 299 1694</span>
              </a>
              <a
                href="https://www.linkedin.com/company/grupo-gis-colombia/?originalSubdomain=co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#F4731F]/30 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-[#F4731F] group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-[#F4731F] transition-colors duration-300">LinkedIn</span>
              </a>
              <div>
                <button
                  className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F4731F] to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-all duration-300"
                  onClick={() => window.open("https://www.gis-omicron.com/", "_blank")}
                >
                  Ir a GIS España
                </button>
              </div>
              <div>
                <button
                  className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-[#F4731F] text-white font-bold shadow-lg hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('/Brochure.pdf', '_blank')}
                >
                  Descargar Brochure
                </button>
              </div>
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
                  <span className="text-white font-medium">Av. El Dorado No. 69-63, Ac. 26 #26 Bogotá</span>
                  <p className="text-gray-400 text-sm mt-1">Edificio Torre 26 - Oficina 408</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-0 h-64 flex items-center justify-center border border-[#F4731F]/20 hover:border-[#F4731F]/40 transition-all duration-300 overflow-hidden">
                <iframe
                  title="Ubicación GIS Colombia"
                  src="https://www.google.com/maps?q=Av.+El+Dorado+No.+69-63,+Ac.+26+%2326,+Bogot%C3%A1,+Edificio+Torre+26+-+Oficina+408&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
