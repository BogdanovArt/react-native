import { ReceiptData } from "../receiptList/types";

export interface RatingState {
  title: string;
  data: ReceiptData | null;
}