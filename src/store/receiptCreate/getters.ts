import { RootState } from "../index";

export const getProducts = (state: RootState) => state.receiptCreate.data?.table;
export const getFetching = (state: RootState) => state.receiptCreate.fetching;