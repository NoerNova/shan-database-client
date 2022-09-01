import Fuse from "fuse.js";
import _ from "lodash";
import indexDB from "@data/filelist_db.json";
import contactDB from "@data/contect_llist_db.json";

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
  const db: indexPropsType[] = JSON.parse(JSON.stringify(indexDB));
  const searcher = new Fuse<indexPropsType>(db, {
    keys: [
      "path",
      {
        name: "name",
        weight: 2,
      },
    ],
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true,
  });

  const result = searcher.search(searchValue);
  const filtered = result.map((r) => r.item);
  return filtered;
};

export interface contactPropsType {
  id: number;
  name: string;
  org: string;
  email: string;
  phone: Phone;
  website: string;
  address: string;
}

export interface Phone {
  th: string;
  mm: string;
  xx: string;
}
export const contactsIndex = async (
  searchValue: string
): Promise<contactPropsType[]> => {
  const db: contactPropsType[] = JSON.parse(JSON.stringify(contactDB));
  const searcher = new Fuse<contactPropsType>(db, {
    keys: ["name", "org", "email", "phone", "website", "address"],
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true,
  });

  const result = searcher.search(searchValue);
  const filtered = result.map((r) => r.item);
  return filtered;
};
