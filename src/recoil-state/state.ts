import { atom } from "recoil";
import { indexPropsType } from "@components/SearchBox/searchIndex";
import { userTypes } from "types/userTypes";

const searchResultState = atom<indexPropsType | any>({
  key: "searchResultState",
  default: [],
});

const searchSelector = atom({
  key: "searchSelector",
  default: ["All"],
});

const searchLoading = atom({
  key: "searchLoading",
  default: false,
});

const noSearchResult = atom({
  key: "noSearchResult",
  default: false,
});

const userState = atom<userTypes | any>({
  key: "users",
  default: null,
});

export {
  searchResultState,
  searchSelector,
  searchLoading,
  noSearchResult,
  userState,
};
