import { createContext, useContext } from "react";
import { StoreDataType } from "../utils/type";

export type StoreGlobalContent = {
  showAddStoreModal: boolean;
  setShowAddStoreModal: (showAddStoreModal: boolean) => void;
  targetUpdateStoreModal: StoreDataType | null;
  setTargetUpdateStoreModal: (storeTarget: StoreDataType | null) => void;
  setShowToast: (showToast: {
    show: boolean;
    message: string;
    type: string | null;
  }) => void;
};
export const StoreGlobalContext = createContext<StoreGlobalContent>(
  {} as StoreGlobalContent
);
export const useStoreGlobalContext = () => useContext(StoreGlobalContext);
