import Fuse from "fuse.js";
import _ from "lodash";
import indexDB from "@data/filelist_db.json" assert { type: 'JSON' };

export interface indexPropsType {
  id: number;
  name: string;
  type: string;
  path: string;
  create_time: {
    $date: string;
  };
  modifiled_time: {
    $date: string;
  };
}

export const searchIndex = async (
  searchValue: string
): Promise<indexPropsType[]> => {
  const searcher = new Fuse(indexDB, {
    keys: ["name", "path"],
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true,
  });

  const result = searcher.search(searchValue);
  const filtered = result.map((r) => r.item);
  return filtered;
};
