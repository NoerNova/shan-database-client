import { createContext } from "react";

export interface menuTypes {
  menuOpenID?: number;
  isMenuOpened?: boolean;
  selectedMenu?: string;
}

interface actionTypes {
  type: string;
  payload: menuTypes;
}

export const initialMenuState: menuTypes = {
  menuOpenID: 0,
  isMenuOpened: false,
  selectedMenu: "",
};

export const MenuReducer = (state: menuTypes, action: actionTypes) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      if (action.payload.menuOpenID !== state.menuOpenID) {
        return {
          ...state,
          menuOpenID: action.payload.menuOpenID,
          isMenuOpened: true,
        };
      } else {
        return {
          ...state,
          isMenuOpened: !state.isMenuOpened,
        };
      }
    case "HANDLE_MENU_ITEM":
      return {
        ...state,
        isMenuOpened: false,
        selectedMenu: action.payload.selectedMenu,
      };
    case "CLICK_OUTSIDE":
      return {
        ...state,
        menuOpenID: action.payload.menuOpenID,
        isMenuOpened: false,
      };
    default:
      return state;
  }
};

export const MenuContext = createContext<{
  state: menuTypes;
  dispatch: React.Dispatch<any>;
}>({ state: initialMenuState, dispatch: () => null });
