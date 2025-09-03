import Marquee from "react-fast-marquee"

interface PartnersSectionProps {
  styles: { sectionTitle: string }
}

const partners = [
  { name: "AIM", logo: "/images/clients/AIM.png" },
  { name: "ANI", logo: "/images/clients/ANI.png" },
  { name: "Alcaldía Usaquén", logo: "/images/clients/Alcaldia Usaquen.jpg" },
  { name: "Findeter", logo: "/images/clients/Findeter.jpg" },
  { name: "INVÍAS", logo: "/images/clients/INVÍAS_Colombia_logo.png" },
  { name: "EAAB", logo: "/images/clients/Logo_EAAB.png" },
  { name: "EPC", logo: "/images/clients/epc.jpg" },
  { name: "IDU", logo: "/images/clients/idu.png" },
  { name: "SDM", logo: "/images/clients/logo-sdm.png" },
  { name: "Fondo Adaptación", logo: "/images/clients/fondo_adaptacin_logo.jpeg" }, // logo agregado
]

export default function PartnersSection({ styles }: PartnersSectionProps) {
  return (
    <section id="socios" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/30"></div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className={`${styles.sectionTitle} text-gray-800 mb-4`}>
            Nuestros <span className="text-[#F4731F]">Socios</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F4731F] to-orange-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Trabajamos con las mejores organizaciones para entregar proyectos de excelencia
          </p>
        </div>

        <div className="w-full overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl border border-[#F4731F]/10 shadow-lg py-8">
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 mx-8 group"
                style={{ minWidth: "10rem", maxWidth: "12rem", flex: "0 0 180px" }}
              >
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-110 border border-gray-100">
                  <img
                    src={encodeURI(partner.logo) || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-12 w-32 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    style={{ display: "block" }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder-logo.png"
                    }}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
