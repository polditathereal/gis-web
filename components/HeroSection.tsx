
import React, { useEffect, useState } from "react";

const heroImages = [
  "/images/hero/11.jpg",
  "/images/hero/FondoDeAdaptaciónAtlantico_7.jpg",
  "/images/hero/IMG_0600.JPG",
  "/images/hero/IMG_20190829_112035831_HDR.jpg",
  "/images/hero/IMG_20190829_142523673_HDR-1.jpg"
];

type Props = {
  title?: string;
  description?: string;
  height?: number; // px
};

export default function BannerPoligono({
  title = "GIS Colombia",
  description = "Construimos el futuro de Bogotá: proyectos de infraestructura y vivienda con calidad, cumplimiento y transparencia.\nEspecialistas en licitaciones públicas y privadas.",
  height = 480,
}: Props) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const imageUrl = heroImages[current];

  // Contadores animados
  const counters = [
    { end: 10, label: 'Años de experiencia', suffix: '+' },
    { end: 100, label: 'Proyectos completados', suffix: '+' },
    { end: 50, label: 'Clientes satisfechos', suffix: '+' },
    { end: 24, label: 'Soporte técnico', suffix: '/7', animated: false },
  ];
  const [counts, setCounts] = useState([0, 0, 0]);
  useEffect(() => {
    const duration = 700; // ms
    const steps = Math.round(duration / 30);
    const increments = counters.slice(0, 3).map(c => c.end / steps);
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setCounts(prev => prev.map((v, i) => {
        const next = v + increments[i];
        if (next >= counters[i].end) return counters[i].end;
        return next;
      }));
      if (frame >= steps) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-screen h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f6ebe3] via-[#fff7e6] to-[#f6ebe3]"
      style={{ paddingTop: '88px' }}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={imageUrl}
          alt="Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Recuadro de texto más pequeño, más transparente, desplazado a la izquierda, contadores animados y título bicolor */}
      <div className="relative z-10 flex flex-col items-start justify-center w-full h-full">
        <div className="ml-8 mt-8 px-4 py-4 max-w-sm bg-white/40 border-2 border-[#FF9D14] rounded-xl shadow-lg backdrop-blur-md">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow text-left flex items-center gap-2">
            <span className="text-[#F4731F]">GIS</span>
            <span className="text-[#1A1A1A]">Colombia</span>
          </h1>
          <p className="text-base md:text-lg font-semibold text-[#1A1A1A] text-left drop-shadow opacity-90 mb-6">
            {description}
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
            {counters.map((counter, i) => (
              <div key={counter.label} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-extrabold text-[#F4731F]">
                  {counter.animated === false
                    ? `24/7`
                    : `${Math.round(counts[i])}${counter.suffix}`}
                </span>
                <span className="text-sm md:text-base text-[#2C2C2C] mt-2 text-center">{counter.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
