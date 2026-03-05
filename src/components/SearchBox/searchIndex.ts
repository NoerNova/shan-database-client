import FlexSearch from "flexsearch";
import Fuse from "fuse.js";
import contactDB from "@data/contect_llist_db.json";
import staffDB from "@data/staff_list_db.json";
import {
  indexPropsType,
  contactPropsType,
  staffPropsType,
} from "./searchIndexType";

// --- File index (FlexSearch, lazy-loaded via fetch) ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileIndex = new FlexSearch.Document<any>({
  id: "id",
  index: [
    { field: "name", tokenize: "forward", resolution: 9 },
    { field: "path", tokenize: "forward", resolution: 4 },
  ],
  store: true,
});

let initPromise: Promise<void> | null = null;
let indexReady = false;

async function initIndex(): Promise<void> {
  if (indexReady) return;
  if (initPromise) return initPromise;
  initPromise = fetch("/data/filelist_db.json")
    .then((r) => r.json())
    .then((data: indexPropsType[]) => {
      data.forEach((r) => fileIndex.add(r));
      indexReady = true;
    });
  return initPromise;
}

export const searchIndex = async (
  searchValue: string
): Promise<indexPropsType[]> => {
  await initIndex();

  const rawResults = fileIndex.search(searchValue, { enrich: true }) as Array<{
    field: string;
    result: Array<{ id: number; doc: indexPropsType }>;
  }>;

  // De-duplicate across name/path field hits
  const seen = new Set<number>();
  const items: indexPropsType[] = [];
  for (const fieldResult of rawResults) {
    for (const hit of fieldResult.result) {
      if (!seen.has(hit.id)) {
        seen.add(hit.id);
        items.push(hit.doc);
      }
    }
  }
  return items;
};

// --- Contact search (Fuse.js, small static DB) ---

export const contactsIndex = async (
  searchValue?: string
): Promise<contactPropsType[]> => {
  const db = contactDB as unknown as contactPropsType[];

  if (!searchValue) return db;

  const searcher = new Fuse<contactPropsType>(db, {
    keys: ["name", "org", "email", "phone", "website", "address"],
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true,
  });

  return searcher.search(searchValue).map((r) => r.item);
};

// --- Staff search (Fuse.js, small static DB) ---

export const staffIndex = async (
  searchValue?: string
): Promise<staffPropsType[]> => {
  const db = staffDB as unknown as staffPropsType[];

  if (!searchValue) return db;

  const searcher = new Fuse<staffPropsType>(db, {
    keys: ["name", "email", "phone", "address", "department", "equipment"],
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true,
  });

  return searcher.search(searchValue).map((r) => r.item);
};
