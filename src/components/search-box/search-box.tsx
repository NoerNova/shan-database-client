import { useState, useEffect } from "react";

import "./search-box.scss";
import { Chip } from "@mantine/core";
import { useStyles } from "./search-box.styled";

import { searchIndex } from "./searchIndex";
import { useRecoilState } from "recoil";
import { searchResultState } from "recoil-state/state";

export default function SearchBox() {
  const { classes } = useStyles();
  const [selector, setSelector] = useState(["all"]);

  const [searchTerm, setSearchTerm] = useState("");
  const [resultList, setResultList] = useRecoilState(searchResultState);
  const [noresult, setNoResult] = useState(false);

  //TODO: apply selector search

  const changeSelector = (value: string[]) => {
    if (value.length >= 4) {
      setSelector(["all"]);
    } else {
      if (value.length >= 2) {
        let valueIncludeAll = value.includes("all");
        let selectorIncludeAll = selector.includes("all");

        if (valueIncludeAll && selectorIncludeAll) {
          let result = value.filter((s) => s !== "all");
          setSelector(result);
        } else if (valueIncludeAll) {
          setSelector(["all"]);
        } else {
          setSelector(value);
        }
      }
    }
  };

  useEffect(() => {
    if (searchTerm.length <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      triggerSearch();
    }, 1000); //2000 - timeout to execute this function if timeout will be not cleared

    return () => clearTimeout(timeout); //clear timeout (delete function execution)
  }, [searchTerm]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value;
    setNoResult(false);
    setResultList([]);
    setSearchTerm(value);
  };

  const triggerSearch = async () => {
    if (!searchTerm) {
      setResultList([]);
      return;
    }

    const filtered = await searchIndex(searchTerm);

    if (filtered.length == 0) {
      setNoResult(true);
      return;
    }

    const get10FromList = filtered.slice(0, 10);
    setResultList(get10FromList);
  };

  return (
    <div className="search-area-container bg-gray-700">
      <div className="search-box">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            id="default-search"
            type="text"
            onKeyUp={handleSearch}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Data Search..."
            required
          />
          <button
            onClick={() => handleSearch}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div className="chip-selector-container">
        <Chip.Group
          position="center"
          multiple
          defaultValue={["all"]}
          value={selector}
          onChange={changeSelector}
        >
          <Chip classNames={classes} value="images">
            Images
          </Chip>
          <Chip classNames={classes} value="documents">
            Documents
          </Chip>
          <Chip classNames={classes} value="audios">
            Audios
          </Chip>
          <Chip classNames={classes} value="videos">
            Videos
          </Chip>
          <Chip classNames={classes} value="all">
            All
          </Chip>
        </Chip.Group>
      </div>
    </div>
  );
}
