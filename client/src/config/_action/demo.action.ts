import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { DEMO_ACTION_TYPES } from "../_reducers/demo.reducer";
import { apiUrl } from "../_store/share-config";

export const demoAction =
  (author: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch({
      type: DEMO_ACTION_TYPES.DEMO_ACTION,
      payload: { author },
    });
  };

export const demoActionWithFetchApi1 =
  () => async (dispatch: Dispatch<AnyAction>) => {
    await dispatch({
      type: DEMO_ACTION_TYPES.DEMO_ACTION,
      payload: axios.get(`${apiUrl}`),
    });
  };

export const demoActionWithFetchApi =
  (author: string) => async (dispatch: Dispatch<AnyAction>) => {
    await dispatch({
      type: DEMO_ACTION_TYPES.DEMO_ACTION,
      payload: async () => ({ author, response: await axios.get(`${apiUrl}`) }),
    });
  };
