import React, { useEffect, createRef, useReducer } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  searchResultState,
  searchLoading,
  noSearchResult,
  userState,
  searchPage,
  searchTotalCount,
} from "recoil-state/state";

import { Loader, Pagination } from "@mantine/core";
import { indexPropsType } from '@components/SearchBox/searchIndexType';

import { userTypes } from 'types/userTypes';

import RenderCard from "./RenderCard";
import useOutsideClick from "@components/DisplaySearchResult/useOutsideClick";

import { MenuReducer, MenuContext, initialMenuState } from '../context/menuReducer';
import { ModalPreviewReducer, ModalPreviewContext, initialPreviewState } from '../context/modalReducer';

import RenderPreview from "./RenderPreview";

const listItemsPerPage = 10;

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);
  const loading = useRecoilValue(searchLoading);
  const noresult = useRecoilValue(noSearchResult);
  const user = useRecoilValue<userTypes>(userState);

  const totalCount = useRecoilValue(searchTotalCount);
  const totalPage = Math.ceil(totalCount / listItemsPerPage);
  const [currentPage, setCurrentPage] = useRecoilState(searchPage);
  const currentList = resultList as indexPropsType[];

  const [menuState, menuDispatch] = useReducer(MenuReducer, initialMenuState);
  const [modalState, modalDispatch] = useReducer(ModalPreviewReducer, initialPreviewState);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [resultList]);

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
                <p className="font-bold">search result: {totalCount}</p>
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
