import { Menu } from '@mantine/core';
import { Trash, Edit, Download, Photo } from 'tabler-icons-react';
import { indexPropsType } from "../SearchBox/searchIndex";

interface types {
    menuOpened: boolean,
    item: indexPropsType,
    handleMenuSelected: (item: string) => void,
}
const RenderMenu = ({ menuOpened, item, handleMenuSelected }: types) => {
    return (
        <div className="absolute top-12 right-[133px] mt-0 py-0">
            <Menu withArrow arrowSize={10} shadow="md" width={200} opened={menuOpened}>
                <Menu.Dropdown>
                    <Menu.Label>{item.name}</Menu.Label>
                    <Menu.Item
                        component='button'
                        onClick={() =>
                            handleMenuSelected("View")}
                        icon={<Photo size={14} />}
                    >
                        View
                    </Menu.Item>
                    <Menu.Item
                        component='button'
                        onClick={() =>
                            handleMenuSelected("Download")}
                        icon={<Download size={14} />}
                    >
                        Download
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                        component='button'
                        onClick={() =>
                            handleMenuSelected("Edit")}
                        icon={<Edit size={14} />}
                    >
                        Edit
                    </Menu.Item>
                    <Menu.Item
                        component='button'
                        onClick={() =>
                            handleMenuSelected("Delete")}
                        color="red"
                        icon={<Trash size={14} />}
                    >
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default RenderMenu;