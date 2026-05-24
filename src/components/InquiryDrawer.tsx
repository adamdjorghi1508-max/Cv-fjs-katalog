/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InquiryItem } from "../types";
import { CONTACT_PHONE } from "../data";
import { ShoppingBag, ChevronLeft, Trash2, Send, Minimize2, Check, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";

interface InquiryDrawerProps {
  items: InquiryItem[];
  onUpdateQty: (productId: string, specIndex: number, newQty: number) => void;
  onRemoveItem: (productId: string, specIndex: number) => void;
  onClearAll: () => void;
}

export default function InquiryDrawer({
  items,
  onUpdateQty,
  onRemoveItem,
  onClearAll
}: InquiryDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const totalWeight = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.weightPerUnit * curr.quantity), 0);
  }, [items]);

  const totalItemsCount = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [items]);

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    let itemsText = "";
    items.forEach((item, index) => {
      const lineWeight = (item.weightPerUnit * item.quantity).toFixed(2);
      itemsText += `${index + 1}. *[${item.productName}]* ${item.specSize}\n` +
                   `   Kuantitas: ${item.quantity} ${item.unit}\n` +
                   `   Est. Berat: ${lineWeight} Kg\n\n`;
    });

    const textMessage = `Halo Admin, saya ingin menanyakan harga dan ketersediaan stok untuk daftar material konstruksi berikut:\n\n` +
      `📦 *DAFTAR PERMINTAAN TANYA STOK & HARGA:*\n` +
      `=====================\n` +
      `${itemsText}` +
      `=====================\n` +
      `⚖️ *Total Estimasi Berat:* ${totalWeight.toFixed(2)} Kg\n` +
      `📌 *Status Proyek:* Butuh Penawaran Segera\n\n` +
      `Mohon direspon dengan rincian harga per batang/lembaran beserta diskon pengiriman. Terima kasih.`;

    const waUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <>
      {/* Floating Trigger Button (sticky on right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-flex items-center gap-2.5 px-5 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-display font-bold shadow-2xl transition-all duration-200 border border-slate-700 cursor-pointer group"
        >
          <ShoppingBag className="w-5 h-5 text-amber-500 animate-bounce" />
          <span className="text-sm">Daftar Tanya Harga</span>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-1 bg-amber-500 text-slate-950 text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md">
              {items.length}
            </span>
          )}
        </button>
      </div>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sidebar Slide-out */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-55 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <div>
                    <h4 className="font-display font-bold text-sm tracking-tight text-white leading-tight">
                      Daftar Permintaan Stok
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Kirim seluruh isi daftar ke WA dengan satu ketukan
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-850 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body (Items List) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-150 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="space-y-1 max-w-xs">
                      <p className="font-display font-bold text-slate-800 text-sm">
                        Daftar Kosong
                      </p>
                      <p className="text-xs text-slate-500">
                        Tambahkan spesifikasi material dari katalog produk di bawah untuk mengumpulkan penawaran sekaligus.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-500">DARTAR BARANG ({items.length})</span>
                      <button
                        onClick={onClearAll}
                        className="text-slate-400 hover:text-rose-500 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Bersihkan
                      </button>
                    </div>

                    <div className="space-y-3">
                      {items.map((item, idx) => (
                        <div
                          key={`${item.productId}-${item.specIndex}`}
                          className="p-3.5 rounded-xl border border-slate-150 bg-slate-50/50 flex flex-col justify-between gap-3 shadow-xs relative overflow-hidden"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="block text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/50 w-max font-mono mb-1.5">
                                {item.productName}
                              </span>
                              <span className="font-display font-bold text-slate-900 text-sm block">
                                {item.specSize}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                                Est. Berat: {item.weightPerUnit.toFixed(1)} kg / {item.unit}
                              </span>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.productId, item.specIndex)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Controls & Mini Total */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                            {/* Qty Adjustment */}
                            <div className="flex items-center border border-slate-200 rounded bg-white overflow-hidden size-sm">
                              <button
                                onClick={() => onUpdateQty(item.productId, item.specIndex, item.quantity - 1)}
                                className="px-2 py-0.5 hover:bg-slate-50 text-slate-500 font-bold border-r border-slate-100 text-xs"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-mono text-xs font-bold text-slate-700">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.productId, item.specIndex, item.quantity + 1)}
                                className="px-2 py-0.5 hover:bg-slate-50 text-slate-500 font-bold border-l border-slate-100 text-xs"
                              >
                                +
                              </button>
                            </div>

                            {/* Estimated Line Weight */}
                            <div className="text-right">
                              <span className="text-[9px] font-mono text-slate-400 block uppercase">TOTAL BERAT</span>
                              <span className="font-mono text-xs font-bold text-slate-800">
                                {(item.weightPerUnit * item.quantity).toFixed(1)} Kg
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                  {/* Totals Summary */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Total Kuantitas:</span>
                      <span className="font-mono font-semibold text-slate-800">{totalItemsCount} Unit</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-display font-bold text-slate-800">Total Akumulasi Berat:</span>
                      <span className="font-mono font-bold text-slate-900 text-base">
                        {totalWeight.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Kg
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Sending Action */}
                  <div className="space-y-2">
                    <button
                      onClick={handleSendWhatsApp}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/15 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Kirim Seluruh Daftar via WA
                    </button>
                    <p className="text-[10px] text-slate-400 text-center leading-normal">
                      Menghubungi sales kami dengan format template tatanan rapi berisi seluruh item untuk kalkulasi cepat.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
