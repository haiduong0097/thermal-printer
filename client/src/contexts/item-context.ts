import { createContext, useContext } from "react";
import { StoreDataType } from "../utils/type";

export type ItemGlobalContent = {
  storeId: string;
  showAddItemModal: boolean;
  setShowAddItemModal: (showAddStoreModal: boolean) => void;
  targetUpdateStoreModal: StoreDataType | null;
  setTargetUpdateStoreModal: (storeTarget: StoreDataType | null) => void;
  setShowToast: (showToast: {
    show: boolean;
    message: string;
    type: string | null;
  }) => void;
};
export const ItemGlobalContext = createContext<ItemGlobalContent>(
  {} as ItemGlobalContent
);
export const useItemGlobalContext = () => useContext(ItemGlobalContext);
