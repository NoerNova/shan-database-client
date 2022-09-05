import { useContext, Suspense, useState, useEffect } from 'react';

import { indexPropsType } from '@components/SearchBox/searchIndexType';
import { getImageThumbnail } from 'helpers/ImageThumbnail';
import { userTypes } from 'types/userTypes';
import { dateFormat } from "utils/date";
import { Dots, DotsVertical } from 'tabler-icons-react';

import { MenuContext } from "../context/menuReducer";
import RenderMenu from "./RenderMenu";

import { ModalPreviewContext } from '../context/modalReducer';

import { useMantineColorScheme } from "@mantine/core";

import { handleDownload } from "@helpers/handleMenuFunction"

interface CardTypes {
  item: indexPropsType,
  user: userTypes,
}

const RenderCard = ({ item, user }: CardTypes) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { menuState, menuDispatch } = useContext(MenuContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const { modalDispatch } = useContext(ModalPreviewContext);

  const defaultImageLogo =
    "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";

  const toggleMenu = (id: number) => {
    menuDispatch({ type: "TOGGLE_MENU", payload: { menuOpenID: id } })
  }

  const handleItemSelected = () => {
    modalDispatch({ type: "OPEN_MODAL", payload: { item: item, user: user } });
  }

  const handleMenuSelected = (menuItem: string) => {
    menuDispatch({ type: "HANDLE_MENU_ITEM", payload: { selectedMenu: menuItem } })

    switch (menuItem) {
      case "View":
        handleItemSelected();
        break;
      case "Download":
        handleDownload({ sid: user.sid, path: item.path });
        break;
      default:
        return
    }
  }

  useEffect(() => {
    if (item.id === menuState.menuOpenID && menuState.isMenuOpened) {
      setMenuOpened(true)
      return
    }

    setMenuOpened(false)
  }, [item.id, menuState.isMenuOpened, menuState.menuOpenID, menuOpened])

  useEffect(() => {
    let start = window.scrollY

    const handler = () => {
      if (Math.abs(window.scrollY - start) >= 300) {
        toggleMenu(-1)
      }
    }
    document.addEventListener('scroll', handler)

    return () => {
      document.removeEventListener('scroll', handler)
    }
  }, [toggleMenu])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <li className={`relative rounded-xl p-5 sm:pt-5 sm:p-0 border-b hover:cursor-pointer hover:bg-gray-200 ${dark && 'hover:bg-gray-800'}`}>
        <div className="grid grid-cols-7 gap-4 rounded-l ">
          <div className="col-span-6 grid grid-cols-6 sm:grid-cols-1" onClick={() => handleItemSelected()}>
            <div className="w-40 h-40 col-span-2 justify-center items-center rounded-xl sm:flex sm:items-center sm:w-full">
              <img
                alt="thumb_nail"
                src={getImageThumbnail(item.type, item.path, user.sid)}
                onError={(e) => (e.currentTarget.src = defaultImageLogo)}
                loading='lazy'
                className="object-cover h-full rounded-xl" />
            </div>
            <div className="col-span-4 flex flex-col justify-center overflow-hidden whitespace-no-wrap">
              <div className="font-medium truncate max-w-sm">{item.name}</div>
              <div className="flex">
                <p className="font-medium mr-2">type: </p>
                <p>{item.type}</p>
              </div>
              <div className="flex">
                <p className="font-medium mr-2">create date: </p>
                <p className="truncate">{dateFormat(item.create_time.$date)}</p>
              </div>
              <div className="flex">
                <p className="font-medium mr-2">modifiled date: </p>
                <p className="truncate">{dateFormat(item.modifiled_time.$date)}</p>
              </div>
            </div>
          </div>
          <div className={`col-span-1 flex justify-end sm:hidden ${user.admingroup ? 'visible' : 'invisible'}`}>
            {menuOpened
              ? <Dots
                size={26}
                strokeWidth={2}
                onClick={() => toggleMenu(item.id)}
                className={`hover:bg-gray-400 ${dark && 'hover:bg-gray-900'} rounded-full px-1 py-1`}
              />
              : <DotsVertical
                size={26}
                strokeWidth={2}
                onClick={() => toggleMenu(item.id)}
                className={`hover:bg-gray-400 ${dark && 'hover:bg-gray-900'} rounded-full px-1 py-1`}
              />}
          </div>
        </div>
        <RenderMenu menuOpened={menuOpened} item={item} handleMenuSelected={handleMenuSelected} />
      </li>
    </Suspense>
  )
}

export default RenderCard;
