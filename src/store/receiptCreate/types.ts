import { ReceiptData } from "../receiptList/types";

export interface CreateReceiptState {
  data: ReceiptData | null;
  fetching: boolean;
}

export interface ProductPayloadItem {
  itemid: string;
  qty: string;
  price: string;
  total: string;
}

export interface ProductItem {
  index: number | string;
  barcode: number | string;
  itemid: string;
  name: string;
  quantity: number | string;
  price: number | string;
  remainder: number | string;
}

export type CreatePayload = Array<ProductPayloadItem>;
