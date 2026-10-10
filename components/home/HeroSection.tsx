"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Gift } from "lucide-react";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const bannerVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1, ease: "easeOut" as const } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" as const },
    },
  };

  const trustRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const trustItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-rose-50/80 via-purple-50/50 to-background min-h-[550px] flex items-center">
      {/* Decorative Layer 1 & 2: Pastel watercolors & sparkles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-200/20 rounded-full blur-3xl" />

        {/* Ambient floating hearts & stars (cycle long animations) */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-1/4 left-[8%] text-rose-300"
            >
              <Heart className="h-6 w-6 fill-current opacity-40" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-12 right-[20%] text-amber-300"
            >
              <Star className="h-5 w-5 fill-current opacity-60" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-[35%] text-purple-300"
            >
              <Heart className="h-5 w-5 fill-current opacity-30" />
            </motion.div>
          </>
        )}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column (45%) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="lg:col-span-5 space-y-8 text-left"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-plum leading-tight">
              Papelería y<span className="block text-plum">Creaciones E&G</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              Creamos detalles únicos para momentos especiales.
            </p>
          </div>

          {/* Action Buttons */}
          <motion.div variants={buttonVariants} className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#e04b88] hover:bg-[#c93d75] text-white rounded-full px-8 shadow-sm font-bold transition-transform hover:scale-[1.03]"
            >
              <Link href="/cotizar">Cotizar ahora</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-rose-200 hover:bg-rose-50 text-plum font-bold gap-2 transition-all"
              asChild
            >
              <Link href="/productos">
                <span>Ver catálogo</span>
                <ShoppingCartIcon className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={trustRowVariants}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-rose-100"
          >
            <motion.div
              variants={trustItemVariants}
              className="flex flex-col items-start space-y-1"
            >
              <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-plum">Hecho con amor</span>
              <span className="text-[10px] text-muted-foreground">Cada detalle importa</span>
            </motion.div>

            <motion.div
              variants={trustItemVariants}
              className="flex flex-col items-start space-y-1"
            >
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-plum">Personalizados</span>
              <span className="text-[10px] text-muted-foreground">Ideas hechas para ti</span>
            </motion.div>

            <motion.div
              variants={trustItemVariants}
              className="flex flex-col items-start space-y-1"
            >
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                <Gift className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-plum">Calidad premium</span>
              <span className="text-[10px] text-muted-foreground">Materiales de calidad</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column (55%) - Integrated Banner */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={bannerVariants}
          className="lg:col-span-7 relative flex justify-center items-center h-[350px] md:h-[480px] w-full"
        >
          {/* Transparent Gradient Overlay Mask for smooth integration */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#fdfaf6] via-transparent to-transparent opacity-90 lg:block hidden" />

          <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg border bg-background">
            <Image
              src="/baner.png"
              alt="Colección Papelería Creaciones E&G"
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 700px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
