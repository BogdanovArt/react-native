import { PayloadAction } from "@reduxjs/toolkit";
import { RatingState } from "./types";

const reducers = {
  setRatingData: (state: RatingState, action: PayloadAction<RatingState>) => {
    state.title = action.payload.title;
    state.data = action.payload.data;
  },
};

export default reducers;
