import { PayloadAction } from "@reduxjs/toolkit";

import { ReceiptData, TableItem } from "../receiptList/types";
import { CreateReceiptState } from "./types";

const reducers = {
  setProducts: (
    state: CreateReceiptState,
    action: PayloadAction<ReceiptData | null>
  ) => {
    state.data = action.payload;
  },
  setFetching: (state: CreateReceiptState, action: PayloadAction<boolean>) => {
    state.fetching = action.payload;
  },
  removePosition: (
    state: CreateReceiptState,
    action: PayloadAction<TableItem>
  ) => {
    const snap: ReceiptData = JSON.parse(JSON.stringify(state.data));
    let items = snap?.table.items;
    if (items && items.length) {
      const match = items.findIndex(
        (arrayItem) => action.payload.itemid === arrayItem.itemid
      );
      items.splice(match, 1);
      snap.table.items = items.map((position, index) => ({ ...position, index: index + 1 }));
      state.data = snap;
    }
  },
};

export default reducers;
