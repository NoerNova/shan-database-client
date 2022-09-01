import { createContext } from "react";

import { indexPropsType } from "../../../components/SearchBox/searchIndex";
import { userTypes } from "types/userTypes";

export interface PreviewTypes {
  opened: boolean;
  item: indexPropsType;
  user: userTypes;
}

interface actionTypes {
  type: string;
  payload: PreviewTypes;
}

export const initialPreviewState: PreviewTypes = {
  opened: false,
  item: {
    id: 0,
    name: "",
    path: "",
    type: "",
    create_time: {
      $date: "",
    },
    modifiled_time: {
      $date: "",
    },
  },
  user: {
    username: "",
    sid: "",
    admingroup: 0,
  },
};

export const ModalPreviewReducer = (
  state: PreviewTypes,
  action: actionTypes
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        item: action.payload.item,
        user: action.payload.user,
        opened: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        opened: false,
      };
    default:
      return state;
  }
};

export const ModalPreviewContext = createContext<{
  modalState: PreviewTypes;
  modalDispatch: React.Dispatch<any>;
}>({ modalState: initialPreviewState, modalDispatch: () => null });
