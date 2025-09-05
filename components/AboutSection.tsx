import { Building2, HardHat, Ruler, ArrowRight, Construction } from "lucide-react"
import { IsoStack } from "@/components/IsoBadge"
import Link from "next/link"

interface AboutSectionProps {
  styles: { sectionTitle: string }
}

export default function AboutSection({ styles }: AboutSectionProps) {
  return (
    <section id="aboutsection" className="py-12 md:py-16 lg:hidden relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#F4731F]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-400/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[#F4731F]/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-orange-300/30 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto text-center bg-white/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl border border-[#F4731F]/20 shadow-2xl space-y-6 sm:space-y-8 lg:space-y-10 hover:shadow-3xl transition-all duration-500">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              <span className="font-OPTIEdgar-Extended text-[#F4731F] drop-shadow-lg relative">
                GIS
                <Construction className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 text-orange-400 animate-pulse" />
              </span>
              <span className="text-black drop-shadow-lg ml-2 sm:ml-3">Colombia</span>
            </h2>
            <div className="mt-3 sm:mt-4 space-y-2">
              <span className="block text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#F4731F] font-semibold">
                Ingeniería • Consultoría • Estudios • Diseño
              </span>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#F4731F] to-orange-500 mx-auto rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {[
              { icon: HardHat, text: "Seguridad y cumplimiento", color: "from-red-500 to-orange-500" },
              { icon: Ruler, text: "Diseño y control de calidad", color: "from-blue-500 to-cyan-500" },
              { icon: Building2, text: "Infraestructura y vivienda", color: "from-green-500 to-emerald-500" },
            ].map((service, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="flex items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 px-4 sm:px-6 py-4 sm:py-5 justify-center hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${service.color} shadow-lg`}>
                    <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-[#1A1A1A] group-hover:text-[#F4731F] transition-colors text-center sm:text-left">
                    {service.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 justify-center">
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-[#F4731F] to-orange-500 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-base sm:text-lg relative overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="relative z-10">Ver proyectos</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <a
              href="#footer"
              className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-white/10 border-2 border-white/30 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-base sm:text-lg backdrop-blur-md"
            >
              <span>Contactar</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </a>
          </div>

          <div className="flex justify-center pt-4 sm:pt-6">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/50 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
              <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Certificaciones
                </h3>
              </div>
              <IsoStack size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}