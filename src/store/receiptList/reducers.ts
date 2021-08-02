import { PayloadAction } from "@reduxjs/toolkit";
import { ReceiptData, ReceiptState } from "./types";

const reducers = {
  setReceiptData: (state: ReceiptState, action: PayloadAction<ReceiptData | null>) => {
    state.data = action.payload;
  },
  setFetching: (state: ReceiptState, action: PayloadAction<boolean>) => {
    state.fetching = action.payload;
  },  
};

export default reducers;
