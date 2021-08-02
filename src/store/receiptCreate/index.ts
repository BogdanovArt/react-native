import { createSlice } from "@reduxjs/toolkit";

import { CreateReceiptState } from "./types";

import reducers from "./reducers";

const initialData = {
  table: {
    headers: [
      {
        key: "index",
        title: "№",
      },
      {
        key: "barcode",
        title: "ШК",
      },
      {
        key: "itemid",
        title: "Код товара",
      },
      {
        key: "name",
        title: "Наименование",
      },
      {
        key: "quantity",
        title: "Кол-во",
      },
      {
        key: "price",
        title: "Цена",
      },
      {
        key: "remainder",
        title: "Остаток",
      },
    ],
    items: [
      {
        index: 1,
        barcode: "2010003455736",
        itemid: "IMItem00542051",
        name: "Д_Бейка косая атласная 1",
        quantity: 1,
        price: 8,
        remainder: 1500,
      },
      {
        index: 2,
        barcode: "2010003455737",
        itemid: "IMItem00542052",
        name: "Д_Бейка косая атласная 2",
        quantity: 8,
        price: 150,
        remainder: 150,
      },
      {
        index: 3,
        barcode: "2010003455738",
        itemid: "IMItem00542053",
        name: "Д_Бейка косая атласная 4",
        quantity: 24,
        price: 280,
        remainder: 12,
      },
    ],
  },
};

const initialState: CreateReceiptState = {
  data: null,
  fetching: false,
};

export const receiptSlice = createSlice({
  name: "create",
  initialState,
  reducers,
});

export const { setProducts, setFetching, removePosition } = receiptSlice.actions;

export default receiptSlice.reducer;
