import _ from "lodash";
import { AnyAction } from "redux";
import { StoreDataType } from "../../utils/type";
import { REQUEST, SUCCESS, FAILURE } from "../_store/share-config";

export const STORE_ACTION_TYPES = {
  LOADING: "STORE_ACTION_TYPES/LOADING",
  GET_ALL: "STORE_ACTION_TYPES/GET_ALL",
  ADD_STORE: "STORE_ACTION_TYPES/ADD_STORE",
  UPDATE_STORE: "STORE_ACTION_TYPES/UPDATE_STORE",
  DELETE_STORE: "STORE_ACTION_TYPES/DELETE_STORE",
};

const initialState = {
  storeLoading: false,
  stores: [] as StoreDataType[],
};

export type StoreState = Readonly<typeof initialState>;

/**
 * Action auth loading.
 *
 * Use when call API (create, update, delete)
 * @param state
 * @param action
 * @returns
 */
const storeReducerLoading = (
  state: StoreState = initialState,
  action: AnyAction
): StoreState | null => {
  switch (action.type) {
    case STORE_ACTION_TYPES.LOADING: {
      return {
        ...state,
        storeLoading: action.payload,
      };
    }
    default:
      return null;
  }
};

/**
 * Action get all stores (async)
 *
 * Using redux-promise-middleware
 * @param state
 * @param action
 * @returns
 */
const storeReducerGetAll = (
  state: StoreState = initialState,
  action: AnyAction
): StoreState | null => {
  switch (action.type) {
    case REQUEST(STORE_ACTION_TYPES.GET_ALL): {
      return {
        ...state,
        storeLoading: true,
      };
    }
    case SUCCESS(STORE_ACTION_TYPES.GET_ALL): {
      return {
        ...state,
        storeLoading: false,
        stores: action.payload.data.stores || [],
      };
    }
    case FAILURE(STORE_ACTION_TYPES.GET_ALL): {
      return {
        ...state,
        storeLoading: false,
      };
    }
    default:
      return null;
  }
};

/**
 * Action add store to list after
 * request create new store api success
 * @param state
 * @param action
 * @returns
 */
const storeReducerAddStore = (
  state: StoreState = initialState,
  action: AnyAction
): StoreState | null => {
  switch (action.type) {
    case STORE_ACTION_TYPES.ADD_STORE: {
      return {
        ...state,
        stores: [...state.stores, action.payload],
      };
    }
    default:
      return null;
  }
};

/**
 * Action add store to list after
 * request createStoreApi success
 * @param state
 * @param action
 * @returns
 */
const storeReducerUpdateStore = (
  state: StoreState = initialState,
  action: AnyAction
): StoreState | null => {
  switch (action.type) {
    case STORE_ACTION_TYPES.UPDATE_STORE: {
      const updateStores = state.stores;
      const updatedStore = action.payload;
      const updatedIndex = _.findIndex(
        state.stores,
        (item) => item._id === updatedStore._id
      );
      if (updatedIndex === -1) {
        updateStores.push(updatedStore);
      } else {
        updateStores[updatedIndex] = updatedStore;
      }
      return {
        ...state,
        stores: updateStores,
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
const storeReducerDeleteStore = (
  state: StoreState = initialState,
  action: AnyAction
): StoreState | null => {
  switch (action.type) {
    case STORE_ACTION_TYPES.DELETE_STORE: {
      const deleteStore = action.payload;
      return {
        ...state,
        stores: _.filter(state.stores, (item) => item._id !== deleteStore._id),
      };
    }
    default:
      return null;
  }
};

// Reducer
const storeReducer = (
  state: StoreState = initialState,
  action: AnyAction
): Partial<StoreState> => {
  let updatedState = null as StoreState | null;
  if (!updatedState) updatedState = storeReducerLoading(state, action);
  if (!updatedState) updatedState = storeReducerGetAll(state, action);
  if (!updatedState) updatedState = storeReducerAddStore(state, action);
  if (!updatedState) updatedState = storeReducerUpdateStore(state, action);
  if (!updatedState) updatedState = storeReducerDeleteStore(state, action);
  if (!updatedState) updatedState = state;

  return updatedState;
};

export default storeReducer;
