export interface ReceiptState {
  title: string;
  data: ReceiptData | null;
  fetching: boolean;
}

export interface ReceiptData {
  table: TableData;
}

export interface TableData {
  headers: Array<TableHeader>;
  items: Array<TableItem>;
}

export interface TableHeader {
  key: string;
  title: string;
}

export interface TableItem {
  [key: string]: string | number | undefined;
}