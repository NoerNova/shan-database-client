import { useContext, useEffect } from 'react';
import { Modal } from '@mantine/core';

import { MenuContext } from "./menuReducer";

const RenderPreview = () => {
    const { state } = useContext(MenuContext);

    useEffect(() => {
        console.log(state.selectedMenu)
    }, [state.selectedMenu])

    return (
        <Modal
            opened={false}
            onClose={() => { }}
            centered
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
        >
            <h1>{state.selectedMenu}</h1>
        </Modal>
    )
}

export default RenderPreview;