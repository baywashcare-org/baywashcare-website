import { useId } from "react"

/**
 * Side-view car in brand colours, shaded to read as a glossy 3D render:
 * curved body gradient, specular highlight, recessed wheel arches, metallic
 * rims, glass reflections and a soft contact shadow. Decorative.
 */
export function CarIllustration({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "")
  return <CarSvg uid={uid} className={className} />
}

/**
 * Hook-free drawing, so it can also render outside React (e.g. the Open Graph
 * image). `uid` keeps gradient ids unique when several cars are on a page.
 */
export function CarSvg({
  uid,
  className,
  style,
}: {
  uid: string
  className?: string
  style?: React.CSSProperties
}) {
  const id = (name: string) => `${uid}-${name}`
  const url = (name: string) => `url(#${id(name)})`

  const wheels = [82, 246]

  return (
    <svg
      viewBox="0 0 320 150"
      className={className}
      style={style}
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* body: light from above, curving away into shadow */}
        <linearGradient id={id("body")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f6ff" />
          <stop offset="0.18" stopColor="#5ee0fb" />
          <stop offset="0.5" stopColor="#14b8e6" />
          <stop offset="0.78" stopColor="#0a7fb5" />
          <stop offset="1" stopColor="#064e78" />
        </linearGradient>
        {/* side shading: front and rear fall off for roundness */}
        <linearGradient id={id("roundness")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#031a2b" stopOpacity="0.45" />
          <stop offset="0.12" stopColor="#031a2b" stopOpacity="0" />
          <stop offset="0.88" stopColor="#031a2b" stopOpacity="0" />
          <stop offset="1" stopColor="#031a2b" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#3b5f80" />
          <stop offset="0.45" stopColor="#0f2236" />
          <stop offset="1" stopColor="#050c16" />
        </linearGradient>
        <linearGradient id={id("specular")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("tire")} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0.6" stopColor="#1f2937" />
          <stop offset="1" stopColor="#020409" />
        </radialGradient>
        <radialGradient id={id("rim")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#475569" />
        </radialGradient>
        <radialGradient id={id("headlight")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#a5f3fc" stopOpacity="0.8" />
          <stop offset="1" stopColor="#a5f3fc" stopOpacity="0" />
        </radialGradient>
        <filter id={id("blur")} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* contact shadow */}
      <ellipse
        cx="164"
        cy="130"
        rx="140"
        ry="6"
        fill="#000"
        opacity="0.55"
        filter={url("blur")}
      />
      {wheels.map((cx) => (
        <ellipse
          key={`s${cx}`}
          cx={cx}
          cy="130"
          rx="26"
          ry="3.5"
          fill="#000"
          opacity="0.7"
        />
      ))}

      {/* body */}
      <path
        id={id("shape")}
        d="M26 110 L20 92 Q18 78 32 73 L72 63 Q100 40 128 36 L188 35 Q212 36 236 61 L284 70 Q304 74 306 92 L306 104 Q306 112 298 112 L270 112 A24 24 0 0 0 222 112 L106 112 A24 24 0 0 0 58 112 Z"
        fill={url("body")}
      />
      <path
        d="M26 110 L20 92 Q18 78 32 73 L72 63 Q100 40 128 36 L188 35 Q212 36 236 61 L284 70 Q304 74 306 92 L306 104 Q306 112 298 112 L270 112 A24 24 0 0 0 222 112 L106 112 A24 24 0 0 0 58 112 Z"
        fill={url("roundness")}
      />
      {/* lower body / sill in shadow */}
      <path
        d="M30 100 L298 100 L298 108 Q298 112 292 112 L270 112 A24 24 0 0 0 222 112 L106 112 A24 24 0 0 0 58 112 L28 112 Z"
        fill="#043a5c"
        opacity="0.55"
      />

      {/* windows */}
      <path d="M88 63 Q108 46 130 43 L154 43 L154 63 Z" fill={url("glass")} />
      <path d="M162 43 L188 43 Q204 45 222 63 L162 63 Z" fill={url("glass")} />
      {/* glass reflections */}
      <path d="M118 46 L130 46 L118 61 L108 61 Z" fill="#fff" opacity="0.22" />
      <path d="M172 46 L180 46 L170 61 L164 61 Z" fill="#fff" opacity="0.28" />
      <path d="M184 46 L188 46 L178 61 L175 61 Z" fill="#fff" opacity="0.15" />
      {/* pillar */}
      <rect x="154" y="42" width="8" height="22" fill="#063b5c" />

      {/* specular highlight along the shoulder */}
      <path
        d="M40 77 Q60 71 80 68 L238 66 Q270 70 292 78"
        fill="none"
        stroke={url("specular")}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* roof glint */}
      <path
        d="M132 38 L186 37.5"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* door seams + handles */}
      <path
        d="M158 66 L158 104"
        stroke="#04324f"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <path
        d="M96 66 Q92 84 96 104"
        fill="none"
        stroke="#04324f"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <rect
        x="138"
        y="74"
        width="13"
        height="3"
        rx="1.5"
        fill="#04324f"
        opacity="0.55"
      />
      <rect
        x="170"
        y="74"
        width="13"
        height="3"
        rx="1.5"
        fill="#04324f"
        opacity="0.55"
      />
      {/* side mirror */}
      <path d="M222 60 L232 58 Q236 60 232 64 L224 65 Z" fill="#0a7fb5" />

      {/* lights */}
      <circle cx="300" cy="82" r="14" fill={url("headlight")} opacity="0.9" />
      <rect x="292" y="79" width="13" height="6" rx="3" fill="#f0fdff" />
      <rect x="20" y="84" width="9" height="9" rx="2.5" fill="#ff3b55" />
      <rect x="21" y="85" width="4" height="3" rx="1" fill="#ffb3bf" />

      {/* wheel arches (inner shadow) + wheels */}
      {wheels.map((cx) => (
        <g key={cx}>
          <path
            d={`M${cx - 26} 112 A26 26 0 0 1 ${cx + 26} 112 Z`}
            fill="#020812"
          />
          <circle cx={cx} cy="112" r="21" fill={url("tire")} />
          <circle cx={cx} cy="112" r="13" fill={url("rim")} />
          {/* spokes */}
          {[0, 72, 144, 216, 288].map((a) => (
            <rect
              key={a}
              x={cx - 1.6}
              y={112 - 12}
              width="3.2"
              height="9"
              rx="1.2"
              fill="#64748b"
              transform={`rotate(${a} ${cx} 112)`}
            />
          ))}
          <circle cx={cx} cy="112" r="4" fill="#0ea5e9" />
          <circle cx={cx - 1.2} cy={110.8} r="1.3" fill="#e0f2fe" />
        </g>
      ))}

      {/* soap bubbles */}
      {[
        [56, 30, 9],
        [36, 12, 5],
        [238, 22, 7],
        [266, 40, 11],
        [290, 14, 5],
        [116, 14, 4],
      ].map(([cx, cy, r]) => (
        <g key={`${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="#ffffff"
            fillOpacity="0.12"
            stroke="#ffffff"
            strokeOpacity="0.85"
            strokeWidth="1.2"
          />
          <path
            d={`M${cx - r * 0.6} ${cy - r * 0.1} A${r * 0.65} ${r * 0.65} 0 0 1 ${cx - r * 0.1} ${cy - r * 0.6}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  )
}
