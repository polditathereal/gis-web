export default function GroupSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
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
              <img
                src="/images/grupo/principal.png"
                alt="Grupo Principal"
                className="max-h-full max-w-full object-contain"
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
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border-2 border-[#F4731F]/20 hover:border-[#F4731F]/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#F4731F]/10 transform rotate-45 translate-x-4 -translate-y-4"></div>

                <div className="h-20 flex items-center justify-center mb-6">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{company.name}</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
