import { AppThunk } from "..";

import { axios } from "../../utils/axiosAccessor";
import { API } from "../../utils/api";
import ALERT from "../../utils/alert";

import { RequestMethods } from "../../types/enums";
import { setRatingData } from "./index";
import { defaultError } from "../../utils/consts";

export const getData = (): AppThunk => async (dispatch) => {
  try {
    const res = await axios({
      url: API.RATING,
      method: RequestMethods.GET,
    });

    const { data } = res.data;
    
    if (data?.data?.table) {  
      dispatch(setRatingData(data));
    }
  } catch (error) {
    console.error(defaultError, error);
    ALERT({ message: defaultError})
  }
};
