import { useState, useEffect } from "react";

import "./searchBox.style.scss";
import { Chip } from "@mantine/core";
import { useStyles } from "./searchBox.style";

import { indexPropsType, searchIndex } from "./searchIndex";
import { useRecoilState } from "recoil";
import {
  searchResultState,
  searchSelector,
  searchLoading,
  noSearchResult,
} from "recoil-state/state";
import { suffix } from "./suffix";

export default function SearchBox() {
  const { classes } = useStyles();
  const [selector, setSelector] = useRecoilState(searchSelector);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<indexPropsType[]>([]);
  const [filteredResult, setFilteredResult] = useRecoilState(searchResultState);
  const [noresult, setNoResult] = useRecoilState(noSearchResult);

  const [loading, setLoading] = useRecoilState(searchLoading);

  const changeSelector = (value: string[]) => {
    if (value.length >= Object.entries(suffix).length || value.length <= 0) {
      setSelector(["All"]);
    } else {
      if (value.length >= 2) {
        let valueIncludeAll = value.includes("All");
        let selectorIncludeAll = selector.includes("All");

        if (valueIncludeAll && selectorIncludeAll) {
          let result = value.filter((s) => s !== "All");
          setSelector(result);
        } else if (valueIncludeAll) {
          setSelector(["All"]);
        } else {
          setSelector(value);
        }
      } else {
        setSelector(value);
      }
    }
  };

  useEffect(() => {
    if (searchTerm.length <= 0) {
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      triggerSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value;
    setLoading(true);
    setNoResult(false);
    setFilteredResult([]);
    setSearchTerm(value);
  };

  const handleSearchButton = () => {
    setLoading(true);
    setFilteredResult([]);
    setNoResult(false);
    triggerSearch();
  };

  const filteredSearch = (dataList: indexPropsType[]) => {

    if (selector.includes("All")) {
      setFilteredResult(dataList.slice(0, 500));
    } else {
      const suffixFilter: string[] = selector.map((s) => suffix[s]).flat();
      const searchFiltered = dataList.filter((d) =>
        suffixFilter.includes(d.type)
      );

      setFilteredResult(searchFiltered.slice(0, 500));
    }

    setLoading(false);
  }

  useEffect(() => {
    filteredSearch(searchResult);
  }, [selector, searchResult])


  const triggerSearch = async () => {
    if (!searchTerm) {
      setFilteredResult([]);
      setLoading(false);
      return;
    }

    let search = await searchIndex(searchTerm);

    if (search.length == 0) {
      setNoResult(true);
      setLoading(false);
      return null;
    }

    setSearchResult(search)
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
            onClick={() => handleSearchButton()}
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
          {
            Object.keys(suffix).map((item, index) => (
              <Chip key={index} classNames={classes} value={item}>
                {item}
              </Chip>
            ))
          }
          <Chip classNames={classes} value="All">
            All
          </Chip>
        </Chip.Group>
      </div>
    </div>
  );
}
