import { useRecoilValue } from "recoil";
import {
  searchResultState,
  searchLoading,
  noSearchResult,
} from "recoil-state/state";
import { useMantineColorScheme, Loader } from "@mantine/core";
import { indexPropsType } from "../search-box/searchIndex";
import { dateFormat } from "utils/date";

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);
  const loading = useRecoilValue(searchLoading);
  const noresult = useRecoilValue(noSearchResult);

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const defaultImageLogo =
    "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";

  const getImageThumbnail = (path: string) => {
    const sid = import.meta.env.VITE_TEST_SID;
    const thumbURL = import.meta.env.VITE_IMAGE_THUMBNAIL_URL;

    const image_path = path.match("^(.*(?=[\\/]))");
    const image_name_path = path.match("([^/]+[^\n.]+)$");
    const image_thumbnail_url = `${thumbURL}&sid=${sid}&path=${
      image_path![1]
    }&name=${image_name_path![1]}`;
    console.log(image_thumbnail_url);
    return image_thumbnail_url;
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-center">
      {loading && <Loader color="gray" />}
      {!loading && resultList.length <= 0 && noresult && <p>No Result</p>}
      <div
        className={`flex flex-col container max-w-2xl mx-auto w-full items-center justify-center rounded-lg shadow ${
          dark && "bg-gray-800"
        }`}
      >
        <ul className="flex flex-col divide-y w-full">
          {resultList &&
            resultList.map(
              ({ id, name, type, path, create_time, modifiled_time }) => (
                <li key={id} className="flex flex-row">
                  <div
                    className={`select-none cursor-pointer rounded-lg flex flex-1 items-center p-2 ${
                      dark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-col w-40 h-40 justify-center items-center mr-4">
                      <a href="#" className="block relative">
                        <object data={getImageThumbnail(path)} type="image/png">
                          <img alt="profil" src={defaultImageLogo} />
                        </object>
                      </a>
                    </div>
                    <div className="flex-1 pl-1">
                      <div className="font-medium">{name}</div>
                      <div className="flex">
                        <p className="font-medium mr-2">type: </p>
                        <p>{type}</p>
                      </div>
                      <div className="flex">
                        <p className="font-medium mr-2">create date: </p>
                        <p>{dateFormat(create_time.$date)}</p>
                      </div>
                      <div className="flex">
                        <p className="font-medium mr-2">modifiled date: </p>
                        <p>{dateFormat(modifiled_time.$date)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};

export default DisplaySearchResult;
