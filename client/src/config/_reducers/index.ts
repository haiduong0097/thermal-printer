import { combineReducers } from "redux";
import demoReducer, { DemoState } from "./demo.reducer";
import authReducer, { AuthState } from "./auth.reducer";
import storeReducer, { StoreState } from "./store.reducer";
import itemReducer, { ItemState } from "./item.reducer";

export interface IRootState {
  readonly demoState: DemoState;
  readonly authState: AuthState;
  readonly storeState: StoreState;
  readonly itemState: ItemState;
}

const rootReducer = combineReducers({
  demoState: demoReducer,
  authState: authReducer,
  storeState: storeReducer,
  itemState: itemReducer,
});

export default rootReducer;
