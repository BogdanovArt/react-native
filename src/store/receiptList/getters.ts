import { RootState } from "../index";

export const getReceiptTable = (state: RootState) => state.receiptsList.data?.table;
export const getFetching = (state: RootState) => state.receiptsList.fetching;