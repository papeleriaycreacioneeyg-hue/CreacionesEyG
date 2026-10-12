"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/app/actions/auth";
import { LogOut, Eye, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  userEmail?: string;
}

export function AdminHeader({ userEmail }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-rose-200 shadow-2xs">
              <Image
                src="/logo.png"
                alt="Logo Creaciones E&G"
                fill
                className="object-cover"
                sizes="44px"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-plum text-base sm:text-lg">
                  Creaciones E&G
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-primary border border-rose-200">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  <span>Admin</span>
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Panel de Administración del Catálogo
              </p>
            </div>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* User Email Indicator */}
          {userEmail && (
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-plum">{userEmail}</span>
              <span className="text-[10px] text-emerald-600 font-medium">
                Sesión Administradora Activa
              </span>
            </div>
          )}

          {/* View Public Catalog Link */}
          <Link
            href="/productos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-plum bg-secondary hover:bg-rose-100/70 border border-purple-100 transition-colors shadow-2xs"
            title="Ver catálogo público en nueva pestaña"
          >
            <Eye className="w-3.5 h-3.5 text-plum" />
            <span className="hidden sm:inline">Ver Catálogo</span>
          </Link>

          {/* Logout Action */}
          <form
            action={async () => {
              await logout();
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-destructive hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
