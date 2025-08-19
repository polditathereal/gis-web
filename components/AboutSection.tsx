interface AboutSectionProps {
  styles: { sectionTitle: string }
}

export default function AboutSection({ styles }: AboutSectionProps) {
  return (
    <section id="nosotros" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`${styles.sectionTitle} text-gray-800 mb-8`}>Sobre Nosotros</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-orange-600 mb-4">¿Quiénes somos?</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Somos una empresa constructora especializada en la gestión y ejecución de proyectos de infraestructura y vivienda en Bogotá. Nos destacamos por obtener licitaciones públicas y privadas, garantizando calidad, cumplimiento y sostenibilidad en cada obra.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nuestro equipo acompaña a los clientes desde la planeación hasta la entrega final, asegurando transparencia, eficiencia y resultados que contribuyen al desarrollo de la ciudad y el bienestar de sus habitantes.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-lg border border-orange-200">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600">10+</div>
                  <div className="text-gray-700">Años de experiencia</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">100+</div>
                  <div className="text-gray-700">Proyectos completados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-gray-700">Clientes satisfechos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-gray-700">Soporte técnico</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
