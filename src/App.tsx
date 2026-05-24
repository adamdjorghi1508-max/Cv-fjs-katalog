/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { PRODUCTS, CONTACT_WA_LINK, CONTACT_PHONE } from "./data";
import { Product, InquiryItem, SteelSpecification } from "./types";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Estimator from "./components/Estimator";
import InquiryDrawer from "./components/InquiryDrawer";
import Logo from "./components/Logo";
import { Search, SlidersHorizontal, BookOpen, Clock, HelpCircle, Phone, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Semua Produk" },
    { id: "beton", label: "Besi Beton" },
    { id: "cnp", label: "Besi CNP" },
    { id: "wf", label: "Besi WF" },
    { id: "wiremesh", label: "Wiremesh" },
    { id: "bajaringan", label: "Baja Ringan" },
    { id: "atap", label: "Atap Spandek" },
    { id: "aksesoris", label: "Baut & Aksesoris" }
  ];

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specifications.some(spec => spec.size.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handler to add item from card table into inquiry basket
  const handleAddToInquiry = (spec: SteelSpecification, qty: number, productName: string, specIndex: number) => {
    const idKey = `${productName}-${specIndex}`.toLowerCase().replace(/\s+/g, '-');
    
    setInquiryItems(prev => {
      const existingIdx = prev.findIndex(item => item.productId === idKey && item.specIndex === specIndex);
      
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      
      return [
        ...prev,
        {
          productId: idKey,
          productName,
          specIndex,
          specSize: spec.size,
          quantity: qty,
          weightPerUnit: spec.weightPerUnit,
          unit: spec.unit
        }
      ];
    });

    // Show temporary floating notification toast
    setNotification(`Berhasil menambahkan ${qty} ${spec.unit} ${spec.size} ke daftar tanya.`);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleUpdateQty = (productId: string, specIndex: number, newQty: number) => {
    if (newQty < 1) return;
    setInquiryItems(prev =>
      prev.map(item =>
        item.productId === productId && item.specIndex === specIndex
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, specIndex: number) => {
    setInquiryItems(prev => prev.filter(item => !(item.productId === productId && item.specIndex === specIndex)));
  };

  const handleClearAll = () => {
    setInquiryItems([]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* Top Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 16 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-55 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-sans font-medium text-xs shadow-xl flex items-center gap-2.5 max-w-sm"
          >
            <span className="flex-1 text-center">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header/Hero */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-12 md:space-y-16">
        
        {/* SECTION 1: Interative Catalog Section */}
        <section id="katalog-section" className="space-y-6 pt-2">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-250 inline-block mb-2">
                KATALOG MATERIAL &amp; PROFIL BAJA
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                Besi Konstruksi &amp; Baja Profil
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Gunakan tab penjelajah dan ketik ukuran profil untuk penyaringan stok di bawah ini.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:max-w-xs">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Beton, CNP, WF, Wiremesh..."
                className="w-full bg-white border border-slate-300 focus:outline-none focus:border-amber-500 hover:border-slate-400 text-slate-800 text-sm px-3.5 py-2 pl-10 rounded-lg transition-colors placeholder:text-slate-450"
              />
            </div>
          </div>

          {/* Filtering Tabs & Statistics */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-100/50 p-2 rounded-xl border border-slate-200">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 md:gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold font-display transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-slate-900 border border-slate-900 text-amber-500"
                      : "bg-transparent text-slate-600 hover:text-slate-950 border border-transparent hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Result statistics count */}
            <div className="px-3.5 py-1 text-slate-500 text-xs font-mono font-medium flex items-center justify-between lg:justify-end gap-2 border-t lg:border-t-0 border-slate-250 pt-2 lg:pt-0">
              <span className="flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                Ditemukan:{" "}
              </span>
              <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold font-mono text-[10px]">
                {filteredProducts.length} Kategori Produk
              </span>
            </div>
          </div>

          {/* Catalog Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
              <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <p className="font-display font-bold text-slate-900 text-base">Produk tidak ditemukan</p>
                <p className="text-slate-500 text-sm">
                  Tidak ditemukan spesifikasi baja besi dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba opsi kategori lain atau hubungi admin.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={CONTACT_WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-display transition-colors"
                >
                  Hubungi Call Center via WA
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToInquiry={handleAddToInquiry}
                />
              ))}
            </div>
          )}
        </section>

        {/* SECTION 2: Dynamic Estimator Weight Calculator & Freight Adviser */}
        <section className="pt-4">
          <Estimator />
        </section>

        {/* SECTION 3: FAQ / Information Guide */}
        <section className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-1 space-y-3.5">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block">PANDUAN PEMBELIAN</span>
            <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              Sistem Pemesanan Besi Baja
            </h3>
            <p className="text-slate-650 text-sm leading-relaxed">
              Kami mempermudah suplai besi baja Anda dengan kalkulasi transparan, sistematis, dan jaminan pengiriman lancar.
            </p>
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                <Clock className="w-4 h-4 text-amber-500" /> Pengiriman Fast-Track: 1-2 Hari Kerja
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                <BookOpen className="w-4 h-4 text-emerald-500" /> Tersedia Mill Test Certificate (MTC)
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">1</span>
                Tanya Stok &amp; Spesifikasi
              </h4>
              <p className="text-slate-550 text-xs leading-relaxed pl-6">
                Pilih ukuran yang sesuai di atas, klik &quot;Tanya WA&quot; atau kumpulkan di &quot;Daftar Tanya&quot;. Hubungi Sales Officer kami yang siaga merespon kesediaan stok.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">2</span>
                Penawaran Harga &amp; PPN
              </h4>
              <p className="text-slate-550 text-xs leading-relaxed pl-6">
                Kami menawarkan opsi harga non-PPN untuk kebutuhan retail, serta faktur pajak / inklusif PPN resmi bagi badan usaha kontraktor (B2B/G2B).
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">3</span>
                Pilihan Pengiriman Proyek
              </h4>
              <p className="text-slate-550 text-xs leading-relaxed pl-6">
                Barang dapat Anda muat sendiri di Gudang Utama kami atau kami bantu operasikan pengiriman langsung memakai truk bak terbuka lurus (sesuai panjang besi 6m/12m).
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-mono text-[10px] font-bold flex items-center justify-center">4</span>
                Sertifikat &amp; Bukti SNI
              </h4>
              <p className="text-slate-550 text-xs leading-relaxed pl-6">
                Setiap pengiriman baja WF atau besi beton SNI bertipe penuh disertai sertifikat pabrik bersangkutan, menjamin kepatuhan audit K3 konstruksi Anda.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Area with structural references */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-xs">
          <div className="space-y-4 md:col-span-2 flex flex-col items-start">
            {/* Embedded Logo instead of plain text */}
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-905 w-full max-w-sm">
              <Logo light={true} className="w-24" showSubtitle={false} />
              <div className="border-l border-slate-800 pl-3">
                <span className="block font-display font-black text-base text-white tracking-wider leading-tight">CV. FJS</span>
                <span className="block text-[9px] font-mono tracking-widest text-amber-500 uppercase font-bold mt-1">Penyedia Bahan Bangunan</span>
              </div>
            </div>
            
            <p className="text-slate-500 leading-relaxed max-w-sm mt-2">
              Situs referensi tabel berat besi baja standar nasional, kalkulasi muatan, dan pesanan stok real-time langsung terhubung ke gerbang penjualan sales WhatsApp CV. FJS.
            </p>
            <p className="text-slate-500 font-mono text-[10px] mt-1">
              &copy; 2026 CV. FJS Penyedia Bahan Bangunan. Seluruh Hak Cipta Dilindungi Undang-Undang.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-slate-200 text-sm uppercase tracking-wider">Kategori Katalog</h4>
            <ul className="space-y-2 text-slate-400 font-mono">
              <li><a href="#katalog-section" onClick={() => setSelectedCategory("beton")} className="hover:text-amber-500 transition-colors">Besi Beton Polos &amp; Ulir</a></li>
              <li><a href="#katalog-section" onClick={() => setSelectedCategory("cnp")} className="hover:text-amber-500 transition-colors">Besi CNP (Kanal C)</a></li>
              <li><a href="#katalog-section" onClick={() => setSelectedCategory("wf")} className="hover:text-amber-500 transition-colors">Besi WF (Wide Flange)</a></li>
              <li><a href="#katalog-section" onClick={() => setSelectedCategory("wiremesh")} className="hover:text-amber-500 transition-colors">Besi Wiremesh Lembar &amp; Roll</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-slate-200 text-sm uppercase tracking-wider">Call Center Sales</h4>
            <div className="space-y-3">
              <p className="text-slate-500 leading-relaxed">
                Butuh penawaran tertulis (Surat Penawaran Harga / SPH) atau format Excel? Kirim rincian RAB Anda ke saluran operasional kami.
              </p>
              <a
                href={CONTACT_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-950/20 px-3 py-2 rounded-lg transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+62 878-3969-2863</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Quote Drawer Accumulation */}
      <InquiryDrawer
        items={inquiryItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
