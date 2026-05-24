/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SteelSpecification {
  size: string;
  thickness?: string;
  weightPerUnit: number; // in kg
  unit: string; // "Batang", "Lembar", "Roll", etc.
  length?: number; // in meters
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  standard: string;
  badge: string;
  specifications: SteelSpecification[];
  whatsappText: string;
}

export interface InquiryItem {
  productId: string;
  productName: string;
  specIndex: number;
  specSize: string;
  quantity: number;
  weightPerUnit: number;
  unit: string;
}
