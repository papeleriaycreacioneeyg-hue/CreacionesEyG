"use client";

import React from "react";
import {
  Tag,
  Calendar,
  BookOpen,
  Grid,
  Layers,
  PartyPopper,
  Sparkles,
  Image as ImageIcon,
  Sun,
  Cake,
  Award,
  Wine,
  Heart,
  Key,
  Gift,
  HeartHandshake,
  Coffee,
  Smile,
  QrCode,
  CalendarDays,
  Briefcase,
  Magnet,
  BookOpenCheck,
  Beer,
  Shield,
} from "lucide-react";

interface ProductVisualProps {
  icon: string;
  name: string;
  categoryName: string;
  themeColor: string;
  accentColor: string;
  className?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

const ICON_MAP: Record<string, React.ElementType> = {
  Tag,
  Calendar,
  BookOpen,
  Grid,
  Layers,
  PartyPopper,
  Sparkles,
  Image: ImageIcon,
  Sun,
  Cake,
  Award,
  Wine,
  Heart,
  Key,
  Gift,
  HeartHandshake,
  Coffee,
  Smile,
  QrCode,
  CalendarDays,
  Briefcase,
  Magnet,
  BookOpenCheck,
  Beer,
  Shield,
};

export function ProductVisual({
  icon,
  name,
  categoryName,
  themeColor,
  accentColor,
  className = "",
  aspectRatio = "square",
}: ProductVisualProps) {
  const IconComponent = ICON_MAP[icon] || Sparkles;

  const ratioClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "landscape"
        ? "aspect-[16/10]"
        : "aspect-[3/4]";

  return (
    <div
      className={`relative w-full ${ratioClass} overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:scale-[1.02] ${className}`}
      style={{
        background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 60%, ${themeColor} 100%)`,
        border: "1px solid rgba(224, 75, 136, 0.12)",
      }}
    >
      {/* Decorative handcrafted geometric patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`pattern-${name}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={accentColor} fillOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${name})`} />
        </svg>
      </div>

      {/* Decorative corner embellishments */}
      <div
        className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 rounded-tl-sm opacity-30"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 rounded-br-sm opacity-30"
        style={{ borderColor: accentColor }}
      />

      {/* Center Icon Badge with soft shadow */}
      <div
        className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 mb-3"
        style={{
          background: "#ffffff",
          border: `1.5px solid ${accentColor}33`,
          boxShadow: `0 8px 20px -6px ${accentColor}25`,
        }}
      >
        <IconComponent className="w-10 h-10 transition-colors" style={{ color: accentColor }} />
      </div>

      {/* Subtle brand tag */}
      <span className="relative z-10 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80 mt-1">
        {categoryName}
      </span>

      {/* Craft stamp watermark */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 opacity-60">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Hecho a Mano
        </span>
      </div>
    </div>
  );
}
