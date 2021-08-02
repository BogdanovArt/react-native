import { AppThunk } from "..";
import { setFetching, setProducts } from "./index";

import { RequestMethods } from "../../types/enums";
import { ProductPayloadItem } from "./types";

import { axios } from "../../utils/axiosAccessor";
import { API } from "../../utils/api";
import ALERT from "../../utils/alert";

interface CreatePayload {
  items: Array<ProductPayloadItem>;
  onSuccess?: () => void 
}

export const saveData =
  ({ items, onSuccess }: CreatePayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setFetching(true));

      const res = await axios({
        url: API.RECEIPT.CREATE,
        method: RequestMethods.POST,
        data: items,
      });

      if (res.status < 400 && onSuccess) onSuccess();
      
    } catch (error) {
      ALERT({ message: "Ошибка сохранения" });
      console.error("Ошибка сохранения", error);
    } finally {
      dispatch(setFetching(false));
    }
  };
