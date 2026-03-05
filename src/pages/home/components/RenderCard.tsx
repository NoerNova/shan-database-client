import { useContext, Suspense, useState, useEffect } from 'react';

import { indexPropsType } from '@components/SearchBox/searchIndexType';
import { getImageThumbnail } from 'helpers/ImageThumbnail';
import { getFileTypeIcon, isImageType } from 'helpers/getFileTypeIcon';
import { userTypes } from 'types/userTypes';
import { dateFormat } from "utils/date";
import { Dots, DotsVertical } from 'tabler-icons-react';

import { MenuContext } from "../context/menuReducer";
import RenderMenu from "./RenderMenu";

import { ModalPreviewContext } from '../context/modalReducer';

import { useMantineColorScheme, Badge } from "@mantine/core";

import { handleDownload } from "@helpers/handleMenuFunction"

interface CardTypes {
  item: indexPropsType,
  user: userTypes,
}

const getBadgeColor = (type: string) => {
  const t = type.toLowerCase();
  if (t === "pdf") return "red";
  if (isImageType(t)) return "green";
  if (["doc", "docx", "wps", "odt", "txt"].includes(t)) return "blue";
  if (["xls", "xlsx"].includes(t)) return "teal";
  if (["ppt", "pptx", "pmd"].includes(t)) return "orange";
  if (["mp3", "wav", "m4a", "m4b", "amr", "aac"].includes(t)) return "violet";
  if (["mp4", "mov", "wmv", "vob", "bup", "ifo", "flv", "3gp"].includes(t)) return "cyan";
  if (["zip", "rar", "part"].includes(t)) return "yellow";
  return "gray";
};

const renderHighlightedName = (item: indexPropsType) => {
  const formatted = item._formatted?.name;
  if (!formatted) return <span>{item.name}</span>;

  const parts = formatted.split(/(<mark>.*?<\/mark>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<mark>(.*)<\/mark>$/);
        if (match) {
          return <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">{match[1]}</mark>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const RenderCard = ({ item, user }: CardTypes) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { menuState, menuDispatch } = useContext(MenuContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const { modalDispatch } = useContext(ModalPreviewContext);

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

  const isImage = isImageType(item.type);
  const thumbnail = isImage
    ? getImageThumbnail(item.type, item.path, user.sid)
    : getFileTypeIcon(item.type);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <li className={`relative rounded-xl p-5 sm:pt-5 sm:p-0 border-b hover:cursor-pointer hover:bg-gray-200 ${dark && 'hover:bg-gray-800'}`}>
        <div className="grid grid-cols-7 gap-4 rounded-l ">
          <div className="col-span-6 grid grid-cols-6 sm:grid-cols-1" onClick={() => handleItemSelected()}>
            <div className={`w-40 h-40 col-span-2 flex justify-center items-center rounded-xl sm:w-full ${!isImage && (dark ? 'bg-gray-700' : 'bg-gray-100')}`}>
              {isImage
                ? <img
                    alt="thumb_nail"
                    src={thumbnail}
                    loading='lazy'
                    className="object-cover h-full w-full rounded-xl"
                  />
                : <img
                    alt="file_type_icon"
                    src={thumbnail}
                    loading='lazy'
                    className="w-16 h-16 object-contain"
                  />
              }
            </div>
            <div className="col-span-4 flex flex-col justify-center overflow-hidden whitespace-no-wrap">
              <div className="font-medium truncate max-w-sm">{renderHighlightedName(item)}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge color={getBadgeColor(item.type)} size="sm" radius="sm">{item.type.toUpperCase()}</Badge>
              </div>
              <div className="flex mt-1">
                <p className="font-medium mr-2">Created: </p>
                <p className="truncate">{dateFormat(item.create_time.$date)}</p>
              </div>
              <div className="flex">
                <p className="font-medium mr-2">Modified: </p>
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
