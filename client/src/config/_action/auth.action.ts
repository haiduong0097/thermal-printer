import axios from "axios";
import { Dispatch } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constant";
import setAuthToken from "../../utils/set-auth-token";
import { AUTH_ACTION_TYPES } from "../_reducers/auth.reducer";
import { apiUrl } from "../_store/share-config";

/**
 * Using when call the api (create, update, delete) manually
 * @param dispatch
 * @param isLoading
 */
const authLoading = (dispatch: Dispatch<any>, isLoading: boolean) => {
  dispatch({
    type: AUTH_ACTION_TYPES.LOADING,
    payload: isLoading,
  });
};

/**
 * `Authenticate user`
 *
 * Check when render "protected route" or after login/register.
 *
 * Using redux-promise-middleware
 *
 * @param dispatch
 * @returns
 */
export const loadUser = async (dispatch: Dispatch<any>) => {
  if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
    setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
  }

  await dispatch({
    type: AUTH_ACTION_TYPES.LOAD_USER,
    payload: axios.get(`${apiUrl}/auth`),
  });
};

/**
 * `Login action`
 *
 * Call api manually.
 * If success, update state redux and set localStorage.
 *
 * @param dispatch
 * @param userForm Form summit
 * @returns
 */
export const loginUser = async (
  dispatch: Dispatch<any>,
  userForm: {
    username: string;
    password: string;
  }
) => {
  try {
    await authLoading(dispatch, true);
    const response = await axios.post(`${apiUrl}/auth/login`, userForm);
    await authLoading(dispatch, false);

    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    await loadUser(dispatch);
    return response.data;
  } catch (error) {
    await authLoading(dispatch, false);
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message };
  }
};

/**
 * `Register action`
 *
 * Call api manually.
 * If success, update state redux and set localStorage.
 *
 * @param dispatch
 * @param userForm Form summit
 * @returns
 */
export const registerUser = async (dispatch: Dispatch<any>, userForm: any) => {
  try {
    await authLoading(dispatch, true);
    const response = await axios.post(`${apiUrl}/auth/register`, userForm);
    await authLoading(dispatch, false);

    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
    await loadUser(dispatch);
    return response.data;
  } catch (error) {
    await authLoading(dispatch, false);
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message };
  }
};

/**
 * `Logout action`
 *
 * Update state redux and remove localStorage.
 *
 * @param dispatch
 */
export const logoutUser = (dispatch: Dispatch<any>) => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  dispatch({
    type: AUTH_ACTION_TYPES.LOGOUT,
    payload: { isAuthenticated: false, user: null },
  });
};
