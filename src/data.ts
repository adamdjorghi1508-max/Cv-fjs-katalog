/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "./types";

export const CONTACT_PHONE = "6287839692863"; // Sesuai dengan wa.me/6287839692863
export const CONTACT_WA_LINK = `https://wa.me/${CONTACT_PHONE}`;

export const PRODUCTS: Product[] = [
  {
    id: "besi-beton",
    category: "beton",
    name: "Besi Beton Polos & Ulir",
    description: "Besi beton berkualitas tinggi bersertifikasi SNI. Tersedia opsi polos (untuk kemudahan pembengkokan) dan ulir (deformed bar, untuk ikatan beton optimal). Sangat direkomendasikan untuk struktur beton bertulang, gedung, jembatan, dan jalan.",
    standard: "Standar SNI 2052:2017",
    badge: "Harga Kompetitif",
    whatsappText: "Tanya Stok via WA",
    specifications: [
      { size: "Polos 6mm", weightPerUnit: 2.66, unit: "Batang", length: 12 },
      { size: "Polos 8mm", weightPerUnit: 4.74, unit: "Batang", length: 12 },
      { size: "Polos 10mm", weightPerUnit: 7.40, unit: "Batang", length: 12 },
      { size: "Polos 12mm", weightPerUnit: 10.66, unit: "Batang", length: 12 },
      { size: "Ulir D13", weightPerUnit: 12.50, unit: "Batang", length: 12 },
      { size: "Ulir D16", weightPerUnit: 18.94, unit: "Batang", length: 12 }
    ]
  },
  {
    id: "besi-cnp",
    category: "cnp",
    name: "Besi CNP (Kanal C)",
    description: "Besi profil kanal C yang sering digunakan untuk dudukan material atap (gording), struktur rangka plafon, tiang kanopi, penyangga dinding, dan purlin. Kuat, tahan beban tekuk tinggi, dan mudah dilas.",
    standard: "Standar JIS G3350 / SNI",
    badge: "Ready Stock",
    whatsappText: "Pesan CNP via WA",
    specifications: [
      { size: "CNP 100 x 50 x 20 x 1.2mm", weightPerUnit: 7.40, unit: "Batang", length: 6 },
      { size: "CNP 100 x 50 x 20 x 1.6mm", weightPerUnit: 9.40, unit: "Batang", length: 6 },
      { size: "CNP 100 x 50 x 20 x 2.0mm", weightPerUnit: 12.00, unit: "Batang", length: 6 },
      { size: "CNP 100 x 50 x 20 x 3.2mm", weightPerUnit: 18.20, unit: "Batang", length: 6 },
      { size: "CNP 125 x 50 x 20 x 1.6mm", weightPerUnit: 10.80, unit: "Batang", length: 6 },
      { size: "CNP 125 x 50 x 20 x 2.0mm", weightPerUnit: 13.50, unit: "Batang", length: 6 },
      { size: "CNP 125 x 50 x 20 x 3.2mm", weightPerUnit: 21.00, unit: "Batang", length: 6 }
    ]
  },
  {
    id: "besi-wf",
    category: "wf",
    name: "Besi WF (Wide Flange)",
    description: "Baja profil struktural premium dengan kekuatan tarik dan tekan tinggi. Sempurna untuk struktur balok penahan, tiang kolom gudang industri, konstruksi kapal, jembatan baja, dan balok kantilever bentang lebar.",
    standard: "Standar SNI 03-1729 / JIS G3101",
    badge: "Harga per KG / Batang",
    whatsappText: "Cek Harga WF via WA",
    specifications: [
      { size: "WF 150 x 75 x 5 x 7mm", weightPerUnit: 168.00, unit: "Batang", length: 12 },
      { size: "WF 200 x 100 x 5.5 x 8mm", weightPerUnit: 255.60, unit: "Batang", length: 12 },
      { size: "WF 250 x 125 x 6 x 9mm", weightPerUnit: 355.20, unit: "Batang", length: 12 },
      { size: "WF 300 x 150 x 6.5 x 9mm", weightPerUnit: 440.40, unit: "Batang", length: 12 }
    ]
  },
  {
    id: "besi-wiremesh",
    category: "wiremesh",
    name: "Besi Wiremesh",
    description: "Jaring baja las yang dirancang khusus untuk memberi perkuatan (reinforcement) pada konstruksi beton lantai (slab-on-ground), dak beton bertingkat, dinding penahan tanah, dan jalan raya agar tahan retak.",
    standard: "Standar SNI 07-0663 U-50",
    badge: "Stok Ready",
    whatsappText: "Tanya Stok via WA",
    specifications: [
      { size: "Wiremesh M6 Lembar (2.1 x 5.4m)", weightPerUnit: 15.45, unit: "Lembar" },
      { size: "Wiremesh M8 Lembar (2.1 x 5.4m)", weightPerUnit: 27.47, unit: "Lembar" },
      { size: "Wiremesh M10 Lembar (2.1 x 5.4m)", weightPerUnit: 42.92, unit: "Lembar" },
      { size: "Wiremesh M6 Roll (2.1 x 54m)", weightPerUnit: 154.50, unit: "Roll" },
      { size: "Wiremesh M8 Roll (2.1 x 54m)", weightPerUnit: 274.70, unit: "Roll" }
    ]
  },
  {
    id: "baja-ringan",
    category: "bajaringan",
    name: "Baja Ringan Canal C & Reng",
    description: "Canal C Galvalum (Truss) dan Reng baja ringan bersertifikasi SNI. Anti-rayap dan berdaya lapis zinc-aluminium tinggi untuk menjamin kekokohan rangka atap rumah dan partisi struktural modern.",
    standard: "SNI 8399:2017 / Zincalume Klasik",
    badge: "Stok Melimpah",
    whatsappText: "Pesan Baja Ringan",
    specifications: [
      { size: "Canal C75 Ketebalan 0.65mm", weightPerUnit: 4.20, unit: "Batang", length: 6 },
      { size: "Canal C75 Ketebalan 0.70mm", weightPerUnit: 4.54, unit: "Batang", length: 6 },
      { size: "Canal C75 Ketebalan 0.75mm", weightPerUnit: 4.86, unit: "Batang", length: 6 },
      { size: "Reng Baja Ringan R30 x 0.40mm", weightPerUnit: 1.45, unit: "Batang", length: 6 },
      { size: "Reng Baja Ringan R32 x 0.45mm", weightPerUnit: 1.65, unit: "Batang", length: 6 }
    ]
  },
  {
    id: "atap-spandek",
    category: "atap",
    name: "Atap Spandek Galvalum",
    description: "Atap Zincalume gelombang hias penutup atap multifungsi untuk kanopi carport, rumah tinggal, pabrik, maupun pagar pengaman proyek. Ringan, tahan gempa, dan bervariasi dalam level ketebalan mili.",
    standard: "Standar JIS G3321 / SNI Tinggi",
    badge: "Harga Pabrik",
    whatsappText: "Pesan Atap Spandek",
    specifications: [
      { size: "Spandek Gelombang 0.30mm x Lebar 1m", weightPerUnit: 14.50, unit: "Lembar", length: 6 },
      { size: "Spandek Gelombang 0.35mm x Lebar 1m", weightPerUnit: 16.80, unit: "Lembar", length: 6 },
      { size: "Spandek Gelombang 0.40mm x Lebar 1m", weightPerUnit: 19.20, unit: "Lembar", length: 6 }
    ]
  },
  {
    id: "baut-roofing-truss",
    category: "aksesoris",
    name: "Baut Spandek & Sekrup Baja Ringan",
    description: "Alat pengencang Self Drilling Screw (SDS) berlapis zinc coating anti-karat. Dilengkapi seal karet elastis anti-bocor untuk pemasangan spandek (atap) dan mata drat silinder presisi untuk perakitan rangka truss canal c / reng.",
    standard: "Grade Konstruksi Teruji",
    badge: "Ecer & Dus Ready",
    whatsappText: "Tanya Baut WA",
    specifications: [
      { size: "Baut Spandek (Roofing) Hex 12 x 50mm + Karet", weightPerUnit: 0.015, unit: "Pcs" },
      { size: "Baut Spandek (Roofing) Hex 12 x 75mm + Karet", weightPerUnit: 0.022, unit: "Pcs" },
      { size: "Sekrup Baja Ringan 10 x 19mm Wafer Head (Truss)", weightPerUnit: 0.005, unit: "Pcs" },
      { size: "Sekrup Baja Ringan 10 x 16mm (Truss)", weightPerUnit: 0.004, unit: "Pcs" }
    ]
  },
  {
    id: "angkur-jarum-keras",
    category: "aksesoris",
    name: "Baut Angkur (Anchor) & Jarum Keras",
    description: "Tersedia Besi Angkur Model L (dilengkapi washer ring & mur ganda) untuk penahan tiang kolom baja ke coran, serta Jarum Keras (Turnbuckle Spanner) sebagai setelan tegangan tali seling / bracing silang konstruksi.",
    standard: "Standard ASTM High Tensile Strength",
    badge: "Asli Baja Kuat",
    whatsappText: "Kalkulasi Angkur WA",
    specifications: [
      { size: "Baut Angkur L 16mm x 500mm + Mur Ring", weightPerUnit: 1.25, unit: "Pcs" },
      { size: "Baut Angkur L 19mm x 600mm + Mur Ring", weightPerUnit: 2.10, unit: "Pcs" },
      { size: "Baut Angkur L 22mm x 700mm + Mur Ring", weightPerUnit: 3.25, unit: "Pcs" },
      { size: "Jarum Keras (Turnbuckle / Spanner) M12", weightPerUnit: 0.42, unit: "Pcs" },
      { size: "Jarum Keras (Turnbuckle / Spanner) M16 Heavy Duty", weightPerUnit: 0.98, unit: "Pcs" },
      { size: "Jarum Keras (Turnbuckle / Spanner) M20 Heavy Duty", weightPerUnit: 1.85, unit: "Pcs" }
    ]
  }
];
