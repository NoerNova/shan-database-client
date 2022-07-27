import { atom } from "recoil";
import { indexPropsType } from "components/search-box/searchIndex";

const searchResultState = atom<indexPropsType | any>({
  key: "searchResultState",
  default: [],
});

export { searchResultState };
