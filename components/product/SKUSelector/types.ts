import { ProductSKU } from '@/lib/types';

export interface SKUSelectorProps {
  skus: ProductSKU[];
  selectedSku: ProductSKU | null;
  onSkuChange: (sku: ProductSKU) => void;
}

export interface AttributeGroup {
  key: string;
  title: string;
  values: {
    value: string;
    caption: string;
    available: boolean;
    skus: ProductSKU[];
  }[];
}
