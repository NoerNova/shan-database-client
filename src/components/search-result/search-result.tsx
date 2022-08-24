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

import { DotsVertical, Trash, Edit, Download, Photo } from 'tabler-icons-react'

import getImageThumbnail from 'helpers/ImageThumbnail'

import { Menu, Transition } from '@headlessui/react'
import { Button } from '@mantine/core';
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

  const handleItemSelected = (path: string) => {
    console.log(path)
  }

  return (
    <div className="body-container">
      {loading && <Loader color="gray" />}
      {!loading && resultList.length <= 0 && noresult && <p>No Result</p>}
      {currentList.length > 0 &&
        <div className="items-container">
          <div className="resultLength">
            <p className="font-bold">search result: {resultList.length}</p>
          </div>
          <ul className="ul-container">
            {currentList.map(
              ({ id, name, type, path, create_time, modifiled_time }) => (
                <div key={id} className="hover:cursor-pointer">
                  <Suspense fallback={<div>Loading...</div>}>
                    <li className="li-container" onClick={() => handleItemSelected(path)}>
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
                        <div className={`${admin_access ? 'visible' : 'invisible'}`}>
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
                              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                  <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                      <Button
                                        className={classNames(
                                          active ? "bg-gray-100 text-white" : "text-gray-900",
                                          "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                        )}
                                      >
                                        <Photo className="mx-2" />
                                        View
                                      </Button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                      <Button
                                        className={classNames(
                                          active ? "bg-gray-100 text-white" : "text-gray-900",
                                          "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                        )}
                                      >
                                        <Download className="mx-2" />
                                        Download
                                      </Button>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="px-1 py-1">
                                  <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                      <Button
                                        className={classNames(
                                          active ? "bg-gray-100 text-white" : "text-gray-900",
                                          "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                        )}
                                      >
                                        <Edit className="mx-2" />
                                        Edit
                                      </Button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }: { active: boolean }) => (
                                      <Button
                                        className={classNames(
                                          active ? "bg-gray-100 text-white" : "text-gray-900",
                                          "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                        )}
                                      >
                                        <Trash className="mx-2" />
                                        Delete
                                      </Button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </li>
                  </Suspense>
                </div>
              )
            )}
          </ul>
          <div className="flex m-10 justify-center items-center">
            <Pagination total={totalPage} page={currentPage} boundaries={3} siblings={2} onChange={setCurrentPage} />
          </div>
        </div>
      }
    </div>
  );
};

export default DisplaySearchResult;
