import { createSlice } from "@reduxjs/toolkit";

import { RatingState } from "./types";

import reducers from "./reducers";

const initialState: RatingState = {
  title: "",
  data: null,
};

export const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers,
});

export const { setRatingData } =
ratingSlice.actions;

export default ratingSlice.reducer;
