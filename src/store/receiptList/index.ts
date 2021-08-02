import { createSlice } from "@reduxjs/toolkit";

import { ReceiptState } from "./types";

import reducers from "./reducers";

const initialState: ReceiptState = {
  title: "",
  data: null,
  fetching: false,
};

export const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers,
});

export const { setReceiptData, setFetching } =
  receiptSlice.actions;

export default receiptSlice.reducer;
