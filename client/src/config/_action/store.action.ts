import axios from "axios";
import { Dispatch } from "react";
import { NewStoreDataType, StoreDataType } from "../../utils/type";
import { STORE_ACTION_TYPES } from "../_reducers/store.reducer";
import { apiUrl } from "../_store/share-config";

/**
 * Using when call the api (create, update, delete) manually
 * @param dispatch
 * @param isLoading
 */
const storeLoading = (dispatch: Dispatch<any>, isLoading: boolean) => {
  dispatch({
    type: STORE_ACTION_TYPES.LOADING,
    payload: isLoading,
  });
};

/**
 * `Fetch data store`
 *
 * Fetch data when fist time load stores page.
 *
 * Using redux-promise-middleware
 * @param dispatch
 * @returns
 */
export const getAllStore = async (dispatch: Dispatch<any>) => {
  await dispatch({
    type: STORE_ACTION_TYPES.GET_ALL,
    payload: axios.get(`${apiUrl}/store`),
  });
};

/**
 * `Add new store action`
 *
 * Call api manually.
 * If success, update state redux.
 * @param dispatch
 * @param newStore submmit form
 * @returns
 */
export const addNewStore = async (
  dispatch: Dispatch<any>,
  newStore: NewStoreDataType
) => {
  try {
    await storeLoading(dispatch, true);
    const response = await axios.post(`${apiUrl}/store`, newStore);
    await storeLoading(dispatch, false);

    if (response.data.success) {
      dispatch({
        type: STORE_ACTION_TYPES.ADD_STORE,
        payload: response.data.newStore,
      });
      return response.data;
    }
  } catch (error) {
    await storeLoading(dispatch, false);
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server error" };
  }
};

/**
 * `Update store action`
 *
 * Call api manually.
 * If success, update state redux.
 * @param dispatch
 * @param updateStore submmit form
 * @returns
 */
export const handleUpdateStore = async (
  dispatch: Dispatch<any>,
  updateStore: StoreDataType
) => {
  try {
    await storeLoading(dispatch, true);
    const response = await axios.put(
      `${apiUrl}/store/${updateStore._id}`,
      updateStore
    );
    await storeLoading(dispatch, false);

    if (response.data.success) {
      dispatch({
        type: STORE_ACTION_TYPES.UPDATE_STORE,
        payload: response.data.updatedStore,
      });
      return response.data;
    }
  } catch (error) {
    await storeLoading(dispatch, false);
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
 * @param storeId
 * @returns
 */
export const handleDeleteStore = async (
  dispatch: Dispatch<any>,
  storeId: string
) => {
  try {
    await storeLoading(dispatch, true);
    const response = await axios.delete(`${apiUrl}/store/${storeId}`);
    await storeLoading(dispatch, false);
    if (response.data.success) {
      dispatch({
        type: STORE_ACTION_TYPES.DELETE_STORE,
        payload: response.data.deletedStore,
      });
      return response.data;
    }
  } catch (error) {
    await storeLoading(dispatch, false);
    return error.response.data
      ? error.response.data
      : { success: false, message: "Server error" };
  }
};
