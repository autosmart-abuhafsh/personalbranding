import React, { useState } from 'react';
import { Language } from '../data/profile';

interface ProjectBlueprintPreviewProps {
  title: string;
  code: string;
  imageUrl?: string;
  blueprintType:
    | 'travel-home'
    | 'travel-packages'
    | 'corporate-showcase'
    | 'ecommerce-catalog'
    | 'apps-script-dashboard';
  lang: Language;
  className?: string;
}

/**
 * Renders either the verified project screenshot (when supplied in src/data/projects.ts)
 * or a clearly labeled, high-contrast Architectural System Blueprint placeholder (PRD 5.6).
 */
export const ProjectBlueprintPreview: React.FC<ProjectBlueprintPreviewProps> = ({
  title,
  code,
  imageUrl,
  blueprintType,
  lang,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  if (imageUrl && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-[#0A1020] ${className}`}>
        <img
          src={imageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#0A1020] p-5 flex flex-col justify-between select-none ${className}`}
    >
      {/* Top Browser / System Frame Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-[11px] font-semibold text-[#D5B47A]">
            {code}
          </span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span className="font-display text-xs font-medium text-[#F4F4F5] truncate">
            {title}
          </span>
        </div>
        <span className="font-mono-tech text-[10px] text-[#A5ADBD]">
          {lang === 'id' ? 'PRATINJAU ARSITEKTUR' : 'ARCHITECTURE PREVIEW'}
        </span>
      </div>

      {/* Domain-Specific Wireframe Illustration */}
      <div className="my-4 flex-1 flex items-center justify-center">
        {blueprintType === 'travel-home' || blueprintType === 'travel-packages' ? (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-full max-h-[165px]"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="8"
              y="8"
              width="384"
              height="164"
              rx="8"
              fill="#111A2E"
              stroke="#D5B47A"
              strokeOpacity="0.3"
            />
            {/* Hero Banner Wireframe */}
            <rect
              x="22"
              y="22"
              width="356"
              height="56"
              rx="6"
              fill="#78263F"
              fillOpacity="0.35"
              stroke="#D5B47A"
              strokeOpacity="0.35"
            />
            <text
              x="36"
              y="46"
              fill="#F4F4F5"
              fontSize="11"
              fontWeight="600"
              fontFamily="Sora, sans-serif"
            >
              AFIYAH TOUR · LAYANAN PERJALANAN &amp; UMRAH
            </text>
            <text
              x="36"
              y="63"
              fill="#D5B47A"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              WordPress + WP Travel Engine Package Architecture
            </text>
            {/* 3 Travel Package Cards */}
            {[0, 1, 2].map((col) => (
              <g key={col} transform={`translate(${22 + col * 122}, 90)`}>
                <rect
                  width="112"
                  height="68"
                  rx="5"
                  fill="#0A1020"
                  stroke="rgba(255,255,255,0.12)"
                />
                <rect
                  x="8"
                  y="8"
                  width="96"
                  height="22"
                  rx="3"
                  fill="#D5B47A"
                  fillOpacity="0.2"
                />
                <rect
                  x="8"
                  y="36"
                  width="68"
                  height="6"
                  rx="2"
                  fill="#F4F4F5"
                  fillOpacity="0.5"
                />
                <rect
                  x="8"
                  y="48"
                  width="48"
                  height="10"
                  rx="2"
                  fill="#78263F"
                />
              </g>
            ))}
          </svg>
        ) : blueprintType === 'corporate-showcase' ? (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-full max-h-[165px]"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="8"
              y="8"
              width="384"
              height="164"
              rx="8"
              fill="#111A2E"
              stroke="#D5B47A"
              strokeOpacity="0.3"
            />
            <rect
              x="22"
              y="22"
              width="175"
              height="136"
              rx="6"
              fill="#0A1020"
              stroke="rgba(255,255,255,0.12)"
            />
            <text
              x="36"
              y="52"
              fill="#F4F4F5"
              fontSize="12"
              fontWeight="700"
              fontFamily="Sora, sans-serif"
            >
              KANG KAYU JOMBAA
            </text>
            <text
              x="36"
              y="70"
              fill="#D5B47A"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              BUSINESS IDENTITY &amp; SHOWCASE
            </text>
            <rect x="36" y="86" width="120" height="8" rx="2" fill="#A5ADBD" fillOpacity="0.35" />
            <rect x="36" y="100" width="96" height="8" rx="2" fill="#A5ADBD" fillOpacity="0.25" />
            <rect x="36" y="122" width="76" height="20" rx="4" fill="#78263F" />
            <rect
              x="210"
              y="22"
              width="168"
              height="64"
              rx="6"
              fill="#78263F"
              fillOpacity="0.3"
              stroke="#D5B47A"
              strokeOpacity="0.35"
            />
            <rect
              x="210"
              y="94"
              width="80"
              height="64"
              rx="6"
              fill="#0A1020"
              stroke="rgba(255,255,255,0.12)"
            />
            <rect
              x="298"
              y="94"
              width="80"
              height="64"
              rx="6"
              fill="#0A1020"
              stroke="rgba(255,255,255,0.12)"
            />
          </svg>
        ) : blueprintType === 'ecommerce-catalog' ? (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-full max-h-[165px]"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="8"
              y="8"
              width="384"
              height="164"
              rx="8"
              fill="#111A2E"
              stroke="#D5B47A"
              strokeOpacity="0.3"
            />
            <text
              x="24"
              y="34"
              fill="#F4F4F5"
              fontSize="11"
              fontWeight="700"
              fontFamily="Sora, sans-serif"
            >
              ASBABALSHEFAA · WOOCOMMERCE STOREFRONT
            </text>
            {[0, 1, 2, 3].map((col) => (
              <g key={col} transform={`translate(${22 + col * 90}, 48)`}>
                <rect
                  width="82"
                  height="110"
                  rx="5"
                  fill="#0A1020"
                  stroke="rgba(255,255,255,0.12)"
                />
                <rect
                  x="8"
                  y="8"
                  width="66"
                  height="46"
                  rx="3"
                  fill="#78263F"
                  fillOpacity="0.35"
                />
                <rect
                  x="8"
                  y="62"
                  width="54"
                  height="6"
                  rx="2"
                  fill="#F4F4F5"
                  fillOpacity="0.6"
                />
                <rect
                  x="8"
                  y="74"
                  width="36"
                  height="6"
                  rx="2"
                  fill="#D5B47A"
                />
                <rect
                  x="8"
                  y="88"
                  width="66"
                  height="14"
                  rx="3"
                  fill="#78263F"
                />
              </g>
            ))}
          </svg>
        ) : (
          <svg
            viewBox="0 0 400 180"
            className="w-full h-full max-h-[165px]"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="8"
              y="8"
              width="384"
              height="164"
              rx="8"
              fill="#111A2E"
              stroke="#D5B47A"
              strokeOpacity="0.35"
            />
            {/* Sidebar */}
            <rect x="20" y="20" width="76" height="140" rx="5" fill="#0A1020" />
            <rect x="30" y="32" width="56" height="8" rx="2" fill="#D5B47A" />
            <rect x="30" y="50" width="46" height="6" rx="2" fill="#A5ADBD" fillOpacity="0.4" />
            <rect x="30" y="64" width="52" height="6" rx="2" fill="#A5ADBD" fillOpacity="0.4" />
            <rect x="30" y="78" width="40" height="6" rx="2" fill="#A5ADBD" fillOpacity="0.4" />
            {/* Main Dashboard Area */}
            <rect x="106" y="20" width="86" height="44" rx="5" fill="#0A1020" stroke="#78263F" />
            <rect x="200" y="20" width="86" height="44" rx="5" fill="#0A1020" stroke="#D5B47A" strokeOpacity="0.4" />
            <rect x="294" y="20" width="86" height="44" rx="5" fill="#0A1020" stroke="rgba(255,255,255,0.15)" />
            {/* Chart & Sheets Sync */}
            <rect x="106" y="72" width="274" height="88" rx="5" fill="#0A1020" />
            <text
              x="120"
              y="92"
              fill="#D5B47A"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              GOOGLE APPS SCRIPT + SHEETS AUTOMATION LEDGER
            </text>
            <rect x="120" y="128" width="24" height="20" rx="2" fill="#78263F" />
            <rect x="154" y="116" width="24" height="32" rx="2" fill="#78263F" />
            <rect x="188" y="106" width="24" height="42" rx="2" fill="#D5B47A" fillOpacity="0.75" />
            <rect x="222" y="100" width="24" height="48" rx="2" fill="#D5B47A" />
            <rect x="266" y="104" width="98" height="44" rx="4" fill="#111A2E" stroke="rgba(255,255,255,0.1)" />
          </svg>
        )}
      </div>

      {/* Explicit Placeholder Caption (PRD 5.6 Compliance) */}
      <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2.5 text-[11px] text-[#A5ADBD]">
        <span>
          {lang === 'id'
            ? 'Placeholder Visual Terlabel · Siap Diganti Screenshot Asli'
            : 'Labeled Visual Placeholder · Ready for Verified Screenshot'}
        </span>
        <span className="font-mono-tech text-[#D5B47A]">src/data/projects.ts</span>
      </div>
    </div>
  );
};
