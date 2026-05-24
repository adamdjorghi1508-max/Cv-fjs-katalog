/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Product, SteelSpecification } from "../types";
import { CONTACT_PHONE } from "../data";
import { HelpCircle, ChevronRight, ShoppingCart, Plus, Minus, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToInquiry: (spec: SteelSpecification, quantity: number, productName: string, specIndex: number) => void;
}

export default function ProductCard({ product, onAddToInquiry }: ProductCardProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const getQuantity = (index: number) => quantities[index] || 1;

  const handleQtyChange = (index: number, val: number) => {
    if (val < 1) return;
    setQuantities(prev => ({ ...prev, [index]: val }));
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "beton":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "cnp":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "wf":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "wiremesh":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "bajaringan":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "atap":
        return "bg-rose-50 text-rose-800 border-rose-200";
      case "aksesoris":
        return "bg-amber-50 text-amber-850 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "beton":
        return "Besi Beton";
      case "cnp":
        return "Besi CNP";
      case "wf":
        return "Besi WF";
      case "wiremesh":
        return "Wiremesh";
      case "bajaringan":
        return "Baja Ringan";
      case "atap":
        return "Atap Spandek";
      case "aksesoris":
        return "Aksesoris & Baut";
      default:
        return cat.toUpperCase();
    }
  };

  const handleDirectWhatsApp = (spec: SteelSpecification, index: number) => {
    const qty = getQuantity(index);
    const estTotalWeight = (spec.weightPerUnit * qty).toFixed(2);
    
    const textMessage = `Halo Admin, saya tertarik dengan produk dari Website Katalog:\n\n` +
      `📌 *Produk:* ${product.name}\n` +
      `📏 *Spesifikasi:* ${spec.size}\n` +
      `📦 *Jumlah (Qty):* ${qty} ${spec.unit}\n` +
      `⚖️ *Est. Total Berat:* ${estTotalWeight} Kg\n\n` +
      `Apakah stok tersedia dan berapa harganya untuk pengiriman ke daerah kami? Terima kasih.`;
    
    const waUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
    >
      {/* Top Banner / Badge Area */}
      <div className="p-5 border-b border-slate-100 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider font-display border ${getCategoryColor(product.category)}`}>
              {getCategoryLabel(product.category)}
            </span>
            <span className="text-xs font-mono font-medium text-amber-600 bg-amber-50 px-2.5 py-0.5 border border-amber-200 rounded-md">
              {product.badge}
            </span>
          </div>

          <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">
            {product.name}
          </h3>
          <p className="text-slate-500 text-xs font-mono mt-1 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            {product.standard}
          </p>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100/80 text-xs text-slate-500">
          * Berat tabel merupakan pendekatan teoritis SNI. Toleransi ukuran bervariasi sesuai tipe proyek.
        </div>
      </div>

      {/* Sizing & Sizing Table */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 tracking-wider uppercase font-display">
            Spesifikasi &amp; Berat Batang
          </span>
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            title="Info toleransi & berat"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        <AnimatePresence>
          {showDisclaimer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-5 py-3 bg-amber-50/40 border-b border-amber-100 text-xs text-slate-600"
            >
              Berat tercantum merupakan estimasi standar nasional. Panjang standar Besi Beton &amp; WF adalah 12 meter, sementara CNP adalah 6 meter. Hubungi sales untuk custom pemotongan.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Specifications List */}
        <div className="divide-y divide-slate-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-slate-100/50 text-[11px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
                <th className="py-2 px-4">Ukuran / Profil</th>
                <th className="py-2 px-4 text-right">Est. Berat</th>
                <th className="py-2 px-4 text-center">Jumlah</th>
                <th className="py-2 px-4 text-right">Opsi Pengajuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {product.specifications.map((spec, idx) => {
                const qty = getQuantity(idx);
                const isHeavy = spec.weightPerUnit >= 100;

                return (
                  <tr key={idx} className="hover:bg-amber-50/20 transition-colors">
                    {/* Size */}
                    <td className="py-3.5 px-4">
                      <span className="block font-medium text-slate-800 text-sm">
                        {spec.size}
                      </span>
                      {spec.length && (
                        <span className="inline-block mt-0.5 text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                          L: {spec.length} meter
                        </span>
                      )}
                    </td>

                    {/* Weight */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono text-xs font-bold text-slate-700">
                        {spec.weightPerUnit.toFixed(2)}
                      </span>{" "}
                      <span className="text-[10px] text-slate-400 font-mono">
                        Kg/{spec.unit === "Batang" ? "Btg" : spec.unit}
                      </span>
                    </td>

                    {/* Quantity Control */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(idx, qty - 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-500 transition-colors border-r border-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={qty}
                          onChange={(e) => handleQtyChange(idx, parseInt(e.target.value) || 1)}
                          className="w-10 text-center font-mono text-xs font-semibold focus:outline-none bg-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => handleQtyChange(idx, qty + 1)}
                          className="px-2 py-1 hover:bg-slate-100 text-slate-500 transition-colors border-l border-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Add to list */}
                        <button
                          type="button"
                          onClick={() => onAddToInquiry(spec, qty, product.name, idx)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-all duration-150 relative group"
                          title="Tambah ke Daftar Tanya"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-1.5 hidden group-hover:block transition-all px-2 py-1 text-[10px] font-sans font-medium text-white bg-slate-950 rounded whitespace-nowrap z-30">
                            + Daftar Tanya
                          </span>
                        </button>

                        {/* Direct WA */}
                        <button
                          type="button"
                          onClick={() => handleDirectWhatsApp(spec, idx)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-display transition-colors flex items-center gap-1"
                        >
                          Tanya WA
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}
