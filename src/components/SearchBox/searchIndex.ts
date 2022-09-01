import Fuse from "fuse.js";
import _ from "lodash";
import indexDB from "@data/filelist_db.json";
import contactDB from "@data/contect_llist_db.json";
import staffDB from "@data/staff_list_db.json";
import {
  indexPropsType,
  contactPropsType,
  staffPropsType,
} from "./searchIndexType";

// Database Search
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

/// Contact SEarch
export const contactsIndex = async (
  searchValue?: string
): Promise<contactPropsType[]> => {
  const db: contactPropsType[] = JSON.parse(JSON.stringify(contactDB));

  if (!searchValue) {
    return db;
  }

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

// Staff Search
export const staffIndex = async (
  searchValue?: string
): Promise<staffPropsType[]> => {
  const db: staffPropsType[] = JSON.parse(JSON.stringify(staffDB));

  if (!searchValue) {
    return db;
  }

  const searcher = new Fuse<staffPropsType>(db, {
    keys: ["name", "email", "phone", "address", "department", "equipment"],
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true,
  });

  const result = searcher.search(searchValue);

  const filtered = result.map((r) => r.item);
  return filtered;
};
