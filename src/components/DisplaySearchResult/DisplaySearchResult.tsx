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

import { userTypes } from 'types/userTypes';

import RenderCard from "./RenderCard";
import useOutsideClick from "./useOutsideClick";

import { MenuReducer, MenuContext, initialMenuState } from './menuReducer';
import { ModalPreviewReducer, ModalPreviewContext, initialPreviewState } from './modalReducer';

import RenderPreview from "./RenderPreview";

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);
  const loading = useRecoilValue(searchLoading);
  const noresult = useRecoilValue(noSearchResult);
  const user = useRecoilValue<userTypes>(userState);

  const [menuState, menuDispatch] = useReducer(MenuReducer, initialMenuState);
  const [modalState, modalDispatch] = useReducer(ModalPreviewReducer, initialPreviewState);

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

  const handleOutsideClick = () => {
    menuDispatch({ type: "CLICK_OUTSIDE", payload: { menuOpenID: 0, isMenuOpened: false } })
  }

  const ref = createRef<HTMLDivElement>();
  const wrapperRef = useOutsideClick(ref, handleOutsideClick)

  return (
    <MenuContext.Provider value={{ menuState, menuDispatch }}>
      <ModalPreviewContext.Provider value={{ modalState, modalDispatch }}>
        <div
          className="flex m-10 items-center justify-center">
          {loading && <Loader color="gray" />}
          {!loading && resultList.length <= 0 && noresult && <p>No Result</p>}
          {currentList.length > 0 &&
            <div
              ref={wrapperRef}
              className="rounded-lg p-10 shadow-2xl"
            >
              <div className="border-b-2 border-gray-400">
                <p className="font-bold">search result: {resultList.length}</p>
              </div>
              <ul>
                {currentList.map(
                  (item, index) => (
                    <RenderCard
                      key={index}
                      item={item}
                      user={user}
                    />
                  )
                )}
              </ul>
              <div className="flex m-10 justify-center items-center">
                <Pagination total={totalPage} page={currentPage} boundaries={3} siblings={2} onChange={setCurrentPage} />
              </div>
            </div>
          }
          {modalState.opened && <RenderPreview />}
        </div>
      </ModalPreviewContext.Provider>
    </MenuContext.Provider>
  );
};

export default DisplaySearchResult;
