import { AnyAction } from "redux";
import { REQUEST, SUCCESS, FAILURE } from "../_store/share-config";

export const DEMO_ACTION_TYPES = {
  DEMO_ACTION: "DEMO_ACTION_TYPES/DEMO_ACTION",
};

const initialState = {
  author: "duongdeptrai",
  status: "none",
  data: null as any,
};

export type DemoState = Readonly<typeof initialState>;

// Reducer
const demoReducer = (
  state: DemoState = initialState,
  action: AnyAction
): Partial<DemoState> => {
  switch (action.type) {
    case REQUEST(DEMO_ACTION_TYPES.DEMO_ACTION): {
      return {
        ...state,
        status: "loading",
      };
    }
    case SUCCESS(DEMO_ACTION_TYPES.DEMO_ACTION): {
      return {
        ...state,
        status: "none",
        author: action.payload.author,
        data: action.payload,
      };
    }
    case FAILURE(DEMO_ACTION_TYPES.DEMO_ACTION): {
      return {
        ...state,
        status: "none",
        author: action.payload.author,
        data: action.payload,
      };
    }
    case DEMO_ACTION_TYPES.DEMO_ACTION: {
      return {
        ...state,
        status: "none",
        author: action.payload.author,
        data: "not async function",
      };
    }
    default:
      return state;
  }
};

export default demoReducer;
