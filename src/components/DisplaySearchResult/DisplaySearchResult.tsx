import React, { useState, useEffect, useMemo, createRef, useReducer } from "react";
import { useRecoilValue } from "recoil";
import {
  searchResultState,
  searchLoading,
  noSearchResult,
  userState
} from "recoil-state/state";

import { Loader, Pagination } from "@mantine/core";
import { indexPropsType } from "../SearchBox/searchIndex";
import "./DisplaySearchResult.style.scss"

import { userTypes } from 'types/userTypes';

import RenderCard from "./RenderCard";
import useOutsideClick from "./useOutsideClick";

import { MenuReducer, MenuContext, initialMenuState } from './menuReducer';

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);
  const loading = useRecoilValue(searchLoading);
  const noresult = useRecoilValue(noSearchResult);
  const user = useRecoilValue<userTypes>(userState);

  const [state, dispatch] = useReducer(MenuReducer, initialMenuState)

  const listItemsPerPage = 10;
  const totalPage = Math.ceil(resultList.length / listItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState<indexPropsType[]>(resultList.slice(0, 10));

  useMemo(() => {
    setCurrentPage(1)
  }, [resultList])

  useEffect(() => {
    let lastItemIndex = currentPage * listItemsPerPage;
    let firstItemIndex = lastItemIndex - listItemsPerPage;
    const newPageList = resultList.slice(firstItemIndex, lastItemIndex)
    setCurrentList(newPageList);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage, resultList])

  const handleItemSelected = (path: string) => {
    if (!state.isMenuOpened) {
      console.log(path)
    }
  }

  const handleOutsideClick = () => {
    dispatch({ type: "CLICK_OUTSIDE", payload: { menuOpenID: 0, isMenuOpened: false } })
  }

  const ref = createRef<HTMLDivElement>();
  const wrapperRef = useOutsideClick(ref, handleOutsideClick)

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      <div
        className="body-container">
        {loading && <Loader color="gray" />}
        {!loading && resultList.length <= 0 && noresult && <p>No Result</p>}
        {currentList.length > 0 &&
          <div
            ref={wrapperRef}
            className="items-container"
          >
            <div className="resultLength">
              <p className="font-bold">search result: {resultList.length}</p>
            </div>
            <ul className="ul-container">
              {currentList.map(
                (item, index) => (
                  <RenderCard
                    key={index}
                    item={item}
                    user={user}
                    handleItemSelected={handleItemSelected}
                  />
                )
              )}
            </ul>
            <div className="flex m-10 justify-center items-center">
              <Pagination total={totalPage} page={currentPage} boundaries={3} siblings={2} onChange={setCurrentPage} />
            </div>
          </div>
        }
      </div>
    </MenuContext.Provider>
  );
};

export default DisplaySearchResult;
