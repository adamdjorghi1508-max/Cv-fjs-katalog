/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface LogoProps {
  className?: string;
  light?: boolean; // If true, changes dark lines to white for dark backgrounds
  showSubtitle?: boolean;
}

export default function Logo({ className = "w-48 h-auto", light = false, showSubtitle = true }: LogoProps) {
  const primaryStroke = light ? "#f8fafc" : "#0f172a";
  const textFill = light ? "#ffffff" : "#000000";
  const subtitleFill = light ? "#fbbf24" : "#1e3a8a"; // Gold on dark background, Deep Blue on light background

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* --- 1. CRIMSON CRANE (Left Side) --- */}
        <g stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Main vertical mast */}
          <path d="M 190 70 L 190 115" />
          <path d="M 183 70 L 183 115" />
          
          {/* Lattice cross members */}
          <path d="M 183 75 L 190 85" />
          <path d="M 190 85 L 183 95" />
          <path d="M 183 95 L 190 105" />
          <path d="M 190 105 L 183 115" />
          
          {/* Crane Jib (Boom) */}
          <path d="M 152 70 L 226 70" />
          {/* Top crane point and cables */}
          <path d="M 183 50 L 183 70" />
          <path d="M 183 50 L 152 70" />
          <path d="M 183 50 L 210 70" />
          
          {/* Counter-weight back brace */}
          <path d="M 152 70 L 183 78" />
          <path d="M 152 78 M 160 70 L 160 77" />
          
          {/* Hook line and hook */}
          <path d="M 220 70 L 220 88" />
          <path d="M 220 88 C 218 90, 218 93, 222 93 C 224 93, 224 90, 221 89" strokeWidth="2" />
        </g>

        {/* --- 2. BLUE BRICKS (Middle Side on Rooftop) --- */}
        <g stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={light ? "#0f172a" : "#ffffff"}>
          {/* Row 3 (Top) */}
          <rect x="249" y="73" width="18" height="8" rx="0.5" />
          
          {/* Row 2 (Middle) */}
          <rect x="239" y="81" width="18" height="8" rx="0.5" />
          <rect x="259" y="81" width="18" height="8" rx="0.5" />
          
          {/* Row 1 (Bottom) */}
          <rect x="229" y="89" width="18" height="8" rx="0.5" />
          <rect x="249" y="89" width="18" height="8" rx="0.5" />
          <rect x="269" y="89" width="18" height="8" rx="0.5" />
        </g>

        {/* --- 3. WOOD-RED TROWEL (Right Side on Rooftop) --- */}
        <g stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Trowel blade (tilted triangle) */}
          <path d="M 285 105 L 305 92 L 325 105 Z" fill={light ? "#0f172a" : "#ffffff"} />
          {/* Shank connection and handle */}
          <path d="M 305 92 L 312 85" strokeWidth="3" />
          <path d="M 312 85 L 325 72" strokeWidth="4" />
        </g>

        {/* --- 4. HOUSE STRUCTURES (Black Lines) --- */}
        <g stroke={primaryStroke} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Left House Left Wall */}
          <path d="M 165 140 L 165 200" />
          {/* Left House Roof */}
          <path d="M 150 148 L 215 95 L 270 133" />
          {/* Middle Wall / Divider */}
          <path d="M 250 115 L 250 148" />
          <path d="M 250 183 L 250 200" />
          {/* Left House Floor */}
          <path d="M 165 200 L 250 200" />
          
          {/* Right House Roof */}
          <path d="M 250 112 L 310 112 L 342 148" />
          {/* Right House Right Wall */}
          <path d="M 335 140 L 335 200" />
          {/* Right House Floor (with gap) */}
          <path d="M 258 200 L 335 200" />
        </g>

        {/* --- 5. LOGO BRAND TEXT: "CV.FJS" --- */}
        <text
          x="250"
          y="173"
          textAnchor="middle"
          fontFamily="'Inter', var(--font-sans), sans-serif"
          className="select-none font-black"
          fontSize="35"
          fill={textFill}
          letterSpacing="-0.5"
        >
          <tspan fontWeight="400">CV.</tspan>FJS
        </text>

        {/* --- 6. SUBTITLE TEXT (Penyedia Bahan Bangunan) --- */}
        {showSubtitle && (
          <text
            x="250"
            y="235"
            textAnchor="middle"
            fontFamily="'Space Grotesk', var(--font-display), sans-serif"
            className="select-none font-bold"
            fontSize="15"
            fill={subtitleFill}
            letterSpacing="1.5"
          >
            PENYEDIA BAHAN BANGUNAN
          </text>
        )}
      </svg>
    </div>
  );
}
