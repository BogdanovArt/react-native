import { AppThunk } from "..";
import { axios } from "../../utils/axiosAccessor";

import { RequestMethods } from "../../types/enums";
import { API } from "../../utils/api";
import { setFetching, setReceiptData } from "./index";

export const getData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetching(true));

    const res = await axios({
      url: API.RECEIPT.INDEX,
      method: RequestMethods.GET,
    });

    const { data } = res.data;
    if (data?.data?.table) {  
      dispatch(setReceiptData(data.data));
    }
  } catch (error) {
    console.error("Ошибка получения данных страницы", error);
  } finally {    
    dispatch(setFetching(false));
  }
};
