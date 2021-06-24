import { StoreDataType } from "./../../utils/type";
import { AnyAction } from "redux";
import { ItemDataType } from "../../utils/type";
import { REQUEST, SUCCESS, FAILURE } from "../_store/share-config";
import _ from "lodash";

export const ITEM_ACTION_TYPES = {
  GET_ALL_ITEMS: "ITEM_ACTION_TYPES/GET_ALL_ITEMS",
  LOADING: "ITEM_ACTION_TYPES/LOADING",
  ADD_ITEM: "ITEM_ACTION_TYPES/ADD_ITEM",
  DELETE_ITEM: "ITEM_ACTION_TYPES/DELETE_ITEM",
};

const initialState = {
  itemLoading: false,
  itemsOfStore: [] as ItemDataType[],
  targetStore: {} as StoreDataType,
};

export type ItemState = Readonly<typeof initialState>;

/**
 * Action item loading.
 *
 * Use when call API (create, update, delete)
 * @param state
 * @param action
 * @returns
 */
const itemReducerLoading = (
  state: ItemState = initialState,
  action: AnyAction
): ItemState | null => {
  switch (action.type) {
    case ITEM_ACTION_TYPES.LOADING: {
      return {
        ...state,
        itemLoading: action.payload,
      };
    }
    default:
      return null;
  }
};

/**
 * Action get all item in stores (async)
 *
 * Using redux-promise-middleware
 * @param state
 * @param action
 * @returns
 */
const itemReducerGetAll = (
  state: ItemState = initialState,
  action: AnyAction
): ItemState | null => {
  switch (action.type) {
    case REQUEST(ITEM_ACTION_TYPES.GET_ALL_ITEMS): {
      return {
        ...state,
        itemLoading: true,
      };
    }
    case SUCCESS(ITEM_ACTION_TYPES.GET_ALL_ITEMS): {
      return {
        ...state,
        itemLoading: false,
        itemsOfStore: action.payload.data.itemsOfStore,
        targetStore: action.payload.data.targetStore,
      };
    }
    case FAILURE(ITEM_ACTION_TYPES.GET_ALL_ITEMS): {
      return {
        ...state,
        itemLoading: false,
      };
    }
    default:
      return null;
  }
};

/**
 * Action add item to list after
 * request add new item api success
 * @param state
 * @param action
 * @returns
 */
const itemReducerAddStore = (
  state: ItemState = initialState,
  action: AnyAction
): ItemState | null => {
  switch (action.type) {
    case ITEM_ACTION_TYPES.ADD_ITEM: {
      return {
        ...state,
        itemsOfStore: [...state.itemsOfStore, action.payload],
      };
    }
    default:
      return null;
  }
};

/**
 * Delete store from list after
 * request create new store api success
 * @param state
 * @param action
 * @returns
 */
const itemReducerDeleteStore = (
  state: ItemState = initialState,
  action: AnyAction
): ItemState | null => {
  switch (action.type) {
    case ITEM_ACTION_TYPES.DELETE_ITEM: {
      const deleteItem = action.payload;
      return {
        ...state,
        itemsOfStore: _.filter(
          state.itemsOfStore,
          (item) => item._id !== deleteItem._id
        ),
      };
    }
    default:
      return null;
  }
};

// Reducer
const itemReducer = (
  state: ItemState = initialState,
  action: AnyAction
): Partial<ItemState> => {
  let updatedState = null as ItemState | null;
  if (!updatedState) updatedState = itemReducerLoading(state, action);
  if (!updatedState) updatedState = itemReducerGetAll(state, action);
  if (!updatedState) updatedState = itemReducerAddStore(state, action);
  if (!updatedState) updatedState = itemReducerDeleteStore(state, action);
  if (!updatedState) updatedState = state;

  return updatedState;
};

export default itemReducer;
