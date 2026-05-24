/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Landmark, PhoneCall, Timer, ShieldCheck, MapPin } from "lucide-react";
import { CONTACT_WA_LINK } from "../data";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white relative overflow-hidden">
      {/* Structural decoration: simple grid lines representing metal structures */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-orange-400"></div>
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-orange-400"></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-orange-400"></div>
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-orange-400"></div>
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-orange-400"></div>
      </div>

      {/* Top micro-bar */}
      <div className="border-b border-slate-800 bg-slate-950/50 py-2 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Timer className="w-3.5 h-3.5 text-amber-500" />
              Jam Operasional: Senin - Sabtu (08:00 - 17:00 WIB)
            </span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Pengiriman Seluruh Indonesia
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400 font-medium font-mono text-[10px]">RESELLER & PROYEK READY</span>
          </div>
        </div>
      </div>

      {/* Corporate Brand Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/20 py-4 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3.5 self-start sm:self-center">
            {/* Vector Brand Logo */}
            <div className="p-1 px-2 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-center">
              <Logo light={true} className="w-20" showSubtitle={false} />
            </div>
            <div className="border-l border-slate-800 pl-3.5">
              <span className="block font-display font-black text-xl text-white tracking-wider leading-none">CV. FJS</span>
              <span className="block text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold mt-1">Penyedia Bahan Bangunan</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6287839692863"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600/20 border border-emerald-500/20 text-xs font-semibold font-mono transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Fast Response WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main hero body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col lg:flex-row items-center gap-10 relative z-10">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Supplier Bahan Bangunan &amp; Baja SNI
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-none text-white">
            Konstruksi Kokoh <br className="hidden lg:inline" />
            Dengan <span className="text-amber-500">CV. FJS</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Distributor bahan bangunan berkualitas dari baja besi tulangan SNI, baja ringan galvalum, atap spandek, hingga aksesori pelengkap sekrup angkur. Melayani kiriman cepat seluruh wilayah Indonesia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              id="header-cta-wa"
              href={CONTACT_WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Hubungi Sales Utama (WA)
            </a>
            <a
              id="header-cta-explore"
              href="#katalog-section"
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-sm font-medium transition-colors duration-200 flex items-center justify-center"
            >
              Lihat Kategori &amp; Kalkulator
            </a>
          </div>
        </div>

        {/* Feature widget panel showcasing actual brand logo */}
        <div className="w-full lg:w-auto flex flex-col md:flex-row lg:flex-col gap-4 justify-center items-stretch flex-shrink-0">
          {/* Main Logo Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-850 to-slate-950 border border-slate-800 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto shadow-2xl">
            <Logo light={true} className="w-56" showSubtitle={true} />
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest font-mono text-slate-500 uppercase font-black block">Logomark Resmi</span>
              <p className="text-[11px] text-slate-400 max-w-[240px]">
                Seluruh produk kami teraudit lab konstruksi dan distok dari tangan pabrik langsung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
