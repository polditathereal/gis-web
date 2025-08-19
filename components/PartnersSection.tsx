



import React from "react";

interface PartnersSectionProps {
  styles: { sectionTitle: string };
}

const partners = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "Coca-Cola",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Coca-Cola_logo.svg",
  },
  {
    name: "Meta (Facebook)",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "Spotify",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Spotify_icon.svg",
  },
  {
    name: "YouTube",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/YouTube_Logo_2017.svg",
  },
];

export default function PartnersSection({ styles }: PartnersSectionProps) {
  return (
    <section id="socios" className="py-20 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at center, #ff8800 0%, #ffb366 40%, #fff7ed 100%)`,
          opacity: 0.7,
        }}
      />
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <h2 className={`${styles.sectionTitle} text-center text-gray-800 mb-12`}>Nuestros Socios</h2>
        <div className="w-full">
          <div className="flex flex-wrap justify-center items-center gap-8 w-full">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-24"
                style={{ minWidth: '8rem', maxWidth: '10rem', flex: '1 1 160px' }}
              >
                <object
                  type="image/svg+xml"
                  data={partner.logo}
                  aria-label={partner.name}
                  className="h-16 w-32"
                  style={{ display: 'block', filter: "invert(44%) sepia(98%) saturate(749%) hue-rotate(359deg) brightness(101%) contrast(101%)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
