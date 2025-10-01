import Image from "next/image"

type GroupSectionProps = {
  styles?: {
    sectionTitle?: string
    cardStyle?: string
  }
}

export default function GroupSection({ styles }: GroupSectionProps) {
  const groupCompanies = [
    {
      name: "GIS Colombia",
      logo: "/images/grupo/1.png",
      description: "Ingeniería y consultoría especializada",
    },
    {
      name: "GIS EAP",
      logo: "/images/grupo/2.png",
      description: "Soluciones tecnológicas avanzadas",
    },
    {
      name: "OMC",
      logo: "/images/grupo/3.jpg",
      description: "Soluciones tecnológicas avanzadas",
    },
    {
      name: "CIESA",
      logo: "/images/grupo/4.jpg",
      description: "Consultoría integral empresarial",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F4731F]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`${styles?.sectionTitle ?? "text-4xl md:text-5xl font-bold"} text-gray-800 mb-4`}>
            Nuestro <span className="text-[#F4731F]">Grupo</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4731F] to-orange-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Un grupo empresarial sólido con más de una década de experiencia, ofreciendo soluciones integrales en
            ingeniería, consultoría y tecnología.
          </p>
        </div>

        {/* Principal Logo Section */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="h-32 w-80 flex items-center justify-center">
              <Image
                src="/images/grupo/principal.jpeg"
                alt="Grupo Principal"
                width={320}
                height={128}
                className="max-h-full max-w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-6 bg-gray-50 text-gray-500 font-medium">Empresas del Grupo</span>
          </div>
        </div>

        {/* Subsidiary Companies Grid with Enhanced Framing */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {groupCompanies.map((company, index) => (
            <div key={index} className="group">
              <div className={`bg-white rounded-2xl p-4 sm:p-8 min-h-[0] transition-all duration-300 group-hover:scale-105 relative overflow-hidden
                ${styles?.cardStyle ?? "shadow-lg hover:shadow-2xl border-2 border-[#F4731F]/20 hover:border-[#F4731F]/40"}`}>
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#F4731F]/10 transform rotate-45 translate-x-4 -translate-y-4"></div>

                <div className="h-16 sm:h-20 flex items-center justify-center mb-3 sm:mb-6">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-3 text-center min-h-[32px]">{company.name}</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed min-h-[48px]">{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
