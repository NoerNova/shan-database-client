import { atom } from "recoil";
import {
  indexPropsType,
  contactPropsType,
} from "@components/SearchBox/searchIndexType";
import { userTypes } from "types/userTypes";

const searchResultState = atom<indexPropsType | contactPropsType | any>({
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

const searchPage = atom<number>({
  key: "searchPage",
  default: 1,
});

const searchTotalCount = atom<number>({
  key: "searchTotalCount",
  default: 0,
});

export {
  searchResultState,
  searchSelector,
  searchLoading,
  noSearchResult,
  userState,
  searchPage,
  searchTotalCount,
};
