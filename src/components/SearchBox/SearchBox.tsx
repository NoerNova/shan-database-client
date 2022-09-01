import { useState, useEffect, useMemo } from "react";
import "./searchBox.style.scss";
import { Text } from "@mantine/core";
import {
  searchIndex,
  contactsIndex,
  staffIndex
} from "./searchIndex";

import { indexPropsType, contactPropsType, staffPropsType } from '@components/SearchBox/searchIndexType';

import { useRecoilState } from "recoil";
import {
  searchResultState,
  searchSelector,
  searchLoading,
  noSearchResult,
} from "recoil-state/state";
import { suffix } from "./suffix";

import { Search } from 'tabler-icons-react';
import SuffixChip from "./SuffixChip";

import { searchTypes } from "types/searchTypes";

export default function SearchBox({ searchSession }: searchTypes) {

  const [selector, setSelector] = useRecoilState(searchSelector);

  const [searchTerm, setSearchTerm] = useState("");
  const [databaseSearchResult, setDatabaseSearchResult] = useState<indexPropsType[]>([]);
  const [contactSearchResult, setContactSearchResult] = useState<contactPropsType[]>([]);
  const [staffSearchResult, setStaffSearchResult] = useState<staffPropsType[]>([]);

  const [filteredResult, setFilteredResult] = useRecoilState(searchResultState);
  const [noresult, setNoResult] = useRecoilState(noSearchResult);

  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useRecoilState(searchLoading);

  useMemo(() => {
    //clear store search result on navigate
    setFilteredResult([])
  }, [])

  useEffect(() => {
    if (searchTerm.length <= 0) {
      if (searchSession === 'contacts') {
        contactSearch()
        return;
      } else if (searchSession === 'staffs') {
        staffSearch()
        return;
      }
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      triggerSearch();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    switch (searchSession) {
      case "databases":
        setHeading("Database Search")
        break;
      case "contacts":
        setHeading("Contact Search")
        break;
      case "staffs":
        setHeading("Staff Search")
      default:
        return
    }
  }, [searchSession])

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

  const filteredDatabaseSearch = (dataList: indexPropsType[]) => {

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
    switch (searchSession) {
      case "databases":
        return filteredDatabaseSearch(databaseSearchResult);
      case "contacts":
        return setFilteredResult(contactSearchResult);
      case "staffs":
        return setFilteredResult(staffSearchResult);
      default:
        return;
    }
  }, [selector, databaseSearchResult, contactSearchResult, staffSearchResult]);


  const databaseSearch = async () => {
    let search = await searchIndex(searchTerm);

    if (search.length == 0) {
      setNoResult(true);
      setLoading(false);
      return null;
    }

    setDatabaseSearchResult(search)
  }

  const contactSearch = async () => {
    let search = await contactsIndex(searchTerm);

    if (search.length == 0) {
      setNoResult(true);
      setLoading(false);
      return null;
    }

    setContactSearchResult(search)
    setLoading(false);
  }

  const staffSearch = async () => {
    let search = await staffIndex(searchTerm);
    console.log(search)

    if (search.length == 0) {
      setNoResult(true);
      setLoading(false);
      return null;
    }

    setStaffSearchResult(search)
    setLoading(false);
  }

  const triggerSearch = async () => {
    if (!searchTerm) {
      setFilteredResult([]);
      setLoading(false);
      return;
    }

    switch (searchSession) {
      case "databases":
        return databaseSearch()
      case "contacts":
        return contactSearch()
      case "staffs":
        return staffSearch()
      default:
        return
    }
  };

  return (
    <div className="search-area-container bg-gray-700">
      <div>
        <Text
          size="xl"
          component="span"
          align="center"
          className="text-white text-2xl"
        >
          {heading}
        </Text>
      </div>
      <div className="search-box">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
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
            className="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      {searchSession === "databases" && <SuffixChip />}
    </div>
  );
}
