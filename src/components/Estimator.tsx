/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { PRODUCTS, CONTACT_PHONE } from "../data";
import { Calculator as CalcIcon, HardHat, Truck, FileOutput, RefreshCw } from "lucide-react";

interface EstimatorRow {
  id: string;
  productId: string;
  specIndex: number;
  quantity: number;
}

export default function Estimator() {
  const [rows, setRows] = useState<EstimatorRow[]>([
    { id: "row-1", productId: PRODUCTS[0].id, specIndex: 2, quantity: 50 } // Default: Beton Polos 10mm Qty 50
  ]);

  const activeProductsMap = useMemo(() => {
    return new Map(PRODUCTS.map(p => [p.id, p]));
  }, []);

  const calculatedRows = useMemo(() => {
    return rows.map(row => {
      const product = activeProductsMap.get(row.productId);
      const spec = product?.specifications[row.specIndex];
      const weight = spec ? spec.weightPerUnit * row.quantity : 0;
      return {
        ...row,
        productName: product?.name || "",
        specSize: spec?.size || "",
        unitName: spec?.unit || "Unit",
        weightPerUnit: spec?.weightPerUnit || 0,
        totalWeight: weight
      };
    });
  }, [rows, activeProductsMap]);

  const totals = useMemo(() => {
    const weight = calculatedRows.reduce((acc, curr) => acc + curr.totalWeight, 0);
    const quantity = calculatedRows.reduce((acc, curr) => acc + curr.quantity, 0);
    return {
      totalWeightKg: weight,
      totalWeightTons: weight / 1000,
      totalQty: quantity
    };
  }, [calculatedRows]);

  // Truck recommendation based on weight limits typical in Indonesia
  const truckRecommendation = useMemo(() => {
    const wt = totals.totalWeightKg;
    if (wt <= 0) return { name: "-", capacity: "-", color: "text-slate-400 bg-slate-100 border-slate-200" };
    if (wt <= 1500) {
      return {
        name: "Pick-Up / L300 Box",
        capacity: "Kapasitas Maks. 1.5 Ton",
        color: "text-emerald-800 bg-emerald-50 border-emerald-200"
      };
    } else if (wt <= 4000) {
      return {
        name: "Truk CDE / CDD Colt Diesel Double",
        capacity: "Kapasitas Maks. 4.0 Ton",
        color: "text-blue-800 bg-blue-50 border-blue-200"
      };
    } else if (wt <= 8000) {
      return {
        name: "Truk Fuso Engkel",
        capacity: "Kapasitas Maks. 8.0 Ton",
        color: "text-orange-850 bg-amber-50 border-amber-200"
      };
    } else {
      return {
        name: "Truk Tronton / Trailer",
        capacity: "Kapasitas Lebih dari 8.0 Ton",
        color: "text-rose-800 bg-rose-50 border-rose-200"
      };
    }
  }, [totals]);

  const handleAddRow = () => {
    const firstProduct = PRODUCTS[0];
    setRows(prev => [
      ...prev,
      {
        id: `row-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: firstProduct.id,
        specIndex: 0,
        quantity: 10
      }
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length <= 1) return; // Maintain at least 1 row
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const handleRowChange = (id: string, field: "productId" | "specIndex" | "quantity", value: any) => {
    setRows(prev =>
      prev.map(row => {
        if (row.id !== id) return row;
        
        if (field === "productId") {
          // If product changes, reset spec index to 0
          return { ...row, productId: value, specIndex: 0 };
        }
        return { ...row, [field]: value };
      })
    );
  };

  const handleReset = () => {
    setRows([{ id: "row-1", productId: PRODUCTS[0].id, specIndex: 2, quantity: 50 }]);
  };

  const handleSendEstimation = () => {
    if (calculatedRows.length === 0) return;

    let itemsText = "";
    calculatedRows.forEach((row, i) => {
      itemsText += `${i + 1}. *[${row.productName}]* ${row.specSize}\n` +
                   `   Jumlah: ${row.quantity} ${row.unitName}\n` +
                   `   Est. Berat: ${row.totalWeight.toFixed(2)} Kg\n\n`;
    });

    const textMessage = `Halo Admin, saya ingin menanyakan penawaran harga terbaik untuk estimasi kubikasi/tonase material berikut:\n\n` +
      `📋 *Rencana Anggaran & Kebutuhan Material:*\n` +
      `------------------------------------------\n` +
      `${itemsText}` +
      `------------------------------------------\n` +
      `⚖️ *Total Estimasi Berat:* ${totals.totalWeightKg.toFixed(2)} Kg (${totals.totalWeightTons.toFixed(2)} Ton)\n` +
      `🚛 *Rekomendasi Armada:* ${truckRecommendation.name} (${truckRecommendation.capacity})\n\n` +
      `Mohon bantu hitungkan total biaya, opsi diskon proyek, dan estimasi waktu kirim ke proyek kami. Terima kasih!`;

    const waUrl = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(textMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section id="estimator-calculator" className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl">
            <CalcIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              Kalkulator Tonase &amp; Estimasi Kirim
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Formulir hitung otomatis berat total besi baja proyek sebelum dikirim ke armada logistik.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-xs text-slate-300 font-medium transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Hitungan
        </button>
      </div>

      {/* Calculator Form rows */}
      <div className="space-y-4">
        {rows.map((row, idx) => {
          const product = activeProductsMap.get(row.productId);
          const currentCalculatedRow = calculatedRows[idx];

          return (
            <div
              key={row.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 items-end relative group"
            >
              {/* Product Select */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                  Pilih Kategori Produk
                </label>
                <select
                  value={row.productId}
                  onChange={(e) => handleRowChange(row.id, "productId", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 hover:border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specification Select */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                  Pilih Spesifikasi &amp; Ketebalan
                </label>
                <select
                  value={row.specIndex}
                  onChange={(e) => handleRowChange(row.id, "specIndex", parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 hover:border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  {product?.specifications.map((spec, sIdx) => (
                    <option key={sIdx} value={sIdx}>
                      {spec.size} ({spec.weightPerUnit.toFixed(1)} Kg/{spec.unit === "Batang" ? "Btg" : spec.unit})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[11px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                  Btg / Lembar / Roll
                </label>
                <input
                  type="number"
                  min="1"
                  value={row.quantity}
                  onChange={(e) => handleRowChange(row.id, "quantity", parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 hover:border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-sm text-center font-mono focus:outline-none"
                />
              </div>

              {/* Est Weight Output & Remove row */}
              <div className="md:col-span-2 flex items-center justify-between gap-2.5">
                <div className="text-right flex-1 p-2 bg-slate-900/50 rounded border border-slate-850">
                  <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                    Est. Berat
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-500">
                    {currentCalculatedRow?.totalWeight.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Kg
                  </span>
                </div>

                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(row.id)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-800 hover:bg-rose-950/20 transition-all cursor-pointer self-center"
                    title="Hapus baris"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleAddRow}
          className="w-full border border-dashed border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/5 text-amber-500 py-3 rounded-lg text-xs font-semibold font-display transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          + Tambah Item Estimasi Lainnya
        </button>
      </div>

      {/* Summary Box & Truck Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4 border-t border-slate-800/80">
        {/* Statistics 1: Totals */}
        <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/60 space-y-3">
          <span className="text-slate-400 text-xs font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <HardHat className="w-4 h-4 text-amber-500" />
            Total Muatan Konstruksi
          </span>
          <div className="flex md:flex-row flex-col justify-between items-baseline gap-2">
            <div>
              <span className="text-3xl font-mono font-bold text-white">
                {totals.totalWeightKg.toLocaleString("id-ID", { maximumFractionDigits: 1 })}
              </span>
              <span className="text-xs font-mono ml-1 text-slate-400">Kg</span>
            </div>
            <div className="text-slate-400 text-sm">
              (<span className="text-amber-400 font-mono font-semibold">{totals.totalWeightTons.toFixed(2)}</span> Ton)
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Beban di atas adalah total kalkulasi teoritis baja besi. Berguna untuk pemesanan ekspedisi atau koli sewaan.
          </p>
        </div>

        {/* Statistics 2: Truck Advice */}
        <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/60 space-y-3">
          <span className="text-slate-400 text-xs font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-500" />
            Rekomendasi Truk Logisitik
          </span>
          {totals.totalWeightKg > 0 ? (
            <div className={`p-3.5 rounded-lg border text-sm flex flex-col justify-center min-h-[58px] ${truckRecommendation.color}`}>
              <span className="font-display font-bold block">{truckRecommendation.name}</span>
              <span className="text-[11px] opacity-90 block mt-0.5">{truckRecommendation.capacity}</span>
            </div>
          ) : (
            <div className="p-3.5 rounded-lg border border-slate-800 text-slate-500 text-xs italic flex items-center min-h-[58px]">
              Silakan isi item estimasi di atas...
            </div>
          )}
          <p className="text-[11px] text-slate-400 leading-normal">
            * Rekomendasi berdasarkan regulasi batas angkut standar (over-loading protection).
          </p>
        </div>

        {/* CTA: Quote via WhatsApp */}
        <div className="flex flex-col justify-center">
          <button
            type="button"
            id="estimator-quote-btn"
            onClick={handleSendEstimation}
            disabled={totals.totalWeightKg <= 0}
            className="w-full h-full py-6 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 font-display font-bold text-sm tracking-wide transition-all shadow-md shadow-amber-500/10 flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <FileOutput className="w-5 h-5 flex-shrink-0" />
            <span>Kirim Estimasi &amp; Tanya Harga via WA</span>
            <span className="text-[10px] opacity-75 font-mono tracking-widest uppercase font-semibold">
              RESELLER &amp; KONTRAKTOR COCOK
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
