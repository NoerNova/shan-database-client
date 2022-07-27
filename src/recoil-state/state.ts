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

export { searchResultState, searchSelector };
