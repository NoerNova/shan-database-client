import { useContext, Suspense, useState, useEffect } from 'react';

import { indexPropsType } from '../SearchBox/searchIndex';
import getImageThumbnail from 'helpers/ImageThumbnail';
import { userTypes } from 'types/userTypes';
import { dateFormat } from "utils/date";
import { Dots, DotsVertical } from 'tabler-icons-react';

import { MenuContext } from "./menuReducer";
import RenderMenu from "./RenderMenu";

interface CardTypes {
    item: indexPropsType,
    user: userTypes,
    handleItemSelected: (path: string) => void,
}

const RenderCard = ({ item, user, handleItemSelected }: CardTypes) => {

    const { state, dispatch } = useContext(MenuContext);
    const [menuOpened, setMenuOpened] = useState(false);

    const defaultImageLogo =
        "https://shannews.org/wp-content/uploads/2021/05/Shan-Logo-used-2018-1_Optimize.png";

    const toggleMenu = (id: number) => {
        dispatch({ type: "TOGGLE_MENU", payload: { menuOpenID: id } })
    }

    const handleMenuSelected = (item: string) => {
        dispatch({ type: "HANDLE_MENU_ITEM", payload: { selectedMenu: item } })
    }

    useEffect(() => {
        if (item.id === state.menuOpenID && state.isMenuOpened) {
            setMenuOpened(true)
            return
        }

        setMenuOpened(false)
    }, [item.id, state.isMenuOpened, state.menuOpenID, menuOpened])

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
            <li className="relative rounded-xl p-5 border-b hover:cursor-pointer hover:bg-gray-200" onClick={() => handleItemSelected(item.path)}>
                <div className="grid grid-cols-7 gap-4 rounded-l">
                    <div className="col-span-2 justify-center items-center">
                        <img
                            alt="thumb_nail"
                            src={getImageThumbnail(item.type, item.path, user.sid)}
                            onError={(e) => (e.currentTarget.src = defaultImageLogo)}
                            loading='lazy'
                            className="w-40 h-40 object-scale-down flex justify-center items-center" />
                    </div>
                    <div className="col-span-4 flex flex-col justify-center overflow-hidden whitespace-no-wrap">
                        <div className="font-medium truncate">{item.name}</div>
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
                    <div className={`col-span-1 flex justify-end ${user.admingroup ? 'visible' : 'invisible'}`}>
                        {menuOpened
                            ? <Dots
                                size={26}
                                strokeWidth={2}
                                onClick={() => toggleMenu(item.id)}
                                className="hover:bg-gray-200 rounded-full px-1 py-1"
                            />
                            : <DotsVertical
                                size={26}
                                strokeWidth={2}
                                onClick={() => toggleMenu(item.id)}
                                className="hover:bg-gray-200 rounded-full px-1 py-1"
                            />}
                    </div>
                </div>
                <RenderMenu menuOpened={menuOpened} item={item} handleMenuSelected={handleMenuSelected} />
            </li>
        </Suspense>
    )
}

export default RenderCard;