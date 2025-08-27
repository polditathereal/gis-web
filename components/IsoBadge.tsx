import { Shield, CheckCircle2, Award } from "lucide-react"

type IsoBadgeProps = {
  code: "9001" | "14001" | "45001"
  year?: string
  size?: "sm" | "md" | "lg"
  className?: string // Added className prop to interface
}

const BADGE_CONFIG = {
  "9001": {
    title: "Gestión de Calidad",
    icon: Award,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
  },
  "14001": {
    title: "Gestión Ambiental",
    icon: Shield,
    gradient: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
    borderColor: "border-green-200",
  },
  "45001": {
    title: "Seguridad y Salud",
    icon: CheckCircle2,
    gradient: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
    borderColor: "border-orange-200",
  },
} as const

export function IsoBadge({ code, year, size = "md", className }: IsoBadgeProps) {
  const yr = year ?? (code === "45001" ? "2018" : "2015")
  const config = BADGE_CONFIG[code]

  if (!config) {
    console.error(`[v0] Invalid ISO code: ${code}`)
    return null
  }

  const IconComponent = config.icon

  const scale = {
    sm: {
      container: "h-16 px-4",
      icon: "w-8 h-8",
      iconSize: 18,
      title: "text-xs",
      code: "text-lg",
      year: "text-xs",
      radius: "rounded-xl",
    },
    md: {
      container: "h-20 px-5",
      icon: "w-10 h-10",
      iconSize: 22,
      title: "text-sm",
      code: "text-xl",
      year: "text-sm",
      radius: "rounded-2xl",
    },
    lg: {
      container: "h-24 px-6",
      icon: "w-12 h-12",
      iconSize: 26,
      title: "text-base",
      code: "text-2xl",
      year: "text-base",
      radius: "rounded-3xl",
    },
  }[size]

  return (
    <div
      className={`
        relative overflow-hidden ${scale.container} ${scale.radius}
        bg-gradient-to-br ${config.bgGradient}
        border-2 ${config.borderColor}
        shadow-lg hover:shadow-xl transition-all duration-300
        backdrop-blur-sm
        group hover:scale-105
        ${className || ""} 
      `}
      aria-label={`ISO ${code}:${yr} - ${config.title}`}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
      />

      {/* Content */}
      <div className="relative flex items-center gap-4 h-full">
        {/* Icon with gradient background */}
        <div
          className={`
          ${scale.icon} ${scale.radius}
          bg-gradient-to-br ${config.gradient}
          flex items-center justify-center
          shadow-md group-hover:shadow-lg transition-shadow
        `}
        >
          <IconComponent size={scale.iconSize} className="text-white drop-shadow-sm" strokeWidth={2.5} />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className={`font-bold text-gray-800 ${scale.title} leading-tight`}>{config.title}</div>
          <div className="flex items-baseline gap-2">
            <span className={`font-black text-gray-900 ${scale.code} leading-none`}>ISO {code}</span>
            <span className={`font-semibold text-gray-600 ${scale.year}`}>:{yr}</span>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
          <div
            className={`w-full h-full bg-gradient-to-br ${config.gradient} transform rotate-45 translate-x-4 -translate-y-4`}
          />
        </div>
      </div>
    </div>
  )
}

export default IsoBadge

/** Grupo apilado moderno (3 normas) */
export function IsoStack({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className="space-y-3">
      <div className="text-center mb-4">
        <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">Certificaciones</h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-[#F4731F] to-orange-400 mx-auto mt-2" />
      </div>
      <div className="space-y-3">
        <IsoBadge code="9001" size={size} />
        <IsoBadge code="14001" size={size} />
        <IsoBadge code="45001" size={size} />
      </div>
    </div>
  )
}
