import { useState, useEffect, useMemo } from "react";
import "./searchBox.style.scss";
import { Text } from "@mantine/core";
import {
  contactsIndex,
  staffIndex
} from "./searchIndex";

import { contactPropsType, staffPropsType } from '@components/SearchBox/searchIndexType';

import { useRecoilState } from "recoil";
import {
  searchResultState,
  searchSelector,
  searchLoading,
  noSearchResult,
  searchPage,
  searchTotalCount,
} from "recoil-state/state";
import { suffix } from "./suffix";

import { Search } from 'tabler-icons-react';
import SuffixChip from "./SuffixChip";

import { searchTypes } from "types/searchTypes";

export default function SearchBox({ searchSession }: searchTypes) {

  const [selector, setSelector] = useRecoilState(searchSelector);

  const [searchTerm, setSearchTerm] = useState("");
  const [contactSearchResult, setContactSearchResult] = useState<contactPropsType[]>([]);
  const [staffSearchResult, setStaffSearchResult] = useState<staffPropsType[]>([]);

  const [filteredResult, setFilteredResult] = useRecoilState(searchResultState);
  const [noresult, setNoResult] = useRecoilState(noSearchResult);

  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useRecoilState(searchLoading);

  const [page, setPage] = useRecoilState(searchPage);
  const [, setTotalCount] = useRecoilState(searchTotalCount);

  useMemo(() => {
    //clear store search result on navigate
    setFilteredResult([]);
    setPage(1);
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
    }, 400);

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
    setTotalCount(0);
    setSearchTerm(value);
  };

  const handleSearchButton = () => {
    setLoading(true);
    setFilteredResult([]);
    setNoResult(false);
    setTotalCount(0);
    triggerSearch();
  };

  const databaseSearch = async (targetPage = 1) => {
    const typeExts = selector.includes("All")
      ? []
      : selector.flatMap((s) => suffix[s] ?? []);
    const params = new URLSearchParams({ q: searchTerm, page: String(targetPage), limit: "10" });
    if (typeExts.length > 0) params.set("types", typeExts.join(","));

    try {
      const res = await fetch(`/api/search?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data: { total: number; results: unknown[] } = await res.json();
      if (data.total === 0) {
        setNoResult(true);
        setLoading(false);
        setFilteredResult([]);
        setTotalCount(0);
        return;
      }
      setTotalCount(data.total);
      setFilteredResult(data.results as any);
      setLoading(false);
    } catch {
      setNoResult(true);
      setLoading(false);
    }
  };

  // Selector chip changed → re-fetch at page 1
  useEffect(() => {
    if (searchSession !== "databases" || !searchTerm) return;
    setPage(1);
    setLoading(true);
    setNoResult(false);
    databaseSearch(1);
  }, [selector]);

  // Page atom changed (user clicked Pagination) → fetch new page
  useEffect(() => {
    if (searchSession !== "databases" || !searchTerm) return;
    setLoading(true);
    databaseSearch(page);
  }, [page]);

  // Contacts/staffs results
  useEffect(() => {
    switch (searchSession) {
      case "contacts":
        return setFilteredResult(contactSearchResult);
      case "staffs":
        return setFilteredResult(staffSearchResult);
      default:
        return;
    }
  }, [contactSearchResult, staffSearchResult]);

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
        setPage(1);
        return databaseSearch(1)
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
