import _ from "lodash";
import { AnyAction } from "redux";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constant";
import { REQUEST, SUCCESS, FAILURE } from "../_store/share-config";

export const AUTH_ACTION_TYPES = {
  LOAD_USER: "AUTH_ACTION_TYPES/LOAD_USER",
  LOGOUT: "AUTH_ACTION_TYPES/LOGOUT",
  LOADING: "AUTH_ACTION_TYPES/LOADING",
};

const initialState = {
  authLoading: false,
  isAuthenticated: false,
  user: {
    _id: "",
    username: "",
    createdAt: "",
  },
};

export type AuthState = Readonly<typeof initialState>;

/**
 * Action auth loading.
 *
 * Use when call API (create, update, delete)
 * @param state
 * @param action
 * @returns
 */
const authReducerLoading = (
  state: AuthState = initialState,
  action: AnyAction
): Partial<AuthState> => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOADING: {
      return {
        ...state,
        authLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

/**
 * Action load user (async)
 *
 * Using redux-promise-middleware
 * @param state
 * @param action
 * @returns
 */
const authReducerLoadUser = (
  state: AuthState = initialState,
  action: AnyAction
): Partial<AuthState> => {
  switch (action.type) {
    case REQUEST(AUTH_ACTION_TYPES.LOAD_USER): {
      return {
        ...state,
        authLoading: true,
      };
    }
    case SUCCESS(AUTH_ACTION_TYPES.LOAD_USER): {
      const data = action.payload.data;
      return {
        ...state,
        authLoading: false,
        isAuthenticated: true,
        user: data.user,
      };
    }
    case FAILURE(AUTH_ACTION_TYPES.LOAD_USER): {
      return {
        ...state,
        authLoading: false,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

/**
 * Action logout
 * @param state
 * @param action
 * @returns
 */
const authReducerLogout = (
  state: AuthState = initialState,
  action: AnyAction
): Partial<AuthState> => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGOUT: {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
};

// Reducer
const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): Partial<AuthState> => {
  if (_.includes(action.type, AUTH_ACTION_TYPES.LOAD_USER))
    return authReducerLoadUser(state, action);
  if (_.includes(action.type, AUTH_ACTION_TYPES.LOGOUT))
    return authReducerLogout(state, action);
  if (_.includes(action.type, AUTH_ACTION_TYPES.LOADING))
    return authReducerLoading(state, action);

  return state;
};

export default authReducer;
