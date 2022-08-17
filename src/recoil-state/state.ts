import { atom } from "recoil";
import { indexPropsType } from "components/search-box/searchIndex";

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

const isAdmin = atom({
  key: "isAdmin",
  default: false
})

export { searchResultState, searchSelector, searchLoading, noSearchResult, isAdmin };
