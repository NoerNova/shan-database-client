import { useRef, useState, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  searchResultState,
  searchLoading,
  noSearchResult,
} from "recoil-state/state";
import { useMantineColorScheme, Loader, Pagination } from "@mantine/core";
import { indexPropsType } from "../search-box/searchIndex";
import { dateFormat } from "utils/date";
import { Suspense } from "react";

import { suffix } from "../search-box/suffix";

import ViewportList from "react-viewport-list";
import { forEach, indexOf } from "lodash";

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);
  const loading = useRecoilValue(searchLoading);
  const noresult = useRecoilValue(noSearchResult);

  const viewportRef = useRef(null);
  const listItemsPerPage = 10;
  const totalPage = Math.ceil(resultList.length / listItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState<indexPropsType[]>(resultList.slice(0, 10));


  useEffect(() => {
    let lastItemIndex = currentPage * listItemsPerPage;
    let firstItemIndex = lastItemIndex - listItemsPerPage;
    const newPageList = resultList.slice(firstItemIndex, lastItemIndex)
    setCurrentList(newPageList);
  },[currentPage, resultList])


  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const defaultImageLogo =
    "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";


  const getThumbnailFromType = (type: string) => {
    let typeInclude = "";
    let icon = "src/assets/filetypes-pack"

    forEach(suffix, (s) => {
      if (s.includes(type)) {
        typeInclude = Object.keys(suffix)[Object.values(suffix).indexOf(s)];
      }
    })

    switch (typeInclude) {
      case "Compress":
        return `${icon}/zip.png`
      case "Audios":
        return `${icon}/music.png`
      case "Documents":
        return `${icon}/text.png`
      case "Fonts":
        return `${icon}/font-file.png`
      case "Images":
        return `${icon}/image.png`
      case "Videos":
        return `${icon}/video.png`
      default:
        return defaultImageLogo
    }
  }

  const getDefaultThumbnail = (type: string) => {
    let icon = "src/assets/filetypes-pack"

    switch (type) {
      case "doc":
      case "docx":
        return `${icon}/doc.png`
      case "txt":
        return `${icon}/txt.png`
      case "xls":
      case "xlsx":
        return `${icon}/xls.png`
      case "psd":
        return `${icon}/psd.png`
      case "ai":
        return `${icon}/adobe-illustrator.png`
      case "pdf":
        return `${icon}/pdf.png`
      case "ppt":
        return `${icon}/ppt.png`
      case "svg":
        return `${icon}/svg.png`
      default:
        return getThumbnailFromType(type);
    } 
  }

  const getThumbnailFromPath = (path: string) => {
    const sid = import.meta.env.VITE_TEST_SID;
    const thumbURL = import.meta.env.VITE_IMAGE_THUMBNAIL_URL;

    const image_path = path.match("^(.*(?=[\\/]))");
    const image_name_path = path.match("([^/]+[^\n.]+)$");
    const image_thumbnail_url = `${thumbURL}&sid=${sid}&path=${
      image_path![1]
    }&name=${image_name_path![1]}`;
    
    return image_thumbnail_url;
  }

  const getImageThumbnail = (type: string, path: string) => {
    switch (type.toLowerCase()) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return getThumbnailFromPath(path)
      default:
        return getDefaultThumbnail(type)
    }
  };

  return (
    <div ref={viewportRef} className="flex flex-col mt-10 items-center justify-center">
      {loading && <Loader color="gray" />}
      {!loading && resultList.length <= 0 && noresult && <p>No Result</p>}
      <div
        className={`flex flex-col container max-w-2xl mx-auto w-full items-center justify-center rounded-lg shadow ${
          dark && "bg-gray-800"
        }`}
      >
        {currentList.length > 0 &&
          <div>
            <div className="w-full">
          <p className="font-bold">search result: {resultList.length}</p>
        </div>
        <ul className="flex flex-col divide-y w-full">
          <ViewportList viewportRef={viewportRef} items={currentList} itemMinSize={10} margin={8}>
              {(currentList) => (
                <Suspense key={currentList.id}  fallback={<div>Loading...</div>}>
                  <div className="flex flex-row">
                  <div
                    className={`select-none cursor-pointer rounded-lg flex flex-1 items-center p-2 ${
                      dark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-col w-50 h-50 justify-center items-center mr-10">
                      <a href="#" className="block relative">
                        <object data={getImageThumbnail(currentList.type, currentList.path)} type="image/jpg" className="w-40 h-40 object-scale-down flex justify-center items-center">
                          <img alt="thumb_nail" src={defaultImageLogo} loading='lazy'/>
                        </object>
                      </a>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="font-medium">{currentList.name}</div>
                      <div className="flex">
                        <p className="font-medium mr-2">type: </p>
                        <p>{currentList.type}</p>
                      </div>
                      <div className="flex">
                        <p className="font-medium mr-2">create date: </p>
                        <p>{dateFormat(currentList.create_time.$date)}</p>
                      </div>
                      <div className="flex">
                        <p className="font-medium mr-2">modifiled date: </p>
                        <p>{dateFormat(currentList.modifiled_time.$date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                </Suspense>
              )}
            </ViewportList>
        </ul>
      <div className="m-10">
      <Pagination total={totalPage} page={currentPage} boundaries={3} onChange={setCurrentPage} />
      </div>
          </div>
        }
      </div>
    </div>
  );
};

export default DisplaySearchResult;
