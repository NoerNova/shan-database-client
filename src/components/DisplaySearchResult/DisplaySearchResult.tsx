import { Fragment, useState, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  searchResultState,
  searchLoading,
  noSearchResult,
  userState
} from "recoil-state/state";

import { Loader, Pagination } from "@mantine/core";
import { indexPropsType } from "../SearchBox/searchIndex";
import { dateFormat } from "utils/date";
import { Suspense } from "react";
import "./DisplaySearchResult.style.scss"

import { DotsVertical, Trash, Edit, Download, Photo } from 'tabler-icons-react'

import getImageThumbnail from 'helpers/ImageThumbnail'

import { Menu } from '@mantine/core';
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
                          <Menu shadow="md" width={200}>
                            <Menu.Target>
                              <DotsVertical
                                size={26}
                                strokeWidth={2} />
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Label>Application</Menu.Label>
                              <Menu.Item icon={<Photo size={14} />}>View</Menu.Item>
                              <Menu.Item icon={<Download size={14} />}>Download</Menu.Item>

                              <Menu.Divider />

                              <Menu.Label>Danger zone</Menu.Label>
                              <Menu.Item icon={<Edit size={14} />}>Edit</Menu.Item>
                              <Menu.Item color="red" icon={<Trash size={14} />}>Delete</Menu.Item>
                            </Menu.Dropdown>
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
