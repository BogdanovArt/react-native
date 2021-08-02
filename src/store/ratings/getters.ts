import { RootState } from "../index";

export const getRatingTable = (state: RootState) => state.rating.data?.table;
export const getRatingTitle = (state: RootState) => state.rating.title;