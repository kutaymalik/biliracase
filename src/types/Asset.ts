// src/types/Asset.ts
export interface Asset {
  s: string;
  c: string;
  p: string;
  q: string;
  P: string;
  klineData?: number[]; // Add this line
  priceChanged?: boolean;
  quoteAsset?: string;
}
