import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./auth";
import receiptReducer from "./receiptList";
import createReceiptReducer from "./receiptCreate";
import ratingReducer from "./ratings";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    receiptsList: receiptReducer,
    receiptCreate: createReceiptReducer,
    rating: ratingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
