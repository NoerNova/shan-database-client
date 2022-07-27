import { useRecoilValue } from "recoil";
import { searchResultState } from "recoil-state/state";
import { useMantineColorScheme } from "@mantine/core";
import { indexPropsType } from "../search-box/searchIndex";
import { dateFormat } from "utils/date";

const DisplaySearchResult: React.FC = () => {
  const resultList = useRecoilValue<indexPropsType[]>(searchResultState);

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div
      className={`flex flex-col container max-w-2xl mt-10 mx-auto w-full items-center justify-center rounded-lg shadow ${
        dark && "bg-gray-800"
      }`}
    >
      <ul className="flex flex-col divide-y">
        {resultList &&
          resultList.map(
            ({ id, name, type, path, create_time, modifiled_time }) => (
              <li key={id} className="flex flex-row">
                <div className="select-none cursor-pointer hover:bg-gray-500 flex flex-1 items-center p-4">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <a href="#" className="block relative">
                      <img
                        alt="profil"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
                        className="mx-auto object-cover rounded-full h-10 w-10"
                      />
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
  );
};

export default DisplaySearchResult;
