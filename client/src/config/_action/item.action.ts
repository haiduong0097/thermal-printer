import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { NewItemDataType } from "../../utils/type";
import { ITEM_ACTION_TYPES } from "../_reducers/item.reducer";
import { apiUrl } from "../_store/share-config";

/**
 * Using when call the api (create, update, delete) manually
 * @param dispatch
 * @param isLoading
 */
const itemLoading = (dispatch: Dispatch<any>, isLoading: boolean) => {
  dispatch({
    type: ITEM_ACTION_TYPES.LOADING,
    payload: isLoading,
  });
};

export const getAllItemByStore =
  (storeId: string) => async (dispatch: Dispatch<AnyAction>) => {
    await dispatch({
      type: ITEM_ACTION_TYPES.GET_ALL_ITEMS,
      payload: axios.get(`${apiUrl}/item/${storeId}`),
    });
  };

/**
 * `Add new item for store`
 *
 * Call api manually.
 * If success, update state redux.
 * @param dispatch
 * @param storeId store need add item
 * @param itemForm submit form
 */
export const addItemToStore = async (
  dispatch: Dispatch<any>,
  storeId: string,
  itemForm: NewItemDataType
) => {
  try {
    await itemLoading(dispatch, true);
    const response = await axios.post(`${apiUrl}/item/${storeId}`, itemForm);
    await itemLoading(dispatch, false);

    if (response.data.success) {
      dispatch({
        type: ITEM_ACTION_TYPES.ADD_ITEM,
        payload: response.data.newItem,
      });
      return response.data;
    }
  } catch (error) {
    await itemLoading(dispatch, false);
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server error" };
  }
};

/**
 * `Delete store`
 *
 * Call api manually.
 * If success, update state redux.
 *
 * @param dispatch
 * @param itemId
 * @returns
 */
export const handleDeleteItem = async (
  dispatch: Dispatch<any>,
  itemId: string
) => {
  try {
    await itemLoading(dispatch, true);
    const response = await axios.delete(`${apiUrl}/item/${itemId}`);
    await itemLoading(dispatch, false);
    if (response.data.success) {
      dispatch({
        type: ITEM_ACTION_TYPES.DELETE_ITEM,
        payload: response.data.deletedItem,
      });
      return response.data;
    }
  } catch (error) {
    await itemLoading(dispatch, false);
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server error" };
  }
};
