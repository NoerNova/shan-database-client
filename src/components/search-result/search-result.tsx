import { Fragment, useState, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  searchResultState,
  searchLoading,
  noSearchResult,
  userState
} from "recoil-state/state";

import { Loader, Pagination } from "@mantine/core";
import { indexPropsType } from "../search-box/searchIndex";
import { dateFormat } from "utils/date";
import { Suspense } from "react";
import "./search-result.scss"

import { DotsVertical } from 'tabler-icons-react'

import getImageThumbnail from 'helpers/ImageThumbnail'

import { Menu, Transition } from '@headlessui/react'
import { userTypes } from 'types/userTypes';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);
  const loading = useRecoilValue(searchLoading);
  const noresult = useRecoilValue(noSearchResult);
  const user = useRecoilValue<userTypes>(userState);
  const admin_access = user.admingroup;

  const listItemsPerPage = 10;
  const totalPage = Math.ceil(resultList.length / listItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState<indexPropsType[]>(resultList.slice(0, 10));

  const defaultImageLogo =
    "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";

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


  return (
    <div className="body-container">
      {loading && <Loader color="gray" />}
      {!loading && resultList.length <= 0 && noresult && <p>No Result</p>}
      {currentList.length > 0 &&
        <div>
          <div className="items-container">
            <div className="resultLength">
              <p className="font-bold">search result: {resultList.length}</p>
            </div>
            <ul className="ul-container">
              {currentList.map(
                ({ id, name, type, path, create_time, modifiled_time }) => (
                  <a key={id} href={getImageThumbnail(type, path, user.sid)} target="blank" className="text-inherit hover:text-inherit">
                    <Suspense fallback={<div>Loading...</div>}>
                      <li className="li-container">
                        <div className="list-content-container">
                          <div className="image-container">
                            <img
                              alt="thumb_nail"
                              src={getImageThumbnail(type, path, user.sid)}
                              onError={(e) => (e.currentTarget.src = defaultImageLogo)}
                              loading='lazy'
                              className="w-40 h-40 object-scale-down flex justify-center items-center" />
                          </div>
                          <div className="content-container">
                            <div className="font-medium truncate">{name}</div>
                            <div className="flex">
                              <p className="font-medium mr-2">type: </p>
                              <p>{type}</p>
                            </div>
                            <div className="flex">
                              <p className="font-medium mr-2">create date: </p>
                              <p className="truncate">{dateFormat(create_time.$date)}</p>
                            </div>
                            <div className="flex">
                              <p className="font-medium mr-2">modifiled date: </p>
                              <p className="truncate">{dateFormat(modifiled_time.$date)}</p>
                            </div>
                          </div>
                          <div className="dots-verticle-container">
                            <Menu as="div" className="relative">
                              <div className={admin_access ? 'visible' : 'invisible'}>
                                <Menu.Button className="dots-verticle">
                                  <span className="sr-only">Open edit menu</span>
                                  <DotsVertical
                                    size={26}
                                    strokeWidth={2}
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        Edit
                                      </a>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      </li>
                    </Suspense>
                  </a>
                )
              )}
            </ul>
          </div>
          <div className="flex m-10 justify-center items-center">
            <Pagination total={totalPage} page={currentPage} boundaries={3} onChange={setCurrentPage} />
          </div>
        </div>
      }
    </div>
  );
};

export default DisplaySearchResult;
