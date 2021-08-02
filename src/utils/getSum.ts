import { TableItem } from "../store/receiptList/types";

export default function getSum(items: TableItem[]) {
  let total = 0;
  items.forEach((item) => {
    const quantity = parseInt(item.quantity as string) || 0;
    const price = item.price as number || 0;
    total += price * quantity;
  });
  return total;
}
